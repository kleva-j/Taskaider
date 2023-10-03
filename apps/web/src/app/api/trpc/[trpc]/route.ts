import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@/server/context";
import { appRouter } from "@/server/router";

export const runtime = "edge";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    // @ts-ignore
    createContext,
  });

export { handler as GET, handler as POST };
