import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins/magic-link';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { client, db } from '$lib/server/db';
import { candidate } from '@niyyah/db/schema';
import nodemailer from 'nodemailer';

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
			sendMagicLink: async ({ email, url, token }) => {
				const mailOptions = {
					from: env.SMTP_FROM || 'noreply@niyyah.se',
					to: email,
					subject: 'Sign in to Niyyah',
					html: `
						<!DOCTYPE html>
						<html>
						<head>
							<meta charset="utf-8">
							<meta name="viewport" content="width=device-width, initial-scale=1">
						</head>
						<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
							<table role="presentation" style="width: 100%; border-collapse: collapse;">
								<tr>
									<td align="center" style="padding: 40px 0;">
										<table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
											<!-- Header -->
											<tr>
												<td style="padding: 40px 40px 20px; text-align: center;">
													<h1 style="margin: 0; font-size: 28px; color: #1a202c; font-weight: 600;">Sign in to Niyyah</h1>
												</td>
											</tr>
											<!-- Content -->
											<tr>
												<td style="padding: 0 40px 30px;">
													<p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #4a5568;">
														Click the button below to sign in to your Niyyah account. This link will expire in 10 minutes.
													</p>
													<table role="presentation" style="width: 100%; border-collapse: collapse;">
														<tr>
															<td align="center" style="padding: 20px 0;">
																<a href="${url}" style="display: inline-block; padding: 14px 32px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 500;">Sign In</a>
															</td>
														</tr>
													</table>
													<p style="margin: 20px 0 0; font-size: 14px; line-height: 20px; color: #718096;">
														If you didn't request this email, you can safely ignore it.
													</p>
												</td>
											</tr>
											<!-- Footer -->
											<tr>
												<td style="padding: 20px 40px; background-color: #f7fafc; border-top: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
													<p style="margin: 0; font-size: 12px; line-height: 18px; color: #a0aec0; text-align: center;">
														Niyyah.se - Islamic Marriage Matchmaking
													</p>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</body>
						</html>
					`,
					text: `Sign in to Niyyah\n\nClick this link to sign in to your account:\n${url}\n\nThis link will expire in 10 minutes.\n\nIf you didn't request this email, you can safely ignore it.`
				};

				try {
					await transporter.sendMail(mailOptions);
					console.log('\n========== MAGIC LINK EMAIL SENT ==========');
					console.log(`To: ${email}`);
					console.log(`View in Mailpit: http://localhost:8090`);
					console.log(`Magic Link: ${url}`);
					console.log('============================================\n');
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
