import { taskSchema } from "@/app/dashboard/tasks/_data/schema";
import { promises as fs } from "fs";
import { z } from "zod";

import path from "path";

export async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "./src/app/dashboard/tasks/_data/tasks.json"),
  );
  return z.array(taskSchema).parse(JSON.parse(data.toString()));
}
