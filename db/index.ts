import { SQLiteDatabase } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';

export async function openDatabase() {
  return new Promise<SQLiteDatabase>((resolve, reject) => {
    try {
      const db = SQLite.openDatabaseAsync("canastra.db");
      resolve(db);
    } catch (error) {
      reject(error);
    }
  });
}

async function migrations() {
  const db = await openDatabase();
  const DATABASE_VERSION = 1;

  let result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) return;

  if (currentDbVersion === 0) {
    await db.execAsync(`PRAGMA journal_mode = WAL`);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS match (
        id INTEGER PRIMARY KEY NOT NULL, 
        name TEXT NOT NULL,
        max_points INTEGER,
        created_at DATE
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY NOT NULL, 
        name TEXT NOT NULL,
        created_at DATE
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS match_players (
        id INTEGER PRIMARY KEY NOT NULL,
        id_player INT NOT NULL,
        id_match INT,
        FOREIGN KEY(id_player) REFERENCES players(id),
        FOREIGN KEY(id_match) REFERENCES match(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY NOT NULL,
        winner INT DEFAULT 0,
        id_player INT NOT NULL,
        id_match INT NOT NULL,
        finished_date DATE,
        group_history INT NOT NULL,
        points INT NOT NULL,
        FOREIGN KEY(id_player) REFERENCES players(id),
        FOREIGN KEY(id_match) REFERENCES "match"(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS points (
        id INTEGER PRIMARY KEY NOT NULL,
        id_player INT NOT NULL,
        points TEXT,
        FOREIGN KEY(id_player) REFERENCES players(id)
      );
    `);

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export default migrations;
