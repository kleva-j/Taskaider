import "dotenv/config";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { type User, tasks, users } from "./schema";
import { env } from "../env.mjs";

async function main() {
  const db = drizzle(
    createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN })
  );
  console.log("Seeding database ");

  await db
    .insert(users)
    .values({
      firstName: "test",
      lastName: "user",
      email: "test@test.com",
      photoUrl: "",
    })
    .returning()
    .all()
    .then(async ([newUser]) => {
      await db
        .insert(tasks)
        .values({ title: "First Task", authorId: newUser?.id })
        .run();
    });

  process.exit(0);
}

main().catch((e) => {
  console.error("Seed failed");
  console.error(e);
  process.exit(1);
});
