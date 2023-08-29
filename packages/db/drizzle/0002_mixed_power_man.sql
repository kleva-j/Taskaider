ALTER TABLE tasks ADD `created_at` integer DEFAULT (strftime('%s', 'now'));--> statement-breakpoint
ALTER TABLE tasks ADD `updated_at` integer DEFAULT (strftime('%s', 'now'));