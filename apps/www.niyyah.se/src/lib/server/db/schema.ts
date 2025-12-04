import { pgTable, uuid, varchar, timestamp, boolean, text, integer } from 'drizzle-orm/pg-core';

export const waitlistEmails = pgTable('waitlist_emails', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	verified: boolean('verified').notNull().default(false)
});

export const candidateApplications = pgTable('candidate_applications', {
	id: uuid('id').primaryKey().defaultRandom(),
	// Personal information
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	phone: varchar('phone', { length: 50 }),
	birthYear: integer('birth_year').notNull(),
	gender: varchar('gender', { length: 10 }).notNull(), // 'man' or 'woman'
	city: varchar('city', { length: 255 }).notNull(),
	// Profile information
	occupation: varchar('occupation', { length: 255 }),
	education: varchar('education', { length: 255 }),
	familySituation: text('family_situation'),
	religiousPractice: text('religious_practice'),
	housingSituation: text('housing_situation'),
	intention: text('intention'),
	aboutMe: text('about_me'),
	// What they are seeking
	seekingAgeMin: integer('seeking_age_min'),
	seekingAgeMax: integer('seeking_age_max'),
	seekingCity: varchar('seeking_city', { length: 255 }),
	// Metadata
	createdAt: timestamp('created_at').notNull().defaultNow()
});
