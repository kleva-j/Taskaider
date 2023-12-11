import { TaskContextProvider } from "@/context/task-provider";
import { MainContent } from "@/tasks/components/MainContent";
import { PageHeader } from "@/tasks/components/PageHeader";

export default async function () {
  return (
    <TaskContextProvider>
      <PageHeader />
      <MainContent />
    </TaskContextProvider>
  );
}
