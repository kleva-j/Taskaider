import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { sql, relations } from "drizzle-orm";
import { z } from "zod";
import { users } from "./users";

export const sessionStatus = ["active", "ended", "removed", "revoked"] as const;
export const SessionStatusEnum = z.enum(sessionStatus);

export const sessions = sqliteTable("session", {
  id: text("session_id", { length: 256 }).primaryKey().notNull(),
  status: text("status", { enum: sessionStatus }).default("active"),
  tenantId: text("tenant_id", { length: 256 })
    .references(() => users.tenantId, { onDelete: "cascade" })
    .default(""),
  clientId: text("client_id", { length: 256 }).notNull(),
  lastAciveAt: integer("last_active_at", { mode: "timestamp" }),
  abandonAt: integer("abandon_at", { mode: "timestamp" }),
  expireAt: integer("expire_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`,
  ),
});

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.tenantId],
    references: [users.tenantId],
  }),
}));

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

export const insertSessionSchema = createInsertSchema(sessions);
export const selectSessionSchema = createSelectSchema(sessions);
