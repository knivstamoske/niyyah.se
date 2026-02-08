import { query } from '$app/server';
import { db } from '$lib/server/db';
import { candidate, niyyah } from '@niyyah/db';
import { desc, sql } from 'drizzle-orm';

/**
 * getRecentActivity is a query that fetches recent user events and activities for the admin dashboard.
 */
export const getRecentActivity = query(async () => {
	// Get recent user events from the audit log
	const recentEvents = await db
		.select({
			id: niyyah.userEvent.id,
			userId: niyyah.userEvent.userId,
			type: niyyah.userEvent.type,
			payload: niyyah.userEvent.payload,
			createdAt: niyyah.userEvent.createdAt
		})
		.from(niyyah.userEvent)
		.orderBy(desc(niyyah.userEvent.createdAt))
		.limit(20);

	// Get user details for events (join with candidate users)
	const eventsWithUserDetails = await Promise.all(
		recentEvents.map(async (event) => {
			const [user] = await db
				.select({
					name: candidate.user.name,
					email: candidate.user.email
				})
				.from(candidate.user)
				.where(sql`${candidate.user.id} = ${event.userId}`)
				.limit(1);

			return {
				...event,
				userName: user?.name || 'Unknown User',
				userEmail: user?.email || ''
			};
		})
	);

	return eventsWithUserDetails;
});
