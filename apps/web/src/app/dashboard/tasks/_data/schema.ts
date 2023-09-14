import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  label: z.enum(["documentation", "bug", "feature"]),
  status: z.enum(["backlog", "todo", "in progress", "done", "canceled"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Task = z.infer<typeof taskSchema>;
