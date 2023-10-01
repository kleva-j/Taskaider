import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { DeleteTasksRouter } from "@/server/router/tasks/delete";
import { UpdateTasksRouter } from "@/server/router/tasks/update";
import { GetTasksRouter } from "@/server/router/tasks/get";
import { addTaskFormSchema } from "@/lib/typeSchema";
import { tasks } from "@taskaider/db/src/schema";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";

export const TaskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(addTaskFormSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await db
          .insert(tasks)
          .values({ ...input, authorId: ctx.user.id })
          .returning();
      } catch (err) {
        if (err.code === "P2002") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Task with that id already exists",
          });
        }
        throw err;
      }
    }),
  get: GetTasksRouter,
  update: UpdateTasksRouter,
  delete: DeleteTasksRouter,
});
