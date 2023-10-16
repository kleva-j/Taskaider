import { z } from "zod";

import { users } from "@taskaider/db/src/schema";
import { eq } from "@taskaider/db";

import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { clerkEvent } from "./type";

export const webhookProcedure = publicProcedure.input(
  z.object({ data: clerkEvent }),
);

export const webhookRouter = createTRPCRouter({
  userCreated: webhookProcedure.mutation(async ({ ctx, input }) => {
    if (input.data.type === "user.created") {
      const alreadyExists = await ctx.db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.tenantId, input.data.data.id))
        .get();
      if (alreadyExists) return;
      await ctx.db
        .insert(users)
        .values({
          email: input.data.data.email_addresses[0].email_address,
          tenantId: input.data.data.id,
          firstName: input.data.data.first_name,
          lastName: input.data.data.last_name || "",
          photoUrl: input.data.data.image_url || "",
        })
        .returning()
        .get();
    }
  }),
  userUpdated: webhookProcedure.mutation(async ({ input }) => {
    if (input.data.type === "user.updated") {
      // We should do something
    }
  }),
  userSignedIn: webhookProcedure.mutation(async ({ input, ctx }) => {
    if (input.data.type === "session.created") {
      const currentUser = await ctx.db
        .select({ id: users.id, email: users.email })
        .from(users)
        .where(eq(users.tenantId, input.data.data.user_id))
        .get();
      // Then it's the new user it might be null
      if (!currentUser) return;
    }
  }),
});

export const clerkRouter = createTRPCRouter({
  webhooks: webhookRouter,
});
