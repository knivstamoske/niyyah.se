import { query } from '$app/server';
import { db } from '$lib/server/db';
import { candidate } from '@niyyah/db';
import { or, eq, desc } from 'drizzle-orm';

/**
 * getActiveCandidates is a query that fetches candidates eligible to be proposed a meeting.
 * Returns candidates with status 'active' or 'matching', used to populate the new meeting modal.
 */
export const getActiveCandidates = query(async () => {
	const results = await db
		.select({
			id: candidate.profile.id,
			name: candidate.profile.name,
			gender: candidate.profile.gender,
			kommun: candidate.profile.kommun,
			status: candidate.profile.status
		})
		.from(candidate.profile)
		.where(or(eq(candidate.profile.status, 'active'), eq(candidate.profile.status, 'matching')))
		.orderBy(candidate.profile.gender, desc(candidate.profile.name))
		.limit(500);

	return results;
});
