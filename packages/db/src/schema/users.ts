import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql, relations } from "drizzle-orm";
import { tasks } from "./tasks";

export const users = sqliteTable("users", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  firstName: text("first_name").default(""),
  lastName: text("last_name").default(""),
  email: text("email").default(""),
  photoUrl: text("photo_url").default(""),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`,
  ),
});

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  author: one(users, {
    fields: [tasks.authorId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect; // return type when queried
export type InsertUser = typeof users.$inferInsert; // insert type
