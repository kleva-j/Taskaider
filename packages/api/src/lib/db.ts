import { createConnection } from "@taskaider/neon";
import { env } from "@/env";

export const db = createConnection(env.DATABASE_URL);
