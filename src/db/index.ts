import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle(queryClient, { schema });