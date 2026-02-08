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
	SMTP_SECURE: z
		.string()
		.optional()
		.transform((val) => val === 'true' || val === '1'),
	SMTP_USER: z.string().optional(),
	SMTP_PASS: z.string().optional(),
	SMTP_FROM: z.email(),
	ADMIN_EMAIL: z.email(),
	ADMIN_PASSWORD: z.string().min(8)
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
		secure: parsedEnv.SMTP_SECURE,
		from: parsedEnv.SMTP_FROM,
		user: parsedEnv.SMTP_USER,
		pass: parsedEnv.SMTP_PASS
	},
	admin: {
		email: parsedEnv.ADMIN_EMAIL,
		password: parsedEnv.ADMIN_PASSWORD
	}
};
