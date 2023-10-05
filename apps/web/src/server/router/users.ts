import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { users } from "@taskaider/db/src/schema";
import { db } from "@/lib/db";
import { z } from "zod";

export const UserRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        firstname: z.string().trim(),
        lastname: z.string().trim(),
        email: z.string().email(),
        photoUrl: z.string().url(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .insert(users)
        .values({ ...input })
        .run();
      return true;
    }),
  getAll: publicProcedure.query(
    async ({ ctx }) => await ctx.db.select().from(users).all(),
  ),
});
