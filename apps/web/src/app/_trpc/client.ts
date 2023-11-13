// import { type AppRouter } from "@/server/router";

// import { createTRPCReact } from "@trpc/react-query";

// export const trpc = createTRPCReact<AppRouter>({
//   abortOnUnmount: true,
// });

import { type AppRouter } from "@taskaider/api";

import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>({ abortOnUnmount: true });
