import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

import { UserRouter } from "@/router/users";
import { TaskRouter } from "@/router/tasks";
import { createTRPCRouter } from "@/trpc";

export const appRouter = createTRPCRouter({
  user: UserRouter,
  task: TaskRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
