/* eslint-disable import/order */
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { createId } from "@paralleldrive/cuid2";
import { sql, relations } from "drizzle-orm";

// Schema
import { sessions } from "./session";
import { users } from "./users";

const availableStatus = [
  "backlog",
  "todo",
  "in progress",
  "done",
  "cancelled",
] as const;

const defaultLabels = ["documentation", "bug", "feature"] as const;
const priorities = ["low", "medium", "high"] as const;

export const tasks = sqliteTable("tasks", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  status: text("status", { enum: availableStatus }).default("backlog"),
  title: text("title", { length: 256 }).default("").notNull(),
  authorId: text("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .default(""),
  label: text("label", { enum: defaultLabels }).default("feature"),
  priority: text("priority", { enum: priorities }).default("low"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`,
  ),
});

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
  sessions: many(sessions),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  author: one(users, {
    fields: [tasks.authorId],
    references: [users.id],
  }),
}));

export type Task = typeof tasks.$inferSelect; // return type when queried
export type InsertTask = typeof tasks.$inferInsert; // insert type

export const insertTaskSchema = createInsertSchema(tasks);
export const selectTaskSchema = createSelectSchema(tasks);
