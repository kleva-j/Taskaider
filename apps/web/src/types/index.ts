import { addTaskFormSchema } from "@/lib/formSchema";
import { z } from "zod";

export type Identifier = { key: "id" | "status" | "label"; value: string };
export type AddTaskSchemaType = z.infer<typeof addTaskFormSchema>;
export type DialogOptions = {
  title?: string;
  description?: string;
  id?: string;
};
export type AlertDialogOptions = DialogOptions & { isOpen: boolean };

export type TaskState = {
  addTask: AddTaskSchemaType & { isOpen: boolean };
  taskAlertDialog: AlertDialogOptions;
};
