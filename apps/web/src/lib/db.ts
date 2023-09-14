import { createConnection } from "@taskaider/db";
import { env } from "@/env";

export const db = createConnection({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});
