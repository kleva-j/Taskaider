"use client";

import { defaultLabels, priorities } from "@taskaider/db/src/schema";
import { addTaskDefaultValues } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTaskFormSchema } from "@/lib/formSchema";
import { AddTaskSchemaType } from "@/types";
import { useForm } from "react-hook-form";
import { trpc } from "@/app/_trpc/client";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  RadioGroupItem,
  DialogTrigger,
  DialogContent,
  SelectTrigger,
  SelectContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  SelectValue,
  RadioGroup,
  SelectItem,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  useToast,
  Button,
  Select,
  Dialog,
  Input,
  Form,
} from "ui";

export const AddNewTask = () => {
  const form = useForm<AddTaskSchemaType>({
    resolver: zodResolver(addTaskFormSchema),
    defaultValues: addTaskDefaultValues,
  });

  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const addTask = trpc.task.create.useMutation({
    onError: () =>
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with adding new task.",
        variant: "destructive",
      }),
    onSuccess: () =>
      toast({
        title: "🎉 New task added!",
        description: "You have successfull added a new task.",
        className: "border-teal-400",
      }),
    onSettled: () => setOpen(false),
  });

  const onSubmit = (values: AddTaskSchemaType) => addTask.mutate(values);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="ml-auto rounded-full">
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">New task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md border-border">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            name="add_new_task"
            className="grid gap-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                  <FormLabel className="text-right">Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoCorrect="off"
                      autoCapitalize="none"
                      placeholder={`eg: "Take out the trash."`}
                      className="invalid:border-red-500 col-span-3"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="priority"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                  <FormLabel className="text-right">Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-x-4 items-center"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {priorities.map((item) => (
                        <FormItem
                          key={item}
                          className="flex items-center space-y-0 gap-x-2"
                        >
                          <FormControl>
                            <RadioGroupItem value={item} />
                          </FormControl>
                          <FormLabel className="capitalize mt-0">
                            {item}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="label"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                  <FormLabel className="text-right">Label</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="col-start-2 col-span-2 capitalize">
                        <SelectValue placeholder="Select a label..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      {defaultLabels.map((label) => (
                        <SelectItem
                          key={label}
                          value={label}
                          className="capitalize"
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
