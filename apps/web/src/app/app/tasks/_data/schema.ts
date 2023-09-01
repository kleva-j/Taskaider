import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  label: z.enum(["documentation", "bugs", "feature"]),
  status: z.enum(["backlog", "todo", "in progress", "done", "cancelled"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Task = z.infer<typeof taskSchema>;
