"use client";

import { defaultLabels, priorities } from "@taskaider/db/src/schema";
import { PlusIcon } from "lucide-react";
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
  Select,
  Dialog,
  Button,
  Input,
  Label,
} from "ui";

export const AddNewTask = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="ml-auto rounded-full">
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">New task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm border-border">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" name="add_new_task">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              placeholder={`"Take out the trash."`}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Priority
            </Label>
            <RadioGroup defaultValue="low" className="flex gap-x-2">
              {priorities.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={item} />
                  <Label htmlFor={item} className="capitalize">
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label
            </Label>
            <Select defaultValue={defaultLabels[0]}>
              <SelectTrigger id="label" className="col-start-2 col-span-2">
                <SelectValue
                  className="capitalize"
                  placeholder="Select a label..."
                />
              </SelectTrigger>
              <SelectContent position="popper">
                {defaultLabels.map((label) => (
                  <SelectItem key={label} value={label} className="capitalize">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>

        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
