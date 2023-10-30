import { DataTable } from "@/app/dashboard/tasks/components/DataTable";
import { columns } from "@/app/dashboard/tasks/components/Column";
import { checkIfAuthed } from "@/lib/auth";
import { serverClient } from "@/server";
import { FC } from "react";

async function getData() {
  const user = await checkIfAuthed();

  if (!user) throw new Error("UnAuthorized");

  return serverClient(user).task.get.all();
}

export const MainContent: FC = async () => {
  const data = await getData();

  return <DataTable data={data || []} columns={columns} />;
};
