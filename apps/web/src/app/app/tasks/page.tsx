import type { Metadata } from "next";

import { PageHeader } from "@/app/app/tasks/components/PageHeader";
import { DataTable } from "@/app/app/tasks/components/DataTable";
import { columns } from "@/app/app/tasks/components/Column";
import { taskSchema } from "@/app/app/tasks/_data/schema";
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
    path.join(process.cwd(), "./src/app/app/tasks/_data/tasks.json"),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function () {
  const _tasks = await handler.user.getAll();

  const tasks = await getTasks();

  return (
    <div className="ui-flex ui-h-full ui-flex-1 ui-flex-col ui-space-y-8 ui-p-8">
      <PageHeader />
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
