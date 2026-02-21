import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { config } from '$lib/server/config';
import { db } from '$lib/server/db';
import { candidate } from '@niyyah/db/schema';

/**
 * appAuthClient is a stripped-down better-auth instance for the candidate application.
 * It uses the 'candidate' PostgreSQL schema for storing authentication data.
 * Used by the admin app to manage candidates.
 */
export const appAuthClient = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			user: candidate.user,
			session: candidate.session,
			account: candidate.account,
			verification: candidate.verification
		}
	}),
	// Secret for signing tokens (required for production)
	secret: config.auth.secret,
	// Session configuration
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24 // 1 day
	},
	// Base URL configuration
	baseURL: config.server.origin,
	// Trusted origins
	trustedOrigins: config.server.trustedOrigins,
});
