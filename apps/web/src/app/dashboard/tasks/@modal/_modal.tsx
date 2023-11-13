"use client";

import { AddNewTask } from "@/app/dashboard/tasks/components/AddNewTask";
import { DialogContent, DialogHeader, DialogTitle, Dialog } from "ui";
import { useRouter, useSearchParams } from "next/navigation";
import { Label, PriorityEnum, StatusEnum } from "@/types";
import { AddTaskInputType } from "@taskaider/api";

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
              priority: searchParams.get("priority") || PriorityEnum.medium,
              status: searchParams.get("status") || StatusEnum.backlog,
              label: searchParams.get("label") || Label.feature,
            } as AddTaskInputType
          }
          handleClose={handleClose}
          id={searchParams.get("id") || ""}
        />
      </DialogContent>
    </Dialog>
  );
};
