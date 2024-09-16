import { Match, MatchInfo } from "@/types/match";
import { Player, PlayerPoint } from "@/types/player";
import * as SQLite from 'expo-sqlite';
import { HistoryService } from '@/services/history'

export class MatchService {

  async createMatch(matchInfo: MatchInfo) {
    try {
      const db = await SQLite.openDatabaseAsync('canastra.db');

      const match = await db.runAsync(`INSERT INTO match(id, name, max_points, created_at)
                   VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM match),
                          '${matchInfo.name}',
                          ${matchInfo.max_points},
                          DATE('now'))`)
      if (match.lastInsertRowId) {

        for (const player of matchInfo.players) {
          const insertPlayer = await db.runSync(`INSERT INTO players (id, name, created_at)
                                         VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM players),
                                                '${player}', 
                                                DATE('now'))`);

          await db.execAsync(`INSERT INTO  points  (id, id_player)
                                                  VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM points),
                                                          ${insertPlayer.lastInsertRowId})`);

          await db.execAsync(`INSERT INTO match_players (id, id_player, id_match)
                                     VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM match_players),
                                             ${insertPlayer.lastInsertRowId},
                                             ${match.lastInsertRowId} )`)
        }
      }
      return match.lastInsertRowId
    } catch (error) {
      console.error(`ServiceMatch.createMatch error : ${error}`)
    }
  }

  async findPerId(idMatch: number) {
    try {
      const db = await SQLite.openDatabaseAsync('canastra.db');
      const historyService = new HistoryService()

      const [match]: Match[] = await db
        .getAllAsync(`SELECT m.* 
                      FROM match m
                      inner join match_players mp on mp.id_match = m.id and mp.id_match = ${idMatch}
                      group by m.id
                      order by id asc`);

      const players: Player[] = await db
        .getAllAsync(`SELECT p.*
                    FROM players p
                    inner join match_players mp on mp.id_player = p.id and mp.id_match = ${idMatch}`);
      const idPlayers = players.map(player => (player.id))

      const playerPoints: PlayerPoint[] = await db
        .getAllAsync(`SELECT p.*
                      FROM points p where p.id_player in (${idPlayers.toString()})`);

      const objPlayers = players.map(player => {
        const pointsEntry = playerPoints.find(e => e.id_player === player.id)?.points;
        const pointsToNumber = pointsEntry ? pointsEntry.split(',').map(point => Number(point)) : []

        return {
          ...player,
          points: pointsEntry ? pointsToNumber : []
        }
      })
      const history = await historyService.getHistory(idMatch)
      return { ...match, players: objPlayers, history }

    } catch (error) {
      console.error(`ServiceMatch.find error : ${error}`)
      throw error
    }
  }

  async find() {
    try {
      const db = await SQLite.openDatabaseAsync('canastra.db');
      const matches: Match[] = await db.getAllAsync(`SELECT m.* FROM match m
                                                inner join match_players mp on mp.id_match = m.id
                                                group by m.id
                                                order by id asc`);
      const allPlayers: Player[] = await db.getAllAsync(`SELECT p.*, mp.id_match FROM players p
                                                         inner join match_players mp on mp.id_player = p.id`);
      return matches.map(match => {
        return {
          players: allPlayers.filter(e => e.id_match === match.id),
          ...match
        }
      })

    } catch (error) {
      console.error(`ServiceMatch.find error : ${error}`)
    }
  }

  async delete(idMatch: number | null, players: number[]) {
    try {
      const db = await SQLite.openDatabaseAsync('canastra.db');
      const excludedMatchPlayer = db.runSync(`DELETE from match_players where id_match = ?`, idMatch).changes

      if (excludedMatchPlayer) {
        const excludedPlayer = db.runSync(`DELETE from players where id in (?) `, players).changes

        if (excludedPlayer) {
          return db.runSync(`DELETE from match where id = ?`, idMatch).changes
        }
      }
    } catch (error) {
      console.error(`ServiceMatch.delete error : ${error}`)
    }


  }

}