import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

/**
 * Postgres client instance connected to the database.
 */
const client = postgres(env.DATABASE_URL, { prepare: false });

/**
 * Drizzle database instance for the application.
 */
export const db = drizzle(client, { schema });
