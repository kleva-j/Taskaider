import type { Metadata } from "next";

import { PageHeader } from "@/app/app/tasks/components/PageHeader";
import { serverClient } from "@/server";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker.",
};

const handler = serverClient({ auth: null, req: undefined });

export default async function () {
  const tasks = await handler.user.getAll();
  return (
    <div className="ui-flex ui-h-full ui-flex-1 ui-flex-col ui-space-y-8 ui-p-8">
      <PageHeader />
    </div>
  );
}
