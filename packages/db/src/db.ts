import type { LibSQLDatabase } from "drizzle-orm/libsql";
import type { Config } from "@libsql/client/http";
import { createClient } from "@libsql/client/http";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const createConnection = (
  config: Config,
): LibSQLDatabase<typeof schema> => {
  return drizzle(createClient(config), { schema });
};
