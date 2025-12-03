import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const waitlistEmails = pgTable('waitlist_emails', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	verified: boolean('verified').notNull().default(false)
});
