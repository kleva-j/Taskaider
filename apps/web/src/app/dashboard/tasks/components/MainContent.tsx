"use client";

import { DataTable } from "@/app/dashboard/tasks/components/DataTable";
import { columns } from "@/app/dashboard/tasks/components/Column";
import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "ui";
import { FC } from "react";

export const MainContent: FC = () => {
  const { data, isLoading } = trpc.task.getAll.useQuery();
  const tasks = data as NonNullable<typeof data>;

  return (
    <>
      {isLoading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <DataTable data={tasks} columns={columns} />
      )}
    </>
  );
};
