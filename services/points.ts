import * as SQLite from 'expo-sqlite';

export class PointService {

  async update(id_player: number, points: number[]) {
    try {
      const db = await SQLite.openDatabaseAsync('canastra.db');
      return await db.runSync(`update points set points = ? where id_player = ?`, [points.toString(), id_player]).changes
    } catch (error) {
      console.log(`PointService.insert error : ${error}`)
    }
  }
}