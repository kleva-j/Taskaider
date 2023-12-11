import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  authorId: z.string().nullable(),
  priority: z.enum(["low", "medium", "high"]).nullable(),
  label: z.string().nullable(),
  status: z
    .enum(["backlog", "todo", "in progress", "done", "cancelled"])
    .nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type Task = z.infer<typeof taskSchema>;
