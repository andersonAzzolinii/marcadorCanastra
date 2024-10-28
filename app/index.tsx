import React, { useEffect } from "react";
import Home from "./home";
import migrations from "@/db";

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
