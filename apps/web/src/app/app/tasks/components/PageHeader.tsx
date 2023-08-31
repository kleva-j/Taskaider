"use client";

import { AddNewTask } from "@/app/app/tasks/components/AddNewTask";

export const PageHeader = () => {
  return (
    <div className="ui-flex ui-items-center ui-justify-between ui-space-y-2">
      <div>
        <h2 className="ui-text-2xl ui-font-bold ui-tracking-tight">
          Welcome back!
        </h2>
        <p className="ui-text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>
      <div className="ui-flex ui-items-center ui-space-x-2">
        <AddNewTask />
      </div>
    </div>
  );
};
