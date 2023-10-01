import { PriorityEnum, StatusEnum, tasks } from "@taskaider/db/src/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { filterParams, isEmpty } from "@/lib/helper";
import { updateBatchParams } from "@/lib/typeSchema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "@taskaider/db";
import { db } from "@/lib/db";
import { z } from "zod";

export const UpdateTasksRouter = createTRPCRouter({
  single: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid2(),
        title: z.string(),
        label: z.string().optional(),
        status: StatusEnum.optional(),
        priority: PriorityEnum.optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, title, label, status, priority } = input;
      const update = { title, label, status, priority };
      const { id: userId } = ctx.user;

      try {
        const task = await db
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
    .input(
      z.object({
        ids: z.array(z.string().cuid2()).min(2),
        params: updateBatchParams,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { ids, params } = input;
      const update = filterParams(params);
      try {
        if (isEmpty(update))
          throw new Error("Ensure update parameters are valid!");

        await db.transaction(async (tx) => {
          const result = await Promise.allSettled(
            ids.map(
              async (id) =>
                await tx
                  .update(tasks)
                  .set({ ...update })
                  .where(and(eq(tasks.id, id), eq(tasks.authorId, userId)))
                  .returning({ updatedId: tasks.id }),
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
