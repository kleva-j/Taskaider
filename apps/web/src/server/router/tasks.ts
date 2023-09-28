import { PriorityEnum, StatusEnum, tasks } from "@taskaider/db/src/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { addTaskFormSchema } from "@/lib/formSchema";
import { and, asc, eq } from "@taskaider/db";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";
import { z } from "zod";

const filterQuery = z.object({
  limit: z.number(),
  offset: z.number().optional(),
});

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
    .input(filterQuery)
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
