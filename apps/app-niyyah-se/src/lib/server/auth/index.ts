import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins/magic-link';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { candidate } from '@niyyah/db/schema';
import nodemailer from 'nodemailer';
import {
	createMagicLinkEmail,
	MAGIC_LINK_EXPIRY_SECONDS
} from '$lib/server/email/magic-link-template';

/**
 * Validate required environment variables
 */
if (!env.BETTER_AUTH_SECRET) {
	throw new Error(
		'BETTER_AUTH_SECRET environment variable is required. Generate one with: openssl rand -base64 32'
	);
}

if (env.BETTER_AUTH_SECRET.length < 32) {
	console.warn(
		'⚠️  WARNING: BETTER_AUTH_SECRET should be at least 32 characters for production use.'
	);
}

/**
 * Create SMTP transporter for sending emails
 */
const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST || 'localhost',
	port: parseInt(env.SMTP_PORT || '1025'),
	secure: false,
	auth: env.SMTP_USER
		? {
				user: env.SMTP_USER,
				pass: env.SMTP_PASS
			}
		: undefined
});

/**
 * auth is the better-auth instance configured for the candidate application.
 * It uses the 'candidate' PostgreSQL schema for storing authentication data.
 *
 * Authentication: Magic link (passwordless) via email
 */
export const auth = betterAuth({
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
	secret: env.BETTER_AUTH_SECRET,
	// Session configuration
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24 // 1 day
	},
	// Base URL configuration
	baseURL: env.ORIGIN || 'http://localhost:8020',
	// Trusted origins
	trustedOrigins: env.ORIGIN ? [env.ORIGIN] : ['http://localhost:8020'],
	// Add plugins
	plugins: [
		magicLink({
			expiresIn: MAGIC_LINK_EXPIRY_SECONDS,
			sendMagicLink: async ({ email, url }) => {
				const emailTemplate = await createMagicLinkEmail({ email, url });

				const mailOptions = {
					from: env.SMTP_FROM || 'noreply@niyyah.se',
					to: email,
					subject: emailTemplate.subject,
					html: emailTemplate.html,
					text: emailTemplate.text
				};

				try {
					await transporter.sendMail(mailOptions);
				} catch (error) {
					console.error('Failed to send magic link email:', error);
					throw error;
				}
			}
		}),
		// Add SvelteKit cookies plugin (must be last)
		sveltekitCookies(getRequestEvent)
	]
});
