import type { Metadata } from "next";

import { PageHeader } from "@/app/dashboard/tasks/components/PageHeader";
import { DataTable } from "@/app/dashboard/tasks/components/DataTable";
import { columns } from "@/app/dashboard/tasks/components/Column";
import { taskSchema } from "@/app/dashboard/tasks/_data/schema";
import { promises as fs } from "fs";
import { z } from "zod";

import path from "path";

// import { serverClient } from "@/server";
// const handler = serverClient({ auth: null, req: undefined });
// await handler.user.getAll();

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker.",
};

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "./src/app/dashboard/tasks/_data/tasks.json"),
  );

  return z.array(taskSchema).parse(JSON.parse(data.toString()));
}

export default async function () {
  const tasks = await getTasks();

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <PageHeader />
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
