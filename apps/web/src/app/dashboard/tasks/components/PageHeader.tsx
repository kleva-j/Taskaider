"use client";

import { PlusIcon } from "lucide-react";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  TooltipPortal,
  TooltipArrow,
  Tooltip,
  Button,
} from "ui";

import Link from "next/link";

export const PageHeader = () => {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="ml-auto rounded-full"
                asChild
              >
                <Link href="/dashboard/tasks/new">
                  <>
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">New task</span>
                  </>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent>
                <p>New Task</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
