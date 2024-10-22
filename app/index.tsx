import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import Home from "./home";
import migrations from "@/db";
import { StatusBar } from "expo-status-bar";

export default function Index() {

  useEffect(() => {
    migrateDatabase();
  }, []);

  async function migrateDatabase() {
    await migrations();
  }
  return (
    <Home />
  );
}
