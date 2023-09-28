"use client";

import { AddNewTask } from "@/app/dashboard/tasks/components/AddNewTask";
import { DialogContent, DialogHeader, DialogTitle, Dialog } from "ui";
import { AddTaskSchemaType, Label, Priority, Status } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

export const Modal = ({ title }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-md border-border">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <AddNewTask
          defaultValues={
            {
              title: searchParams.get("title") || "",
              priority: searchParams.get("priority") || Priority.medium,
              status: searchParams.get("status") || Status.backlog,
              label: searchParams.get("label") || Label.feature,
            } as AddTaskSchemaType
          }
          handleClose={handleClose}
          id={searchParams.get("id") || ""}
        />
      </DialogContent>
    </Dialog>
  );
};
