import { relations } from "drizzle-orm";
import { sessions } from "./session";
import { users } from "./users";
import { tasks } from "./tasks";

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
  sessions: many(sessions),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.tenantId],
    references: [users.tenantId],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  author: one(users, {
    fields: [tasks.authorId],
    references: [users.id],
  }),
}));
