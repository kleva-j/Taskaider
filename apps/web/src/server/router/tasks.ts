import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { tasks } from "@taskaider/db/src/schema";
import { TRPCError } from "@trpc/server";
import { db, eq } from "@taskaider/db";
import { z } from "zod";

export const TaskRouter = createTRPCRouter({
  create: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.insert(tasks).values({ description: input }).run();
    return true;
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
        description: z.string().optional(),
        status: z.enum(["open", "closed"]),
      }),
    )
    .mutation(
      async ({ input }) =>
        await db
          .update(tasks)
          .set({ status: input.status, description: input.description })
          .where(eq(tasks.id, input.id))
          .run(),
    ),
});
