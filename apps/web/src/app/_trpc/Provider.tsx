"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { httpBatchLink } from "@trpc/react-query";
import { trpc } from "@/app/_trpc/client";
import { getBaseUrl } from "@/lib/auth";

import SuperJSON from "superjson";

export function Provider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
      transformer: SuperJSON,
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
