import type { Metadata } from "next";

import { PageHeader } from "@/app/dashboard/tasks/components/PageHeader";
import { DataTable } from "@/app/dashboard/tasks/components/DataTable";
import { columns } from "@/app/dashboard/tasks/components/Column";
import { taskSchema } from "@/app/dashboard/tasks/_data/schema";
import { serverClient } from "@/server";
import { promises as fs } from "fs";
import { z } from "zod";

import path from "path";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker.",
};

const handler = serverClient({ auth: null, req: undefined });

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "./src/app/dashboard/tasks/_data/tasks.json"),
  );

  return z.array(taskSchema).parse(JSON.parse(data.toString()));
}

export default async function () {
  const _tasks = await handler.user.getAll();
  console.log(_tasks);

  const tasks = await getTasks();

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <PageHeader />
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
