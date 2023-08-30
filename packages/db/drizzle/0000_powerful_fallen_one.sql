CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text DEFAULT '',
	`last_name` text DEFAULT '',
	`email` text DEFAULT '',
	`photo_url` text DEFAULT '',
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'backlog',
	`title` text(256) DEFAULT '' NOT NULL,
	`author_id` text,
	`tag` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
