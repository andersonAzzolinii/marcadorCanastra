import { getDatabase } from "@/db/db";
import { MatchInfo } from "./types/match";

export class MatchService {
  db: ReturnType<typeof getDatabase>

  constructor() {
    this.db = getDatabase()
  }

  async createMatch(matchInfo: MatchInfo) {
    try {
      return (await this.db).runAsync(`INSERT INTO match (id, name, max_points, created_at) 
                                                     VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM match),
                                                             '${matchInfo.matchName}', 
                                                             ${matchInfo.maxPoints},
                                                             DATE('now'))`)

    } catch (error) {
      console.error(`ServiceMatch.find error : ${error}`)
    }
  }

  async findPerId(idMatch: number) {
    try {
      return await (await this.db).getAllAsync(`SELECT * FROM match where id =${idMatch}`);
    } catch (error) {
      console.error(`ServiceMatch.find error : ${error}`)
    }
  }

  async find() {
    try {
      return await (await this.db).getAllAsync('SELECT * FROM match');

    } catch (error) {
      console.error(`ServiceMatch.find error : ${error}`)
    }
  }

}