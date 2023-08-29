import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

import { UserRouter } from "@/server/router/users";
import { TaskRouter } from "@/server/router/tasks";
import { createTRPCRouter } from "@/server/trpc";

export const appRouter = createTRPCRouter({
  user: UserRouter,
  task: TaskRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
