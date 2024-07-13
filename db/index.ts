import { type SQLiteDatabase } from 'expo-sqlite';

async function migrations(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) return

  if (currentDbVersion === 0) {

    await db.execAsync(` 
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS match (id INTEGER PRIMARY KEY NOT NULL, 
                                        name TEXT NOT NULL,
                                        max_points INTEGER,
                                        created_at DATE);         
                                        
     CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY NOT NULL, 
                                         name TEXT NOT NULL,
                                         created_at DATE);    
                                         
     CREATE TABLE IF NOT EXISTS match_players (id INTEGER PRIMARY KEY NOT NULL,
                                               id_player INT NOT NULL,
                                               id_match INT,
                                               FOREIGN KEY(id_player) REFERENCES players(id),
                                               FOREIGN KEY(id_match) REFERENCES match(id));                                         

     CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY NOT NULL,
                                         winner_player INT NOT NULL,
                                         id_match INT NOT NULL,
                                         finished_date DATE,
                                         FOREIGN KEY(winner_player) REFERENCES players(id),
                                         FOREIGN KEY(id_match) REFERENCES match(id)); `);

    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export default migrations