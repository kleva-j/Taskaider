"use client";

import { defaultTags, priorities } from "@taskaider/db/src/schema";
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
        <Button
          size="icon"
          variant="outline"
          className="ui-ml-auto rounded-full"
        >
          <PlusIcon className="ui-h-4 ui-w-4" />
          <span className="sr-only">New task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="ui-max-w-sm max-w-sm">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form className="ui-grid ui-gap-4 ui-py-4">
          <div className="ui-grid ui-grid-cols-4 ui-items-center ui-gap-4">
            <Label htmlFor="title" className="ui-text-right">
              Title
            </Label>
            <Input
              id="title"
              className="ui-col-span-3"
              placeholder={"Take out the trash."}
            />
          </div>
          <div className="ui-grid ui-grid-cols-4 ui-items-center ui-gap-4">
            <Label htmlFor="name" className="ui-text-right">
              Priority
            </Label>
            <RadioGroup defaultValue="low" className="ui-flex flex ui-gap-x-2">
              {priorities.map((item) => (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={item} />
                  <Label htmlFor={item} className="ui-capitalize">
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="ui-grid ui-grid-cols-4 ui-items-center ui-gap-4">
            <Label htmlFor="tag" className="ui-text-right">
              Tag
            </Label>
            <Select>
              <SelectTrigger id="tag" className="ui-col-start-2 ui-col-span-2">
                <SelectValue
                  className="ui-capitalize"
                  placeholder="Select a tag..."
                />
              </SelectTrigger>
              <SelectContent position="popper">
                {defaultTags.map((tag) => (
                  <SelectItem key={tag} value={tag} className="ui-capitalize">
                    {tag}
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
