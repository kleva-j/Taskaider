import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { tasks } from "@taskaider/db/src/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "@taskaider/db";
import { db } from "@/lib/db";
import { z } from "zod";

export const DeleteTasksRouter = createTRPCRouter({
  single: protectedProcedure
    .input(z.object({ id: z.string().cuid2() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { id: userId } = ctx.user;
        const task = await db
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
    .input(
      z.object({
        ids: z.array(z.string().cuid2()).min(2),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { ids } = input;

      try {
        await db.transaction(async (tx) => {
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
