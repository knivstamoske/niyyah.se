import { config } from '$lib/server/config';
import { createClient } from '@niyyah/db';

/**
 * Postgres client instance connected to the database.
 */
export const { client, db } = createClient(config.database.url);
