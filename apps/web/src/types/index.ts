import { addTaskFormSchema } from "@/lib/typeSchema";
import { z } from "zod";

export type AddTaskSchemaType = z.infer<typeof addTaskFormSchema>;
export enum PriorityEnum {
  low = "low",
  medium = "medium",
  high = "high",
}

export enum Priority {
  high,
  medium,
  low,
}

export enum Label {
  documentation = "documentation",
  bug = "bug",
  feature = "feature",
}

export enum Status {
  done,
  cancelled,
  "in progress",
  todo,
  backlog,
}

export enum StatusEnum {
  done = "done",
  cancelled = "cancelled",
  "in progress" = "in progress",
  todo = "todo",
  backlog = "backlog",
}

export type TaskState = {};
