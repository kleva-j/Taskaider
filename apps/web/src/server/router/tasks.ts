import { PriorityEnum, StatusEnum, tasks } from "@taskaider/db/src/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { filterParams, isEmpty } from "@/lib/helper";
import { and, asc, eq } from "@taskaider/db";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";
import { z } from "zod";
import {
  getBatchFilterQuery,
  addTaskFormSchema,
  updateBatchParams,
} from "@/lib/typeSchema";

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
  getBatch: protectedProcedure
    .input(getBatchFilterQuery)
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { limit, offset } = input;
      return await db.query.tasks.findMany({
        limit,
        offset,
        orderBy: [asc(tasks.id)],
        where: eq(tasks.authorId, userId),
      });
    }),
  deleteBatch: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string().cuid2()).min(2),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { ids } = input;

      try {
        await db.transaction(async (tx) => {
          const results = await Promise.allSettled(
            ids.map(
              async (id) =>
                await tx
                  .delete(tasks)
                  .where(and(eq(tasks.id, id), eq(tasks.authorId, userId)))
                  .returning({ deletedId: tasks.id }),
            ),
          );
          const deletedIds = results
            .map((id) => (id.status === "fulfilled" ? id.value[0] : false))
            .filter(Boolean);
          return deletedIds;
        });
      } catch (err) {
        throw err;
      }
    }),
  updateBatch: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string().cuid2()).min(2),
        params: updateBatchParams,
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { ids, params } = input;
      const update = filterParams(params);
      try {
        if (isEmpty(update))
          throw new Error("Ensure update parameters are valid!");

        await db.transaction(async (tx) => {
          Promise.allSettled(
            ids.map(
              async (id) =>
                await tx
                  .update(tasks)
                  .set({ ...update })
                  .where(and(eq(tasks.id, id), eq(tasks.authorId, userId))),
            ),
          );
        });
      } catch (err) {
        throw err;
      }
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    return await db.query.tasks.findMany({
      where: eq(tasks.authorId, userId),
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string().cuid2() }))
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const task = await db
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
  update: protectedProcedure
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
  delete: protectedProcedure
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
});
