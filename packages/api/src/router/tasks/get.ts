import { and, asc, eq, tasks } from "@taskaider/neon";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../lib/trpc";
import { getBatchFilterQuery } from "../../lib/typeSchema";

export const GetTasksRouter = createTRPCRouter({
  batch: protectedProcedure
    .input(getBatchFilterQuery)
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { limit, offset } = input;
      const result = await ctx.db
        .select()
        .from(tasks)
        .where(eq(tasks.authorId, userId))
        .orderBy(asc(tasks.id))
        .offset(offset!)
        .limit(limit);
      return result;
    }),
  all: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    try {
      const result = await ctx.db
        .select()
        .from(tasks)
        .where(eq(tasks.authorId, userId));
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Error occured while fetching!`,
      });
    }
  }),
  single: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const task = await ctx.db
        .select()
        .from(tasks)
        .where(and(eq(tasks.id, input.id), eq(tasks.authorId, userId)));
      if (!task)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Task with that ID not found`,
        });
      return task;
    }),
});
