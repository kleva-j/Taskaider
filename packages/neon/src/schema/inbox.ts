import {
  timestamp,
  boolean,
  pgTable,
  serial,
  json,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { users } from "./users";

export const inbox = pgTable("inbox", {
  id: serial("id").primaryKey(),
  subject: text("subject").default("").notNull(),
  body: json("body"),
  folder: text("folder").array().default(["inbox"]),
  opened: boolean("opened").default(false),
  date_sent: timestamp("date_sent").defaultNow().notNull(),
  updatedAt: timestamp("date_updated").defaultNow().notNull(),
  senderId: text("sender_id")
    .references(() => users.tenantId, { onDelete: "cascade" })
    .default(""),
  recipientId: text("recipient_id")
    .references(() => users.tenantId, { onDelete: "cascade" })
    .default(""),
});

export const insertInboxSchema = createInsertSchema(inbox);
export const selectInboxSchema = createSelectSchema(inbox);
export const inboxIdSchema = selectInboxSchema.pick({ id: true });
export const updateInboxSchema = selectInboxSchema;

export type Inbox = typeof inbox.$inferSelect; // return type when queried
export type InsertInbox = typeof inbox.$inferInsert; // insert type
export type InboxId = z.infer<typeof inboxIdSchema>["id"];
