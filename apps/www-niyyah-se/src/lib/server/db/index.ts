import { env } from '$env/dynamic/private';
import { createClient } from '@niyyah/db';

/**
 * Postgres client instance connected to the database.
 */
export const { client, db } = createClient(env.DATABASE_URL);
