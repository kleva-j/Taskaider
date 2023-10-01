"use client";

import { RedirectToTasks } from "@/tasks/components/RedirectToTask";
import { DeleteTasks, Mode } from "@/tasks/components/DeleteTask";
import { useRouter } from "next/navigation";

export default function ({ searchParams }) {
  const { id } = searchParams;
  const { back } = useRouter();

  const onCompleted = () => back();

  return id ? (
    <DeleteTasks taskIds={[id]} mode={Mode.single} onCompleted={onCompleted} />
  ) : (
    <RedirectToTasks />
  );
}
