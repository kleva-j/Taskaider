"use client";

import { labels, priorities } from "@/app/dashboard/tasks/_data";
import { taskSchema } from "@/app/dashboard/tasks/_data/schema";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenu,
  Button,
  toast,
} from "ui";

import Link from "next/link";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);

  const [loading, setLoading] = useState(false);

  const id = row.getValue("id") as string;
  const title = row.getValue("title") as string;
  const status = row.getValue("status") as string;
  const priority = row.getValue("priority") as string;

  const utils = trpc.useContext();

  const updateTasks = trpc.task.update.single.useMutation({
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
        description: "Your task(s) have been successfully updated.",
        className: "border-blue-400",
      });
    },
  });

  const handleChangeEvent = async (value: string, key: string) => {
    setLoading(true);
    await updateTasks.mutateAsync({ id, title, [key]: value });
    setLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          {loading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            <DotsHorizontalIcon className="h-4 w-4" />
          )}
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link
            href={{
              pathname: "/dashboard/tasks/edit",
              query: { id, title, status, priority },
            }}
          >
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              onValueChange={(value) => handleChangeEvent(value, "label")}
              value={task.label as string}
            >
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              onValueChange={(value) => handleChangeEvent(value, "priority")}
              value={task.priority as string}
            >
              {priorities.map((p) => (
                <DropdownMenuRadioItem key={p.value} value={p.value}>
                  {p.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="group text-destructive hover:text-destructive"
          asChild
        >
          <Link
            href={{
              pathname: "/dashboard/tasks/delete",
              query: { id },
            }}
          >
            <span className="group-hover:text-destructive">Delete</span>
            <DropdownMenuShortcut className="group-hover:text-destructive">
              ⌘⌫
            </DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
