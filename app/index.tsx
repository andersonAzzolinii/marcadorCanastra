import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import Home from "./home";
import { View } from "react-native";
import migrations from "@/db";
export default function Index() {

  async function migrateDbIfNeeded(db: SQLiteDatabase) {
    await migrations(db)
  }

  return (
    <View >
      <SQLiteProvider
        databaseName="canastra.db"
        options={{ useNewConnection: false  }}
        onInit={migrateDbIfNeeded} useSuspense>
        <Home />
      </SQLiteProvider>
    </View>
  );
}

