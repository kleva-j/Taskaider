import type { User } from "@clerk/nextjs/server";

import { appRouter } from "../router";
import { db } from "../lib/db";

export const serverClient = (user: User | null) =>
  appRouter.createCaller({ db, user: user || null });
// export const caller = appRouter.createCaller(await createContext({ req }));
