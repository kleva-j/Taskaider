"use client";

import { DeleteTasks, Mode } from "@/tasks/components/DeleteTask";
import { Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "ui";

interface DataTableDeleteGroupProps<TData> {
  rows: Row<TData>[];
  toggleSelected: () => void;
}

export function DataTableDeleteGroup<TData>({
  rows,
  toggleSelected,
}: DataTableDeleteGroupProps<TData>) {
  const [isOpen, toggleOpen] = useState(false);
  const taskIds = rows.map((row) => row.original["id"]);

  const onCompleted = () => {
    toggleOpen(!isOpen);
    toggleSelected();
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="h-8 px-2.5 flex gap-x-0.5"
        onClick={() => toggleOpen(!isOpen)}
      >
        <Trash className="h-4 w-4" />
        &#40;{rows.length}&#41;
      </Button>
      <DeleteTasks
        isOpen={isOpen}
        taskIds={taskIds}
        mode={Mode.multiple}
        onCompleted={onCompleted}
      />
    </>
  );
}
