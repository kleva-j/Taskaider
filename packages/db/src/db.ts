import type { LibSQLDatabase } from "drizzle-orm/libsql";
import type { Config } from "@libsql/client/http";
import { createClient } from "@libsql/client/http";
import { drizzle } from "drizzle-orm/libsql";
// import { env } from "../env.mjs";
import * as schema from "./schema";

// const client = createClient({
//   url: env.DATABASE_URL,
//   authToken: env.DATABASE_AUTH_TOKEN,
// });

// export const db = drizzle(client, { schema });

export const createConnection = (
  config: Config,
): LibSQLDatabase<typeof schema> => {
  return drizzle(createClient(config), { schema });
};
