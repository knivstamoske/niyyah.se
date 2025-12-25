import { marketing } from '@niyyah/db';
import { config } from 'dotenv';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Load environment variables from .env file
config();

/**
 * TestDatabase provides database utilities for e2e tests.
 */
export class TestDatabase {
	private client: postgres.Sql;
	private db: ReturnType<typeof drizzle>;

	constructor() {
		const databaseUrl = process.env.DATABASE_URL;
		if (!databaseUrl) {
			throw new Error('DATABASE_URL environment variable is not set');
		}
		this.client = postgres(databaseUrl, { prepare: false });
		this.db = drizzle(this.client, { schema: marketing });
	}

	/**
	 * getWaitlistEntry retrieves a waitlist entry by email.
	 */
	async getWaitlistEntry(email: string) {
		const results = await this.db
			.select()
			.from(marketing.waitlist)
			.where(eq(marketing.waitlist.email, email.toLowerCase().trim()));
		return results[0] || null;
	}

	/**
	 * deleteWaitlistEntry removes a waitlist entry by email.
	 */
	async deleteWaitlistEntry(email: string) {
		await this.db
			.delete(marketing.waitlist)
			.where(eq(marketing.waitlist.email, email.toLowerCase().trim()));
	}

	/**
	 * countWaitlistEntries counts the number of waitlist entries with the given email.
	 */
	async countWaitlistEntries(email: string) {
		const results = await this.db
			.select()
			.from(marketing.waitlist)
			.where(eq(marketing.waitlist.email, email.toLowerCase().trim()));
		return results.length;
	}

	/**
	 * close closes the database connection.
	 */
	async close() {
		await this.client.end();
	}
}

/**
 * generateTestEmail generates a unique test email address.
 */
export function generateTestEmail(): string {
	const timestamp = Date.now();
	const random = Math.random().toString(36).substring(7);
	return `test-${timestamp}-${random}@example.com`;
}
