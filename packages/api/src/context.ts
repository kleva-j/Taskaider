import { type CreateContextOptions } from "@edgestore/server/adapters/next/app";
import { type User, getAuth, clerkClient } from "@clerk/nextjs/server";
import { type inferAsyncReturnType } from "@trpc/server";

import { db } from "./lib/db";

interface UserProps {
  user: User | null;
}

export const createContextInner = async ({ user }: UserProps) => {
  return { user, db };
};

export const createContext = async (opts: CreateContextOptions) => {
  async function getUser() {
    const { userId } = getAuth(opts.req);
    const user = userId ? clerkClient.users.getUser(userId) : null;
    return user;
  }
  const user = await getUser();
  return await createContextInner({ user });
};

export type Context = inferAsyncReturnType<typeof createContext>;
