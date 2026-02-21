import { query } from '$app/server';
import { db } from '$lib/server/db';
import { candidate } from '@niyyah/db';
import { z } from 'zod';
import { and, count, desc, eq, ilike, or, sql } from 'drizzle-orm';

/**
 * CandidateFiltersSchema validates the input for candidate directory filtering.
 */
const CandidateFiltersSchema = z.object({
	status: z
		.enum(['all', 'onboarding', 'verifying', 'active', 'paused', 'matching', 'matched', 'archived', 'banned'])
		.optional(),
	gender: z.enum(['all', 'male', 'female']).optional(),
	search: z.string().optional()
});

/**
 * getCandidates is a query that fetches a list of candidates with optional filtering.
 */
export const getCandidates = query(CandidateFiltersSchema, async (filters) => {
	const searchTerm = filters?.search?.trim();
	const statusFilter = filters?.status && filters.status !== 'all' ? filters.status : null;
	const genderFilter = filters?.gender && filters.gender !== 'all' ? filters.gender : null;

	// Build where conditions
	const conditions = [];

	if (statusFilter) {
		conditions.push(eq(candidate.profile.status, statusFilter as any));
	}

	if (genderFilter) {
		conditions.push(eq(candidate.profile.gender, genderFilter as any));
	}

	if (searchTerm) {
		conditions.push(
			or(
				ilike(candidate.profile.name, `%${searchTerm}%`),
				ilike(candidate.user.email, `%${searchTerm}%`),
				ilike(candidate.profile.kommun, `%${searchTerm}%`)
			)
		);
	}

	// Fetch candidates with user info
	const candidates = await db
		.select({
			id: candidate.profile.id,
			userId: candidate.profile.userId,
			name: candidate.profile.name,
			email: candidate.user.email,
			emailVerified: candidate.user.emailVerified,
			birthYear: candidate.profile.birthYear,
			kommun: candidate.profile.kommun,
			gender: candidate.profile.gender,
			maritalStatus: candidate.profile.maritalStatus,
			status: candidate.profile.status,
			createdAt: candidate.profile.createdAt,
			updatedAt: candidate.profile.updatedAt
		})
		.from(candidate.profile)
		.innerJoin(candidate.user, eq(candidate.profile.userId, candidate.user.id))
		.where(conditions.length > 0 ? and(...conditions) : undefined)
		.orderBy(desc(candidate.profile.createdAt))
		.limit(100);

	return candidates;
});
