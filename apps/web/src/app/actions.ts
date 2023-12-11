"use server";

import { Mode } from "@/tasks/components/DeleteTask";
import { serverClient } from "@taskaider/api";
import { revalidatePath } from "next/cache";
import { checkIfAuthed } from "@/lib/auth";
import {
  updateBatchInputType,
  updateTaskInputType,
  AddTaskInputType,
} from "@taskaider/api";

export async function addTaskAction(data: AddTaskInputType) {
  try {
    const user = await checkIfAuthed();
    await serverClient(user).task.create({ ...data });
    revalidatePath("/tasks");
  } catch (error) {
    throw error;
  }
}

export async function editTaskAction(params: updateTaskInputType) {
  try {
    const user = await checkIfAuthed();
    await serverClient(user).task.update.single({ ...params });
    revalidatePath("/tasks");
  } catch (error) {
    throw error;
  }
}

export async function editMultipleTasksAction(input: updateBatchInputType) {
  const { ids, params } = input;
  try {
    const user = await checkIfAuthed();
    await serverClient(user).task.update.multiple({ ids, params });
    revalidatePath("/tasks");
  } catch (error) {
    throw error;
  }
}

type deleteParams = { id: number } & { ids: number[] };

export async function deleteTaskAction(params: deleteParams, mode: Mode) {
  try {
    const user = await checkIfAuthed();
    await serverClient(user).task.delete[mode]({ ...params });
    revalidatePath("/tasks");
  } catch (error) {
    throw error;
  }
}
