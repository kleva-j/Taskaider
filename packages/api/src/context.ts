import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type inferAsyncReturnType } from "@trpc/server";
import {
  type SignedInAuthObject,
  type SignedOutAuthObject,
} from "@clerk/nextjs/api";

import { getAuth } from "@clerk/nextjs/server";
import { db } from "@taskaider/db";

type CreateContextOptions = {
  auth: SignedInAuthObject | SignedOutAuthObject | null;
  req: CreateNextContextOptions["req"];
};

export const createContextInner = async (opts: CreateContextOptions) => {
  return { ...opts, db };
};

export const createTRPCContext = (opts: {
  req: CreateNextContextOptions["req"];
}) => {
  return createContextInner({
    auth: getAuth(opts.req),
    req: opts.req,
  });
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
