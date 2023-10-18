CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text(256),
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
	`author_id` text DEFAULT '',
	`label` text DEFAULT '',
	`priority` text DEFAULT 'low',
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`session_id` text(256) PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'active',
	`tenant_id` text(256) DEFAULT '',
	`client_id` text(256) NOT NULL,
	`last_active_at` integer,
	`abandon_at` integer,
	`expire_at` integer,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`tenant_id`) REFERENCES `users`(`tenant_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_tenant_id_unique` ON `users` (`tenant_id`);