import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { initEdgeStore } from "@edgestore/server";
import { z } from "zod";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket({ maxSize: 1024 * 1024 * 10, accept: ["image/*"] })
    .input(z.object({ type: z.enum(["post", "profile"]) }))
    .path(({ input }) => [{ type: input.type }]),

  protectedFiles: es
    .fileBucket({ maxSize: 1024 * 1024 * 10 })
    .input(z.object({ type: z.enum(["post", "profile"]) }))
    .path(({ input }) => [{ type: input.type }]),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
