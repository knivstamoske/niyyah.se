import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { config } from '$lib/server/config';
import { db } from '$lib/server/db';
import { facilitator } from '@niyyah/db/schema';

/**
 * matchAuthClient is a stripped-down better-auth instance for the administrator application.
 * It uses the 'administrator' PostgreSQL schema for storing authentication data.
 * Includes the admin plugin to allow creating/managing facilitators from the admin app.
 */
export const matchAuthClient = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			user: facilitator.user,
			session: facilitator.session,
			account: facilitator.account,
			verification: facilitator.verification
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
	// Add the admin plugin to enable createUser and user management APIs
	plugins: [admin()]
});
