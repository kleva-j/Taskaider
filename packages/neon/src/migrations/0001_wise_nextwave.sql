CREATE TABLE IF NOT EXISTS "inbox" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" text DEFAULT '' NOT NULL,
	"body" json,
	"folder" text[] DEFAULT inbox,
	"opened" boolean DEFAULT false,
	"date_sent" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp DEFAULT now() NOT NULL,
	"sender_id" text DEFAULT '',
	"recipient_id" text DEFAULT ''
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inbox" ADD CONSTRAINT "inbox_sender_id_users_tenant_id_fk" FOREIGN KEY ("sender_id") REFERENCES "users"("tenant_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inbox" ADD CONSTRAINT "inbox_recipient_id_users_tenant_id_fk" FOREIGN KEY ("recipient_id") REFERENCES "users"("tenant_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
