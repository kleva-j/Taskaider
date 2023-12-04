import { MainContent } from "@/app/dashboard/tasks/components/MainContent";
import { PageHeader } from "@/app/dashboard/tasks/components/PageHeader";
import { TaskContextProvider } from "@/context/task-provider";

export default async function () {
  return (
    <TaskContextProvider>
      <PageHeader />
      <MainContent />
    </TaskContextProvider>
  );
}
