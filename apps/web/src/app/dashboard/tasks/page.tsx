import { MainContent } from "@/app/dashboard/tasks/components/MainContent";
import { PageHeader } from "@/app/dashboard/tasks/components/PageHeader";
import { TaskContextProvider } from "@/context/task-provider";

// FETCH CONTENT SERVER-SIDE
// import { serverClient as handler } from "@/server";
// const tasks = await handler.task.getAll();

export default async function () {
  return (
    <TaskContextProvider>
      <PageHeader />
      <MainContent />
    </TaskContextProvider>
  );
}
