import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { sql } from "drizzle-orm";
import { env } from "../env.mjs";

const { log, error } = console;

const client = neon(env.DATABASE_URL);
const db = drizzle(client);

async function main(): Promise<void> {
  try {
    log("RESETING started...");

    await db.execute(sql`DROP TABLE IF EXISTS users CASCADE;`);
    await db.execute(sql`DROP TABLE IF EXISTS tasks CASCADE;`);
    await db.execute(sql`DROP TABLE IF EXISTS inbox CASCADE;`);
    await db.execute(sql`DROP TABLE IF EXISTS session CASCADE;`);

    log("RESETING Successful...");
    log("RESETING Ended...");
  } catch (err) {
    error("Error performing reset operation: ", err);
  } finally {
    process.exit(0);
  }
}

void main();
