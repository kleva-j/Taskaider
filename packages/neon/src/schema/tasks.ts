import { pgTable, serial, pgEnum, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

export const availableStatus = [
  "backlog",
  "todo",
  "in progress",
  "done",
  "cancelled",
] as const;
export const defaultLabels = ["documentation", "bug", "feature"] as const;
export const priorities = ["low", "medium", "high"] as const;

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").default("").notNull(),
  label: pgEnum("label", defaultLabels)("label"),
  status: pgEnum("status", availableStatus)("status"),
  priority: pgEnum("priority", priorities)("priority"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  authorId: text("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .default(""),
});

export type Task = typeof tasks.$inferSelect; // return type when queried
export type InsertTask = typeof tasks.$inferInsert; // insert type

export const insertTaskSchema = createInsertSchema(tasks);
export const selectTaskSchema = createSelectSchema(tasks);
