import "dotenv/config";

import type { Config } from "drizzle-kit";
import { env } from "./env.mjs";

export default {
  schema: "./src/schema/index.ts",
  out: "./src/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL_WITH_SSL,
  },
  strict: true,
} satisfies Config;
