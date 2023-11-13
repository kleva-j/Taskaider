import { and, eq, tasks } from "@taskaider/neon";
import { TRPCError } from "@trpc/server";

import { updateBatchSchema, updateTaskSchema } from "../../lib/typeSchema";
import { createTRPCRouter, protectedProcedure } from "../../lib/trpc";
import { filterParams, isEmpty } from "../../lib/helper";

export const UpdateTasksRouter = createTRPCRouter({
  single: protectedProcedure
    .input(updateTaskSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, title, label, status, priority } = input;
      const update = { title, label, status, priority };
      const { id: userId } = ctx.user;

      try {
        const task = await ctx.db
          .update(tasks)
          .set({ ...update })
          .where(and(eq(tasks.id, id), eq(tasks.authorId, userId)))
          .returning({ updatedId: tasks.id });
        if (!task)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Task with that ID not found",
          });
        return task;
      } catch (err) {
        throw err;
      }
    }),
  multiple: protectedProcedure
    .input(updateBatchSchema)
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { ids, params } = input;
      const update = filterParams(params);
      try {
        if (isEmpty(update))
          throw new Error("Ensure update parameters are valid!");

        return await ctx.db.transaction(async (tx) => {
          const [rows] = await Promise.allSettled(
            ids.map(
              async (id) =>
                await tx
                  .update(tasks)
                  .set({ ...update })
                  .where(and(eq(tasks.id, id), eq(tasks.authorId, userId)))
                  .returning({ updatedId: tasks.id }),
            ),
          );
          if (rows.status !== "fulfilled")
            throw new Error("Error updating tasks");
          return rows.value;
        });
      } catch (err) {
        throw err;
      }
    }),
});
