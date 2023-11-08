import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env } from "../env.mjs";
import { users } from "./schema";

const { log, error } = console;

const db = drizzle(neon(env.DATABASE_URL));

async function main(): Promise<void> {
  try {
    log("SEEDING started...");
    await db.insert(users).values({
      tenantId: "user_2WrcO7DqoNUE4HxLdZTkYRyRrqp",
      firstName: "Michael",
      lastName: "Obasi",
      email: "kasmickleva@gmail.com",
    });
    log("SEEDING Successful...");
    log("SEEDING Ended...");
  } catch (err) {
    error("Error performing seeding operation: ", err);
  }
  process.exit(0);
}

void main();
