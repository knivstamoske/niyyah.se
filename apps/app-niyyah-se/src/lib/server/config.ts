import { env } from '$env/dynamic/private';
import { z } from 'zod';

/**
 * Environment variable schema for app-niyyah-se
 */
const envSchema = z.object({
	DATABASE_URL: z.url(),
	ORIGIN: z.url(),
	AUTH_SECRET: z.string().min(1),
	LINK_EXPIRY: z.coerce.number().int().positive(),
	SMTP_HOST: z.string().min(1),
	SMTP_PORT: z.coerce.number().int().positive(),
	SMTP_FROM: z.email(),
	SMTP_USER: z.string().optional(),
	SMTP_PASS: z.string().optional()
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
		origin: parsedEnv.ORIGIN,
		trustedOrigins: [parsedEnv.ORIGIN]
	},
	database: {
		url: parsedEnv.DATABASE_URL
	},
	auth: {
		secret: parsedEnv.AUTH_SECRET,
		linkExpiry: parsedEnv.LINK_EXPIRY
	},
	smtp: {
		host: parsedEnv.SMTP_HOST,
		port: parsedEnv.SMTP_PORT,
		from: parsedEnv.SMTP_FROM,
		user: parsedEnv.SMTP_USER,
		pass: parsedEnv.SMTP_PASS
	}
};
