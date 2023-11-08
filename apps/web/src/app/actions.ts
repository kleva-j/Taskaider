"use server";

import { serverClient } from "@taskaider/api";
import { AddTaskSchemaType } from "@/types";
import { revalidatePath } from "next/cache";
import { checkIfAuthed } from "@/lib/auth";

export async function addTaskAction(data: AddTaskSchemaType) {
  try {
    const user = await checkIfAuthed();
    await serverClient(user).task.create({ ...data });
    revalidatePath("/dashboard/tasks");
  } catch (error) {
    throw error;
  }
}

export async function editTaskAction(data: AddTaskSchemaType & { id: number }) {
  try {
    const user = await checkIfAuthed();
    await serverClient(user).task.update.single({ ...data });
    revalidatePath("/dashboard/tasks");
  } catch (error) {
    throw error;
  }
}

export async function deleteTaskAction(id: number) {
  try {
    const user = await checkIfAuthed();
    await serverClient(user).task.delete.single({ id });
    revalidatePath("/dashboard/tasks");
  } catch (error) {
    throw error;
  }
}
