import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { faker } from "@faker-js/faker";
import { env } from "../env.mjs";
import { type User, users, tasks } from "./schema";

const { log, error } = console;

const db = drizzle(neon(env.DATABASE_URL));

async function generateDefaultUser(): Promise<User> {
  const [user] = await db
    .insert(users)
    .values({
      tenantId: "user_2WrcO7DqoNUE4HxLdZTkYRyRrqp",
      firstName: "Michael",
      lastName: "Obasi",
      email: "kasmickleva@gmail.com",
      photoUrl:
        "https://ui-avatars.com/api/?background=random&name=Michael+Obasi",
    })
    .returning();
  return user as User;
}

async function main(): Promise<void> {
  try {
    log("SEEDING started...");
    const user = await generateDefaultUser();
    await db.insert(tasks).values({
      title: faker.lorem.sentence({ min: 3, max: 5 }),
      label: "bug",
      status: "todo",
      priority: "high",
      authorId: user.tenantId,
    });

    await db.insert(tasks).values({
      title: faker.lorem.sentence({ min: 3, max: 5 }),
      label: "feature",
      status: "backlog",
      priority: "medium",
      authorId: user.tenantId,
    });
    log("SEEDING Successful...");
    log("SEEDING Ended...");
  } catch (err) {
    error("Error performing seeding operation: ", err);
  }
  process.exit(0);
}

void main();
