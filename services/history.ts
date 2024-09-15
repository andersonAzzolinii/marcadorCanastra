import { History } from '@/types/match';
import * as SQLite from 'expo-sqlite';

export class HistoryService {


  async insert(players: History[]) {
    try {

      if (players.length === 0) return 0;
      let inserts: number[] = []
      const id_match = players[0].id_match

      const db = await SQLite.openDatabaseAsync('canastra.db');
      const next_group: any = await db.getFirstAsync(`SELECT IFNULL(MAX(group_history), 0) + 1 as group_history
                                                  FROM history
                                                  where id_match = ${id_match}`)


      for (const player of players) {

        const insertDB = await db.runAsync(`
          INSERT INTO history (id, winner, id_player, id_match, points, finished_date,group_history)
          VALUES (
            (SELECT IFNULL(MAX(id), 0) + 1 FROM history),
            ${player.winner},
            ${player.id_player},
            ${player.id_match},
            ${player.points},
            '2024-02-15',
            ${next_group?.group_history})`);
        inserts.push(insertDB.lastInsertRowId)
      }
      if (inserts.length > 0)
        return await this.get(id_match ?? 0)

    }
    catch (error) {
      console.error(`HistoryService.insert error : ${error}`);
    }
  }

  async get(id_match: number) {
    try {
      const db = await SQLite.openDatabaseAsync('canastra.db');
      const logs: History[] = await db.getAllAsync(`
        SELECT h.*,
               p.name as player_name
        FROM history h
        INNER JOIN players p ON p.id = h.id_player
        WHERE h.id_match = ${id_match}
      `);

      let listHistory: any[] = []
      logs.forEach(log => {
        let historyItem = listHistory.find(item => item.finished_date === log.finished_date);
        const logPlayers = logs.filter(e => e.group_history === log.group_history);

        if (!historyItem) {
          return listHistory.push({
            finished_date: log.finished_date,
            matches: [{
              group_history: log.group_history,
              players: logPlayers
            }]
          });
        }

        const matchExists = historyItem.matches.some(match => match?.group_history === log.group_history);

        if (!matchExists) {
          historyItem.matches.push({
            group_history: log.group_history,
            players: logPlayers
          });
        }
      });
      return listHistory
    } catch (error) {
      console.error(`HistoryService.get error : ${error}`);

    }
  }
}
