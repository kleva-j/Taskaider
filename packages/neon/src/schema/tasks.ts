import { pgTable, serial, pgEnum, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
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

export const statusEnum = pgEnum("status", availableStatus);
export const priorityEnum = pgEnum("priority", priorities);
export const labelEnum = pgEnum("label", defaultLabels);

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").default("").notNull(),
  label: labelEnum("label").default("feature"),
  status: statusEnum("status").default("backlog"),
  priority: priorityEnum("priority").default("medium"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  authorId: text("author_id")
    .references(() => users.tenantId, { onDelete: "cascade" })
    .default(""),
});

export type Task = typeof tasks.$inferSelect; // return type when queried
export type InsertTask = typeof tasks.$inferInsert; // insert type
export type TaskId = z.infer<typeof taskIdSchema>["id"];

export const insertTaskSchema = createInsertSchema(tasks);
export const selectTaskSchema = createSelectSchema(tasks);
export const taskIdSchema = selectTaskSchema.pick({ id: true });
export const updateTaskSchema = selectTaskSchema;
