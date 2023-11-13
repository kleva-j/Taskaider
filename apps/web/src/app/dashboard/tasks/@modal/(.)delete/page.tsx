"use client";

import { RedirectToTasks } from "@/tasks/components/RedirectToTask";
import { DeleteTasks, Mode } from "@/tasks/components/DeleteTask";
import { useRouter } from "next/navigation";

export default function ({ searchParams }) {
  const { id } = searchParams;
  const { back } = useRouter();

  if (!id) return <RedirectToTasks />;

  return (
    <DeleteTasks ids={[id]} mode={Mode.single} onCompleted={() => back()} />
  );
}
