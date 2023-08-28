import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

export const tasks = sqliteTable("tasks", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  status: text("status", { enum: ["open", "closed"] }).default("open"),
  description: text("description").default(""),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`,
  ),
});

export type Task = typeof tasks.$inferSelect; // return type when queried
export type InsertTask = typeof tasks.$inferInsert; // insert type
