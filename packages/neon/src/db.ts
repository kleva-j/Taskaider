import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { env } from "../env.mjs";

export const createConnection = (config = env.DATABASE_URL) => {
  const pool = new Pool({ connectionString: config });
  return drizzle(pool);
};
