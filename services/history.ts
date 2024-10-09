import { History, HistoryItem, Match } from '@/types/match';
import { openDatabase } from '@/db/db';

export class HistoryService {

  async insert(players: HistoryItem[]) {
    const db = await openDatabase()
    try {

      if (players.length === 0) return 0;
      let inserts: number[] = []
      const id_match = players[0].id_match

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
            DATE('now'),
            ${next_group?.group_history})`);

        await db.runAsync(`UPDATE points set points = '' where id_player = ${player.id_player}`);
        inserts.push(insertDB.lastInsertRowId)
      }
      if (inserts.length > 0) {
        return true
      }

    }
    catch (error) {
      console.error(`HistoryService.insert error : ${error}`);
    } 
  }

  async getHistory(id_match: number) {
    const db = await openDatabase()
    try {
      const logs: HistoryItem[] = await db.getAllAsync(`
        SELECT h.*,
               p.name as player_name
        FROM history h
        INNER JOIN players p ON p.id = h.id_player
        WHERE h.id_match = ${id_match}
      `);

      let listHistory: Partial<History>[] = []
      logs.forEach(log => {
        let historyItem: any = listHistory.find(item => item.finished_date === log.finished_date);
        const logPlayers = logs.filter(e => e.group_history === log.group_history);

        if (!historyItem) {
          return listHistory.push({
            finished_date: log.finished_date,
            matches: [{
              group_history: log.group_history || null,
              players: logPlayers
            }]
          });
        }

        const matchExists = historyItem.matches.some((match: { group_history: number | null }) => match?.group_history === log.group_history);

        if (!matchExists) {
          historyItem?.matches?.push({
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
