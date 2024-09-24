import { openDatabase } from '@/db/db';
export class PointService {

  async update(id_player: number, points: number[]) {
    const db = await openDatabase();
    try {
      return await db.runSync(`update points set points = ? where id_player = ?`, [points.toString(), id_player]).changes
    } catch (error) {
      console.log(`PointService.insert error : ${error}`)
    } finally {
      db.closeAsync()
    }
  }
}