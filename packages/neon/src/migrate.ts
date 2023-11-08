import "dotenv/config";

import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env } from "../env.mjs";

const { log, error } = console;

const db = drizzle(neon(env.DATABASE_URL));

async function main(): Promise<void> {
  try {
    log("migration started...");
    await migrate(db, { migrationsFolder: "./src/migrations" });
    log("migration ended...");
  } catch (err) {
    error("Error performing migration: ", err);
  }
  process.exit(0);
}

void main();
