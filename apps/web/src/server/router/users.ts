import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { users } from "@taskaider/neon";
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
      const { rows } = await ctx.db.insert(users).values({ ...input });
      return rows;
    }),
  getAll: publicProcedure.query(
    async ({ ctx }) => await ctx.db.select().from(users),
  ),
});
