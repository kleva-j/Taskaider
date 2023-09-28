"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { Loader } from "lucide-react";
import { useState } from "react";
import {
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialog,
  useToast,
} from "ui";

export default function DeleteModal() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const { toast } = useToast();
  const { back } = useRouter();

  const handleClose = () => {
    setLoading(false);
    back();
  };

  const id = searchParams.get("id");

  if (!id) {
    handleClose();
    return;
  }

  const utils = trpc.useContext();

  const deleteTask = trpc.task.delete.useMutation({
    onError: () =>
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with deleting this task.",
        variant: "destructive",
      }),
    onSuccess: () => {
      utils.task.getAll.invalidate();
      toast({
        title: "😔 Task deleted!",
        description: "You have successfull deleted a task.",
        className: "border-blue-400",
      });
    },
    onSettled: handleClose,
  });

  const onTaskDelete = () => {
    setLoading(true);
    deleteTask.mutateAsync({ id }).then(handleClose);
  };

  return (
    <AlertDialog open={true}>
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
          <AlertDialogAction
            className="text-red-600 bg-red-400 hover:bg-destructive hover:text-white transition-colors duration-300"
            disabled={loading}
            onClick={onTaskDelete}
          >
            {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
