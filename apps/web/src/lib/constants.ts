import { AddTaskSchemaType, AlertDialogOptions } from "@/types";

export const addTaskDefaultValues: AddTaskSchemaType = {
  title: "",
  priority: "medium",
  label: "feature",
  status: "backlog",
};

export const actions = {
  ADD_TASK: "ADD_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",
  CANCEL_DELETE_TASK: "CANCEL_DELETE_TASK",
  TOGGLE_ADD_TASK_DIALOG: "TOGGLE_ADD_TASK_DIALOG",
  TOGGLE_DELETE_TASK_DIALOG: "TOGGLE_DELETE_TASK_DIALOG",
  INVALID_ACTION: "INVALID_ACTION",
} as const;

export type ACTIONS =
  | { type: typeof actions.ADD_TASK; payload: boolean }
  | { type: typeof actions.DELETE_TASK; payload: { id: string } }
  | { type: typeof actions.EDIT_TASK; payload: AddTaskSchemaType }
  | { type: typeof actions.CANCEL_DELETE_TASK }
  | { type: typeof actions.TOGGLE_ADD_TASK_DIALOG; payload: boolean }
  | {
      type: typeof actions.TOGGLE_DELETE_TASK_DIALOG;
      payload: AlertDialogOptions;
    }
  | { type: typeof actions.INVALID_ACTION };
