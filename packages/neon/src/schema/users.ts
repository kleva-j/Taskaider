import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { createId } from "@paralleldrive/cuid2";
import {
  uniqueIndex,
  timestamp,
  pgTable,
  varchar,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id")
      .$defaultFn(() => createId())
      .primaryKey(),
    tenantId: varchar("tenant_id", { length: 50 }).unique(),
    firstName: text("first_name").default(""),
    lastName: text("last_name").default(""),
    email: text("email").default(""),
    photoUrl: text("photo_url").default(""),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({ emailIndex: uniqueIndex("email_idx").on(table.email) }),
);

export type User = typeof users.$inferSelect; // return type when queried
export type InsertUser = typeof users.$inferInsert; // insert type

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
