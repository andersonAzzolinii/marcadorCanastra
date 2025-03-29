import React, { useEffect, useState } from "react";
import Home from "./home";
import migrations from "@/db";

export default function Index() {

  const [inMigration, setInmigration] = useState(true)
  useEffect(() => {
    migrateDatabase();
  }, []);

  async function migrateDatabase() {
    try {
      await migrations();
      setInmigration(false)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      {
        !inMigration &&
        <Home />
      }
    </>
  );
}
