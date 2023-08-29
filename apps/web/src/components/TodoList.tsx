import { Input, Label, Button, Checkbox } from "ui";
import { ChangeEvent, useState } from "react";
import { trpc } from "@/app/_trpc/client";

export default function TodoList() {
  const getTasks = trpc.task.getAll.useQuery();
  const createTask = trpc.task.create.useMutation({
    onSettled: () => getTasks.refetch(),
  });
  const closeTask = trpc.task.update.useMutation({
    onSettled: () => getTasks.refetch(),
  });

  const [content, setContent] = useState("");

  const handleClick = async () => {
    await createTask.mutateAsync(content).then(() => setContent(""));
  };

  const handleCheck = async (id: string, checked: boolean) => {
    await closeTask.mutateAsync({ id, status: checked ? "open" : "closed" });
  };

  return (
    <div className="ui-flex ui-flex-col-reverse">
      <div className="ui-my-5 ui-text-3xl pl-2">
        {getTasks?.data?.map((task) => (
          <div
            key={task.id}
            className="ui-flex ui-space-x-2 ui-my-2 ui-items-center"
          >
            <Checkbox
              id={`check-${task.id}`}
              checked={task.status === "closed"}
              onClick={() => handleCheck(task.id, task.status === "closed")}
            />
            <Label htmlFor={`check-${task.id}`}>{task.description}</Label>
          </div>
        ))}
      </div>
      <div className="ui-flex ui-gap-x-2">
        <Input
          type="text"
          value={content}
          placeholder="Enter content"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContent(e.target.value)
          }
        />
        <Button onClick={handleClick}>Save</Button>
      </div>
    </div>
  );
}
