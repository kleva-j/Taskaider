import { and, eq, tasks } from "@taskaider/neon";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../lib/trpc";

export const DeleteTasksRouter = createTRPCRouter({
  single: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { id: userId } = ctx.user;
        const task = await ctx.db
          .delete(tasks)
          .where(and(eq(tasks.id, input.id), eq(tasks.authorId, userId)))
          .returning({ deletedId: tasks.id });
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
    .input(z.object({ ids: z.array(z.number()).min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { ids } = input;

      try {
        await ctx.db.transaction(async (tx) => {
          const result = await Promise.allSettled(
            ids.map(
              async (id) =>
                await tx
                  .delete(tasks)
                  .where(and(eq(tasks.id, id), eq(tasks.authorId, userId)))
                  .returning({ deletedId: tasks.id }),
            ),
          );
          return result
            .map((id) => (id.status === "fulfilled" ? id.value[0] : false))
            .filter(Boolean);
        });
      } catch (err) {
        throw err;
      }
    }),
});
