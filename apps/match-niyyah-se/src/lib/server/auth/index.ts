import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins/magic-link';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { config } from '$lib/server/config';
import { db } from '$lib/server/db';
import { facilitator } from '@niyyah/db/schema';
import nodemailer from 'nodemailer';
import { createMagicLinkEmail, LINK_EXPIRY } from '$lib/server/email/magic-link-template';

/**
 * Create SMTP transporter for sending emails
 */
const transporter = nodemailer.createTransport({
	host: config.smtp.host,
	port: config.smtp.port,
	secure: config.smtp.secure ?? false,
	auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined
});

/**
 * auth is the better-auth instance configured for the match/facilitator application.
 * It uses the 'facilitator' PostgreSQL schema for storing authentication data.
 *
 * Authentication: Magic link (passwordless) via email
 */
export const auth = betterAuth({
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
	// Add plugins
	plugins: [
		magicLink({
			expiresIn: LINK_EXPIRY,
			disableSignUp: true,
			sendMagicLink: async ({ email, url }) => {
				const emailTemplate = await createMagicLinkEmail({ email, url });

				const mailOptions = {
					from: config.smtp.from,
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
