import { command } from '$app/server';
import { db } from '$lib/server/db';
import { candidate, niyyah } from '@niyyah/db';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

/**
 * DeleteCandidateDataSchema validates the input for deleting candidate data.
 */
const DeleteCandidateDataSchema = z.object({
	profileId: z.string().uuid(),
	reason: z.string().min(1, 'Reason is required for data deletion')
});

/**
 * deleteCandidateData is a command that permanently deletes a candidate's data for GDPR compliance.
 */
export const deleteCandidateData = command(
	DeleteCandidateDataSchema,
	async ({ profileId, reason }) => {
		// Get profile to access userId
		const [profile] = await db
			.select({ userId: candidate.profile.userId })
			.from(candidate.profile)
			.where(eq(candidate.profile.id, profileId));

		if (!profile) {
			throw new Error('Candidate not found');
		}

		// Log the deletion event before deleting
		await db.insert(niyyah.userEvent).values({
			userId: profile.userId,
			type: 'archive',
			payload: { reason, deletedAt: new Date().toISOString() }
		});

		// Delete guardian data if exists
		await db
			.delete(niyyah.guardian)
			.where(eq(niyyah.guardian.candidateProfileId, profileId));

		// Delete messages
		await db
			.delete(candidate.message)
			.where(eq(candidate.message.userId, profile.userId));

		// Delete profile (this will cascade to user via foreign key)
		await db
			.delete(candidate.profile)
			.where(eq(candidate.profile.id, profileId));

		return { success: true };
	}
);
