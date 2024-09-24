import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
  return await SQLite.openDatabaseAsync('canastra.db');
};
