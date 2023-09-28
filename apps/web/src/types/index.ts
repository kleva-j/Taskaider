import { addTaskFormSchema } from "@/lib/formSchema";
import { z } from "zod";

export type AddTaskSchemaType = z.infer<typeof addTaskFormSchema>;
export enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
}
export enum Label {
  documentation = "documentation",
  bugs = "bugs",
  feature = "feature",
}
export enum Status {
  backlog = "backlog",
  todo = "todo",
  inprogress = "progress",
  done = "done",
  cancelled = "cancelled",
}

export type TaskState = {};
