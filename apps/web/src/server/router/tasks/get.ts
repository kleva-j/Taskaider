import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { getBatchFilterQuery } from "@/lib/typeSchema";
import { tasks } from "@taskaider/db/src/schema";
import { and, asc, eq } from "@taskaider/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const GetTasksRouter = createTRPCRouter({
  batch: protectedProcedure
    .input(getBatchFilterQuery)
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { limit, offset } = input;
      return await ctx.db.query.tasks.findMany({
        limit,
        offset,
        orderBy: [asc(tasks.id)],
        where: eq(tasks.authorId, userId),
      });
    }),
  all: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    return await ctx.db.query.tasks.findMany({
      where: eq(tasks.authorId, userId),
    });
  }),
  single: protectedProcedure
    .input(z.object({ id: z.string().cuid2() }))
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const task = await ctx.db
        .select()
        .from(tasks)
        .where(and(eq(tasks.id, input.id), eq(tasks.authorId, userId)))
        .run();
      if (!task)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Task with that ID not found`,
        });
      return task;
    }),
});
