import { appRouter } from "@/server/router";
import { db } from "@/lib/db";

export const serverClient = appRouter.createCaller({ db, user: null });
