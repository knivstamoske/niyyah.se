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

/**
 * MailpitClient provides utilities for interacting with Mailpit API in E2E tests.
 */
export class MailpitClient {
	private baseUrl: string;

	constructor(baseUrl: string = 'http://localhost:8090') {
		this.baseUrl = baseUrl;
	}

	/**
	 * getMessages fetches all messages from Mailpit.
	 */
	async getMessages(): Promise<any[]> {
		const response = await fetch(`${this.baseUrl}/api/v1/messages`);
		if (!response.ok) {
			throw new Error(`Failed to fetch messages: ${response.statusText}`);
		}
		const data = await response.json();
		return data.messages || [];
	}

	/**
	 * getLatestEmailByRecipient fetches the most recent email sent to a specific recipient.
	 */
	async getLatestEmailByRecipient(email: string): Promise<any | null> {
		const messages = await this.getMessages();
		const filtered = messages.filter((msg: any) =>
			msg.To?.some((to: any) => to.Address.toLowerCase() === email.toLowerCase())
		);
		// Sort by Created (newest first)
		filtered.sort(
			(a: any, b: any) => new Date(b.Created).getTime() - new Date(a.Created).getTime()
		);
		return filtered[0] || null;
	}

	/**
	 * getEmailById fetches a specific email by its ID.
	 */
	async getEmailById(id: string): Promise<any> {
		const response = await fetch(`${this.baseUrl}/api/v1/message/${id}`);
		if (!response.ok) {
			throw new Error(`Failed to fetch email: ${response.statusText}`);
		}
		return await response.json();
	}

	/**
	 * extractMagicLinkFromEmail extracts the magic link URL from an email's HTML content.
	 */
	async extractMagicLinkFromEmail(emailId: string): Promise<string | null> {
		const email = await this.getEmailById(emailId);
		const html = email.HTML;
		if (!html) return null;

		// Extract href from the magic link button
		const hrefMatch = html.match(/href="([^"]+)"/);
		if (!hrefMatch) return null;

		return hrefMatch[1];
	}

	/**
	 * clearAllEmails deletes all emails from Mailpit.
	 */
	async clearAllEmails(): Promise<void> {
		await fetch(`${this.baseUrl}/api/v1/messages`, {
			method: 'DELETE'
		});
	}
}
