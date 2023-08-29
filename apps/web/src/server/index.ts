import { CreateContextOptions } from "@/server/context";
import { appRouter } from "@/server/router";
import { db } from "@taskaider/db";

export const serverClient = (opts: CreateContextOptions) =>
  appRouter.createCaller({
    db,
    auth: opts.auth,
    req: opts.req,
  });