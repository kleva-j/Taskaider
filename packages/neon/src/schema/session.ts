import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

export const sessionStatus = ["active", "ended", "removed", "revoked"] as const;
export const sessionStatusEnum = pgEnum("sessionStatus", sessionStatus);

export const sessions = pgTable("session", {
  id: text("session_id").primaryKey().notNull(),
  expireAt: timestamp("expire_at"),
  clientId: text("client_id").notNull(),
  abandonAt: timestamp("abandon_at"),
  lastAciveAt: timestamp("last_active_at"),
  status: sessionStatusEnum("status"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  tenantId: text("tenant_id")
    .references(() => users.tenantId, { onDelete: "cascade" })
    .default(""),
});

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

export const insertSessionSchema = createInsertSchema(sessions);
export const selectSessionSchema = createSelectSchema(sessions);
