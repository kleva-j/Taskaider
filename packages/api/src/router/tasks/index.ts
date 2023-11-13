import { tasks } from "@taskaider/neon/src/schema";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "../../lib/trpc";
import { DeleteTasksRouter } from "../../router/tasks/delete";
import { UpdateTasksRouter } from "../../router/tasks/update";
import { addTaskFormSchema } from "../../lib/typeSchema";
import { GetTasksRouter } from "../../router/tasks/get";

export const TaskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(addTaskFormSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db
          .insert(tasks)
          .values({ ...input, authorId: ctx.user.id })
          .returning();
      } catch (err: any) {
        console.log({ err });
        if (err.code === "P2002") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Task with that id already exists",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occured while processing your request.",
        });
      }
    }),
  get: GetTasksRouter,
  update: UpdateTasksRouter,
  delete: DeleteTasksRouter,
});
