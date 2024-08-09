import { getDatabase } from "@/db/db";

export class PointService {
  db: ReturnType<typeof getDatabase>

  constructor() {
    this.db = getDatabase()
  }

  async update(id_player: number, points: number[]) {
    try {
      return (await this.db).runSync(`update points set points = ? where id_player = ?`, [points.toString(), id_player]).changes
    } catch (error) {
      console.log(`PointService.insert error : ${error}`)
    }
  }
}