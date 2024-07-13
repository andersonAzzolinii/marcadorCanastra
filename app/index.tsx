import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import Home from "./home";
import { View } from "react-native";
import migrations from "@/db";
export default function Index() {

  async function migrateDbIfNeeded(db: SQLiteDatabase) {
    await migrations(db)
  }

  return (
    <View >
      <SQLiteProvider databaseName="canastra.db" onInit={migrateDbIfNeeded} useSuspense>
        <Home />
      </SQLiteProvider>
    </View>
  );
}

