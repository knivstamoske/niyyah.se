import { env } from '$env/dynamic/private';
import { z } from 'zod';

/**
 * Environment variable schema for www-niyyah-se
 */
const envSchema = z.object({
	DATABASE_URL: z.url(),
	ORIGIN: z.url()
});

/**
 * Validate and parse environment variables
 * Throws an error if validation fails
 */
const parsedEnv = envSchema.parse(env);

/**
 * Centralized configuration object
 * All server-side code should use this instead of accessing env directly
 */
export const config = {
	server: {
		origin: parsedEnv.ORIGIN
	},
	database: {
		url: parsedEnv.DATABASE_URL
	}
} as const;
