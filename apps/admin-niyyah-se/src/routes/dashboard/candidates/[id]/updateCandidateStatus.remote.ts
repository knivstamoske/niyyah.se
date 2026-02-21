import { command } from '$app/server';
import { db } from '$lib/server/db';
import { candidate, niyyah } from '@niyyah/db';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

/**
 * UpdateCandidateStatusSchema validates the input for updating candidate status.
 */
const UpdateCandidateStatusSchema = z.object({
	profileId: z.string().uuid(),
	newStatus: z.enum([
		'onboarding',
		'verifying',
		'active',
		'paused',
		'matching',
		'matched',
		'archived',
		'banned'
	]),
	reason: z.string().optional()
});

/**
 * updateCandidateStatus is a command that changes a candidate's status and logs the event.
 */
export const updateCandidateStatus = command(
	UpdateCandidateStatusSchema,
	async ({ profileId, newStatus, reason }) => {
		// Get current profile to access userId
		const [profile] = await db
			.select({ userId: candidate.profile.userId, currentStatus: candidate.profile.status })
			.from(candidate.profile)
			.where(eq(candidate.profile.id, profileId));

		if (!profile) {
			throw new Error('Candidate not found');
		}

		// Update profile status
		await db
			.update(candidate.profile)
			.set({
				status: newStatus as any,
				updatedAt: new Date()
			})
			.where(eq(candidate.profile.id, profileId));

		// Log the status change event
		const eventType =
			newStatus === 'banned'
				? 'ban'
				: newStatus === 'archived'
					? 'archive'
					: newStatus === 'paused'
						? 'pause'
						: newStatus === 'matching'
							? 'propose_match'
							: newStatus === 'active' && profile.currentStatus === 'paused'
								? 'resume'
								: newStatus === 'active' && profile.currentStatus === 'verifying'
									? 'verify'
									: null;

		if (eventType) {
			await db.insert(niyyah.userEvent).values({
				userId: profile.userId,
				type: eventType as any,
				payload: reason ? { reason } : null
			});
		}

		return { success: true };
	}
);
