import { PriorityEnum, StatusEnum, tasks } from "@taskaider/db/src/schema";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { db, eq } from "@taskaider/db";
import { z } from "zod";

const authorIds = [
  "zrjksvg95r3psg2il5qgqhal",
  "lmdatq6dqajzup4g2xrv5w97",
  "fq67tuaqzyiisxpht3tz3ea7",
];

export const TaskRouter = createTRPCRouter({
  create: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await db
      .insert(tasks)
      .values({ title: input, authorId: authorIds[0] })
      .returning()
      .get();
  }),
  getAll: publicProcedure.query(
    async () => await db.select().from(tasks).all(),
  ),
  getById: publicProcedure
    .input(z.object({ id: z.string().cuid2() }))
    .query(async ({ input }) => {
      const result = db
        .select()
        .from(tasks)
        .where(eq(tasks.id, input.id))
        .run();
      if (!result)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Task with id ${input.id} not found`,
        });
      return result;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        label: z.string(),
        status: StatusEnum,
        priority: PriorityEnum,
        title: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...update } = input;
      const result = await db
        .update(tasks)
        .set({ ...update })
        .where(eq(tasks.id, id))
        .returning()
        .get();
      return result;
    }),
});
