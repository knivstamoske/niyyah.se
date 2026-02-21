import { command } from '$app/server';
import { db } from '$lib/server/db';
import { niyyah } from '@niyyah/db';
import { z } from 'zod';
import { getRequestEvent } from '$app/server';

/**
 * CreateMeetingSchema validates the input for creating a new meeting.
 */
const CreateMeetingSchema = z.object({
	candidate1Id: z.string().uuid(),
	candidate2Id: z.string().uuid(),
	scheduledAt: z.string().datetime().optional(),
	location: z.string().max(300).optional()
});

/**
 * createMeeting is a command that creates a new meeting in 'scheduling' state.
 * The current facilitator's user ID is pulled from the session.
 */
export const createMeeting = command(CreateMeetingSchema, async (input) => {
	const event = getRequestEvent();
	const facilitatorId = event?.locals?.user?.id;

	if (!facilitatorId) {
		throw new Error('Unauthorized: no facilitator session');
	}

	if (input.candidate1Id === input.candidate2Id) {
		throw new Error('Candidate 1 and Candidate 2 must be different');
	}

	await db.insert(niyyah.meeting).values({
		candidate1Id: input.candidate1Id,
		candidate2Id: input.candidate2Id,
		facilitatorId,
		status: 'scheduling',
		scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : null,
		location: input.location || null
	});

	return { success: true };
});
