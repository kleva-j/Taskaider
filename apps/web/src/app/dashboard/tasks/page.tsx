import { PageHeader } from "@/app/dashboard/tasks/components/PageHeader";
import { DataTable } from "@/app/dashboard/tasks/components/DataTable";
import { columns } from "@/app/dashboard/tasks/components/Column";
import { TaskContextProvider } from "@/context/task-provider";
import { serverClient } from "@/server";

import { DeleteTaskDialog } from "./components/DeleteDialog";

const handler = serverClient({ auth: null, req: undefined });

export default async function () {
  const tasks = await handler.task.getAll();

  return (
    <TaskContextProvider>
      <PageHeader />
      <DataTable data={tasks} columns={columns} />
      <DeleteTaskDialog />
    </TaskContextProvider>
  );
}
