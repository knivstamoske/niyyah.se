import { pgEnum, pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Group PostgreSQL schemas on an object for easy access.
 */
export const schemas = {
	marketing: pgSchema('marketing')
};

/**
 * Group PostgreSQL enums on an object for easy access.
 */
export const enums = {
	gender: pgEnum('gender', ['male', 'female'])
};

/**
 * Waitlist is the table for storing waitlist signups.
 */
export const waitlist = schemas.marketing.table('waitlist', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: text('email').notNull().unique(),
	gender: enums.gender('gender'),
	nearestCity: text('nearest_city'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at'),
	deletedAt: timestamp('deleted_at')
});
