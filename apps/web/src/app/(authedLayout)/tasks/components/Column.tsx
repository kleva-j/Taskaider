"use client";

import { DataTableColumnHeader } from "@/tasks/components/TableColumnHeader";
import { DataTableRowActions } from "@/tasks/components/TableRowActions";
import { labels, priorities, statuses } from "@/tasks/_data";
import { Status, Priority, StatusEnum } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/tasks/_data/schema";
import { Badge, Checkbox, cn } from "ui";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("id") as number;
      return <div className="w-[80px]">{value}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      const status = row.getValue("status") as string;
      const isDone = status === StatusEnum.done;

      return (
        <div className="flex space-x-2">
          {label && (
            <Badge variant="outline" className="border-border">
              {label.label}
            </Badge>
          )}
          <span
            className={cn(
              "max-w-[500px] truncate font-medium",
              isDone
                ? "line-through decoration-2 decoration-secondary-foreground"
                : "",
            )}
          >
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className={cn("mr-2 h-4 w-4", status.color)} />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    sortingFn: (rowA: any, rowB: any, columnId: string): number => {
      return Status[rowA.getValue(columnId)] < Status[rowB.getValue(columnId)]
        ? 1
        : -1;
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority"),
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className={cn("mr-2 h-4 w-4", priority.color)} />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    sortingFn: (rowA: any, rowB: any, columnId: string): number => {
      return Priority[rowA.getValue(columnId)] <
        Priority[rowB.getValue(columnId)]
        ? 1
        : -1;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
