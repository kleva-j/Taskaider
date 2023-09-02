import { Input, Label, Button, Checkbox } from "ui";
import { ChangeEvent, useState } from "react";
import { trpc } from "@/app/_trpc/client";

export default function TodoList() {
  const getTasks = trpc.task.getAll.useQuery();
  const createTask = trpc.task.create.useMutation({
    onSettled: () => getTasks.refetch(),
  });

  const [content, setContent] = useState("");

  const handleClick = async () => {
    await createTask.mutateAsync(content).then(() => setContent(""));
  };

  return (
    <div className="flex flex-col-reverse">
      <div className="my-5 text-3xl pl-2">
        {getTasks?.data?.map((task) => (
          <div key={task.id} className="flex space-x-2 my-2 items-center">
            <Checkbox id={`check-${task.id}`} />
            <Label htmlFor={`check-${task.id}`}>{task.title}</Label>
          </div>
        ))}
      </div>
      <div className="flex gap-x-2">
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
