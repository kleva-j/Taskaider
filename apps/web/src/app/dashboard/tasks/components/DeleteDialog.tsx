"use client";

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

import { UseTaskContext } from "@/context/task-provider";
import { trpc } from "@/app/_trpc/client";
import { actions } from "@/lib/constants";

export const DeleteTaskDialog = () => {
  const { toast } = useToast();
  const { state, dispatch } = UseTaskContext();
  const { taskAlertDialog } = state;

  const toggleDialog = (isOpen = false) =>
    dispatch({
      type: actions.TOGGLE_DELETE_TASK_DIALOG,
      payload: { isOpen },
    });

  const deleteTask = trpc.task.delete.useMutation({
    onError: () =>
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with deleting this task.",
        variant: "destructive",
      }),
    onSuccess: () =>
      toast({
        title: "😔 Task deleted!",
        description: "You have successfull deleted a task.",
        className: "border-blue-400",
      }),
    onSettled: () => toggleDialog(),
  });

  const handleCancel = () => dispatch({ type: actions.CANCEL_DELETE_TASK });

  const onTaskDelete = () => {
    deleteTask.mutate({ id: taskAlertDialog.id as string });
    handleCancel();
  };

  return (
    <AlertDialog open={taskAlertDialog.isOpen} onOpenChange={toggleDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this task
            record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="text-red-600 bg-red-400 hover:bg-destructive hover:text-white transition-colors duration-300"
            onClick={onTaskDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
