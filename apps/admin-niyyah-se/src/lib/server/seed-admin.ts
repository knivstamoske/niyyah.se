import { db } from '$lib/server/db';
import { administrator } from '@niyyah/db/schema';
import { config } from '$lib/server/config';
import { eq } from 'drizzle-orm';

/**
 * Ensures that an admin user exists in the database.
 * If the admin user doesn't exist, creates one with credentials from environment variables.
 * This function is idempotent and safe to call on every app startup.
 */
export async function ensureAdminUser(): Promise<void> {
	try {
		// Check if admin user already exists
		const existingUser = await db
			.select()
			.from(administrator.user)
			.where(eq(administrator.user.email, config.admin.email))
			.limit(1);

		if (existingUser.length > 0) {
			console.log(`[Admin Seed] Admin user already exists: ${config.admin.email}`);
			return;
		}

		// Create admin user
		// Note: We're creating a basic user record. The actual authentication
		// will still use magic links since we disabled password auth.
		// The ADMIN_PASSWORD env var is kept for future use if we add password auth.
		const [newUser] = await db
			.insert(administrator.user)
			.values({
				id: crypto.randomUUID(),
				email: config.admin.email,
				name: 'Administrator',
				emailVerified: true,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returning();

		console.log(`[Admin Seed] Created admin user: ${newUser.email}`);
	} catch (error) {
		console.error('[Admin Seed] Failed to ensure admin user exists:', error);
		// Don't throw - we don't want to prevent app startup if seeding fails
	}
}
