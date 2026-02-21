import { query } from '$app/server';
import { db } from '$lib/server/db';
import { niyyah, candidate } from '@niyyah/db';
import { z } from 'zod';
import { and, desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

/**
 * MeetingsFilterSchema validates the status filter for the meetings list.
 */
const MeetingsFilterSchema = z
	.enum(['all', 'scheduling', 'scheduled', 'pending_feedback', 'completed', 'cancelled'])
	.optional();

/**
 * getMeetings is a query that fetches meetings with candidate names and optional status filtering.
 */
export const getMeetings = query(MeetingsFilterSchema, async (statusFilter) => {
	// Alias the profile table twice for candidate 1 and candidate 2
	const profile1 = alias(candidate.profile, 'profile1');
	const profile2 = alias(candidate.profile, 'profile2');

	const results = await db
		.select({
			id: niyyah.meeting.id,
			status: niyyah.meeting.status,
			scheduledAt: niyyah.meeting.scheduledAt,
			location: niyyah.meeting.location,
			candidate1Id: niyyah.meeting.candidate1Id,
			candidate1Name: profile1.name,
			candidate1Feedback: niyyah.meeting.candidate1Feedback,
			candidate2Id: niyyah.meeting.candidate2Id,
			candidate2Name: profile2.name,
			candidate2Feedback: niyyah.meeting.candidate2Feedback,
			createdAt: niyyah.meeting.createdAt
		})
		.from(niyyah.meeting)
		.innerJoin(profile1, eq(niyyah.meeting.candidate1Id, profile1.id))
		.innerJoin(profile2, eq(niyyah.meeting.candidate2Id, profile2.id))
		.where(
			statusFilter && statusFilter !== 'all'
				? eq(niyyah.meeting.status, statusFilter as any)
				: undefined
		)
		.orderBy(desc(niyyah.meeting.createdAt))
		.limit(100);

	return results;
});
