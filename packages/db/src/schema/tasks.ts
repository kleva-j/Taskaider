import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { z } from "zod";

export const availableStatus = [
  "backlog",
  "todo",
  "in progress",
  "done",
  "cancelled",
] as const;
export const defaultLabels = ["documentation", "bugs", "feature"] as const;
export const priorities = ["low", "medium", "high"] as const;

export const StatusEnum = z.enum(availableStatus);
export const PriorityEnum = z.enum(priorities);

export const tasks = sqliteTable("tasks", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  status: text("status", { enum: availableStatus }).default("backlog"),
  title: text("title", { length: 256 }).default("").notNull(),
  authorId: text("author_id").default(""),
  label: text("label").default(""),
  priority: text("priority", { enum: priorities }).default("low"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`,
  ),
});

export type Task = typeof tasks.$inferSelect; // return type when queried
export type InsertTask = typeof tasks.$inferInsert; // insert type
