"use client";

import { deleteTaskAction } from "@/app/actions";
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
  ids: string[];
  mode: Mode;
  onCompleted?: () => void;
  isOpen?: boolean;
}

export function DeleteTasks(props: Props) {
  const { mode, isOpen = true } = props;
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClose = () => {
    setLoading(false);
    props?.onCompleted && props.onCompleted();
  };

  const handleDelete = async () => {
    try {
      const ids = props.ids.map(Number);
      await deleteTaskAction({ id: ids[0], ids }, mode);
      toast({
        title: "😔 Task(s) deleted!",
        description: "Your task(s) have been successfully deleted.",
        className: "border-blue-400",
      });
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with deleting task(s).",
        variant: "destructive",
      });
    }
  };

  const onTaskDelete = async () => {
    setLoading(true);
    await handleDelete();
    handleClose();
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
