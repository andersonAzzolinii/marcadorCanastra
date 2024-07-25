import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase 

export const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseSync('canastra.db');
  }
  return db;
};