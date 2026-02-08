import { query } from '$app/server';
import { db } from '$lib/server/db';
import { candidate } from '@niyyah/db';
import { sql, count } from 'drizzle-orm';

/**
 * getDashboardMetrics is a query that fetches platform-wide metrics for the admin dashboard.
 */
export const getDashboardMetrics = query(async () => {
	// Total users by status
	const candidatesByStatus = await db
		.select({
			status: candidate.profile.status,
			count: count()
		})
		.from(candidate.profile)
		.groupBy(candidate.profile.status);

	// Calculate totals
	const totalCandidates = candidatesByStatus.reduce((acc, curr) => acc + curr.count, 0);
	const pendingVerifications = candidatesByStatus.find((s) => s.status === 'verifying')?.count || 0;
	const activeCandidates = candidatesByStatus.find((s) => s.status === 'active')?.count || 0;
	const pausedCandidates = candidatesByStatus.find((s) => s.status === 'paused')?.count || 0;

	// Gender distribution
	const candidatesByGender = await db
		.select({
			gender: candidate.profile.gender,
			count: count()
		})
		.from(candidate.profile)
		.groupBy(candidate.profile.gender);

	const maleCandidates = candidatesByGender.find((g) => g.gender === 'male')?.count || 0;
	const femaleCandidates = candidatesByGender.find((g) => g.gender === 'female')?.count || 0;

	// Geographic distribution (top 10 kommuner)
	const candidatesByKommun = await db
		.select({
			kommun: candidate.profile.kommun,
			count: count()
		})
		.from(candidate.profile)
		.groupBy(candidate.profile.kommun)
		.orderBy(sql`count(*) DESC`)
		.limit(10);

	// Recent registrations (last 30 days)
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	const [recentRegistrations] = await db
		.select({ count: count() })
		.from(candidate.user)
		.where(sql`${candidate.user.createdAt} >= ${thirtyDaysAgo.toISOString()}`);

	const newRegistrations30d = recentRegistrations?.count || 0;

	return {
		totalCandidates,
		pendingVerifications,
		activeCandidates,
		pausedCandidates,
		maleCandidates,
		femaleCandidates,
		candidatesByStatus: candidatesByStatus.map((s) => ({
			status: s.status,
			count: s.count
		})),
		candidatesByKommun,
		newRegistrations30d
	};
});
