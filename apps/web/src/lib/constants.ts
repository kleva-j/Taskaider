import { AddTaskInputType } from "@taskaider/api";

export const addTaskDefaultValues: AddTaskInputType = {
  title: "",
  priority: "medium",
  label: "feature",
  status: "backlog",
};

export const actions = {
  INVALID_ACTION: "INVALID_ACTION",
} as const;

export type ACTIONS = { type: typeof actions.INVALID_ACTION };
