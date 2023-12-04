import { relations } from "drizzle-orm";
import { sessions } from "./session";
import { users } from "./users";
import { tasks } from "./tasks";
import { inbox } from "./inbox";

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
  sessions: many(sessions),
  inboxes: many(inbox),
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
    references: [users.tenantId],
  }),
}));

export const inboxRelations = relations(inbox, ({ one }) => ({
  sender: one(users, {
    fields: [inbox.senderId],
    references: [users.tenantId],
  }),
  recipient: one(users, {
    fields: [inbox.recipientId],
    references: [users.tenantId],
  }),
}));
