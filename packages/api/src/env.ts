import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    TEAM_ID_VERCEL: z.string(),
    DATABASE_URL: z.string().url(),
    VERCEL_AUTH_BEARER_TOKEN: z.string(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    TEAM_ID_VERCEL: process.env.TEAM_ID_VERCEL,
    VERCEL_AUTH_BEARER_TOKEN: process.env.VERCEL_AUTH_BEARER_TOKEN,
  },
});
