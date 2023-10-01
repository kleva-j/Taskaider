"use client";

import { trpc } from "@/app/_trpc/client";
import { Loader } from "lucide-react";
import { useState } from "react";
import {
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialog,
  useToast,
  Button,
} from "ui";

export enum Mode {
  single = "single",
  multiple = "multiple",
}

interface Props {
  taskIds: string[];
  mode: Mode;
  onCompleted?: () => void;
  isOpen?: boolean;
}

export function DeleteTasks(props: Props) {
  const { mode, taskIds, isOpen = true } = props;
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClose = () => {
    setLoading(false);
    props?.onCompleted && props.onCompleted();
  };

  const utils = trpc.useContext();

  const deleteTask = trpc.task.delete[mode].useMutation({
    onError: () =>
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with deleting this task.",
        variant: "destructive",
      }),
    onSuccess: () => {
      utils.task.get.all.invalidate();
      toast({
        title: "😔 Task(s) deleted!",
        description: "Your task(s) have been successfully deleted.",
        className: "border-blue-400",
      });
    },
    onSettled: handleClose,
  });

  const onTaskDelete = () => {
    setLoading(true);
    deleteTask.mutateAsync({ id: taskIds[0], ids: taskIds });
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this task
            record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={handleClose}>
            Cancel
          </AlertDialogCancel>

          <Button
            variant="destructive"
            disabled={loading}
            onClick={onTaskDelete}
          >
            {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
