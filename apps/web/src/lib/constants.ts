import { AddTaskSchemaType } from "@/types";

export const addTaskDefaultValues: AddTaskSchemaType = {
  title: "",
  priority: "medium",
  label: "feature",
  status: "backlog",
};

export const actions = {
  INVALID_ACTION: "INVALID_ACTION",
} as const;

export type ACTIONS = { type: typeof actions.INVALID_ACTION };
