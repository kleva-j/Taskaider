"use client";

import { DeleteTasks, Mode } from "@/tasks/components/DeleteTask";
import { Button, cn, useToast, Separator } from "ui";
import { Trash, CheckCircle } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { trpc } from "@/app/_trpc/client";
import { StatusEnum } from "@/types";
import { useState } from "react";

interface ToolbarSelectedActionProps<TData> {
  rows: Row<TData>[];
  toggleSelected: () => void;
}

export function ToolbarSelectedAction<TData>({
  rows,
  toggleSelected,
}: ToolbarSelectedActionProps<TData>) {
  const [loading, setLoading] = useState(false);
  const [isOpen, toggleOpen] = useState(false);

  const ondDeleteCompleted = () => {
    toggleOpen(!isOpen);
    toggleSelected();
  };

  const { toast } = useToast();

  const utils = trpc.useUtils();

  const updateTasks = trpc.task.update.multiple.useMutation({
    onError: () =>
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with updating task.",
        variant: "destructive",
      }),
    onSuccess: () => {
      utils.task.get.all.invalidate();
      toast({
        title: "😔 Task(s) Completed!",
        description: "Your task(s) have been successfully completed.",
        className: "border-blue-400",
      });
      toggleSelected();
    },
  });

  const taskIds = rows.map((row) => row.original["id"]);

  const markAsDone = async () => {
    const ids = rows
      .filter((row) => row.original["status"] !== StatusEnum.done)
      .map((row) => row.original["id"]);

    if (ids.length >= 1) {
      setLoading(true);
      await updateTasks.mutateAsync({
        ids,
        params: [{ status: StatusEnum.done }],
      });
      setLoading(false);
    } else toast({ title: "Select tasks that are not done yet." });
  };

  return (
    <>
      <Button
        variant="destructive"
        className="h-[30px] px-2.5 flex gap-x-0.5 text-xs"
        onClick={() => toggleOpen(!isOpen)}
      >
        <Trash className="h-4 w-4" />
        &#40;{rows.length}&#41;
      </Button>
      <DeleteTasks
        isOpen={isOpen}
        taskIds={taskIds}
        mode={Mode.multiple}
        onCompleted={ondDeleteCompleted}
      />

      <Button
        className={cn("relative h-8 flex gap-x-2 text-xs px-3")}
        disabled={loading}
        variant="outline"
        onClick={markAsDone}
      >
        {loading ? (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        ) : (
          <CheckCircle className="h-4 w-4 text-primary" />
        )}
        Mark as done
      </Button>
      <Separator orientation="vertical" className="mx-2" />
    </>
  );
}
