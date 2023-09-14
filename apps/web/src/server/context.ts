import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type inferAsyncReturnType } from "@trpc/server";
import { type NextApiRequest } from "next";
import {
  type SignedOutAuthObject,
  type SignedInAuthObject,
} from "@clerk/nextjs/api";

import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export type CreateContextOptions = {
  auth: SignedInAuthObject | SignedOutAuthObject | null;
  req?: CreateNextContextOptions["req"];
};

const createContextInner = async (opts: CreateContextOptions) => {
  return { ...opts, db };
};

export const createTRPCContext = (opts: {
  req: CreateNextContextOptions["req"] | NextApiRequest;
}) => {
  return createContextInner({
    auth: getAuth(opts.req),
    req: opts.req,
  });
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
