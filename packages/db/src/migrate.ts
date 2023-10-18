/* eslint-disable no-console */
import "dotenv/config";

import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from "@libsql/client/http";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "../env.mjs";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client);

async function main(): Promise<void> {
  console.info("Running migrations");
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migrated successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error performing migration: ", error);
    process.exit(1);
  }
}

main();
