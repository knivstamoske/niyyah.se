import { query } from '$app/server';
import { db } from '$lib/server/db';
import { candidate } from '@niyyah/db';
import { eq } from 'drizzle-orm';

/**
 * getBannedCandidates is a query that fetches all banned candidates.
 */
export const getBannedCandidates = query(async () => {
	const banned = await db
		.select({
			id: candidate.profile.id,
			userId: candidate.profile.userId,
			name: candidate.profile.name,
			email: candidate.user.email,
			birthYear: candidate.profile.birthYear,
			gender: candidate.profile.gender,
			kommun: candidate.profile.kommun,
			status: candidate.profile.status,
			createdAt: candidate.profile.createdAt,
			updatedAt: candidate.profile.updatedAt
		})
		.from(candidate.profile)
		.innerJoin(candidate.user, eq(candidate.profile.userId, candidate.user.id))
		.where(eq(candidate.profile.status, 'banned'));

	return banned;
});
