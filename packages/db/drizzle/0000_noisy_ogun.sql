CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text DEFAULT '',
	`last_name` text DEFAULT '',
	`email` text DEFAULT '',
	`photo_url` text DEFAULT '',
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
