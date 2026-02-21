import { query } from '$app/server';
import { db } from '$lib/server/db';
import { candidate, niyyah } from '@niyyah/db';
import { count } from 'drizzle-orm';

/**
 * getDashboardMetrics is a query that fetches facilitator-specific work queue metrics.
 * This includes candidate action items and meeting status counts.
 */
export const getDashboardMetrics = query(async () => {
	// Candidate counts by status (for action items)
	const candidatesByStatus = await db
		.select({
			status: candidate.profile.status,
			count: count()
		})
		.from(candidate.profile)
		.groupBy(candidate.profile.status);

	const pendingVerification = candidatesByStatus.find((s) => s.status === 'verifying')?.count || 0;
	const readyToMatch = candidatesByStatus.find((s) => s.status === 'active')?.count || 0;
	const inMatching = candidatesByStatus.find((s) => s.status === 'matching')?.count || 0;
	const totalMatched = candidatesByStatus.find((s) => s.status === 'matched')?.count || 0;

	// Meeting counts by status (for meetings overview)
	const meetingsByStatus = await db
		.select({
			status: niyyah.meeting.status,
			count: count()
		})
		.from(niyyah.meeting)
		.groupBy(niyyah.meeting.status);

	const meetingsScheduling =
		meetingsByStatus.find((s) => s.status === 'scheduling')?.count || 0;
	const meetingsScheduled =
		meetingsByStatus.find((s) => s.status === 'scheduled')?.count || 0;
	const meetingsPendingFeedback =
		meetingsByStatus.find((s) => s.status === 'pending_feedback')?.count || 0;

	return {
		// Candidate action items
		pendingVerification,
		readyToMatch,
		inMatching,
		totalMatched,
		// Meeting overview
		meetingsScheduling,
		meetingsScheduled,
		meetingsPendingFeedback
	};
});
