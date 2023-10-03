import { addTaskFormSchema } from "@/lib/typeSchema";
import { z } from "zod";

export type AddTaskSchemaType = z.infer<typeof addTaskFormSchema>;
export enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
}
export enum Label {
  documentation = "documentation",
  bug = "bug",
  feature = "feature",
}
export enum Status {
  backlog = "backlog",
  todo = "todo",
  "in progress" = "in progress",
  done = "done",
  cancelled = "cancelled",
}

export type TaskState = {};
