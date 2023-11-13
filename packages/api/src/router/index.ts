import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

import { createTRPCRouter } from "../lib/trpc";
import { clerkRouter } from "./clerk/webhook";
import { UserRouter } from "../router/users";
import { TaskRouter } from "../router/tasks";

export const appRouter = createTRPCRouter({
  user: UserRouter,
  task: TaskRouter,
  clerk: clerkRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
