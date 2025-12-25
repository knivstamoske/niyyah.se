import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

/**
 * Creates a new Drizzle database instance for the application.
 */
export function createClient(url: string) {
  const client = postgres(url, { prepare: false });
  const db = drizzle(client);
  return { client, db };
}
