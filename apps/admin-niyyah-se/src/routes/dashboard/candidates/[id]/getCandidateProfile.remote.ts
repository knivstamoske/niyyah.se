import { query } from '$app/server';
import { db } from '$lib/server/db';
import { candidate, niyyah } from '@niyyah/db';
import { z } from 'zod';
import { desc, eq, sql } from 'drizzle-orm';

/**
 * getCandidateProfile is a query that fetches detailed profile information for a specific candidate.
 */
export const getCandidateProfile = query(
	z.string().uuid(),
	async (profileId) => {
		// Fetch candidate profile with user info
		const [profile] = await db
			.select({
				id: candidate.profile.id,
				userId: candidate.profile.userId,
				name: candidate.profile.name,
				birthYear: candidate.profile.birthYear,
				kommun: candidate.profile.kommun,
				gender: candidate.profile.gender,
				maritalStatus: candidate.profile.maritalStatus,
				languages: candidate.profile.languages,
				phone: candidate.profile.phone,
				nationality: candidate.profile.nationality,
				bio: candidate.profile.bio,
				seeking: candidate.profile.seeking,
				status: candidate.profile.status,
				createdAt: candidate.profile.createdAt,
				updatedAt: candidate.profile.updatedAt,
				email: candidate.user.email,
				emailVerified: candidate.user.emailVerified,
				userCreatedAt: candidate.user.createdAt
			})
			.from(candidate.profile)
			.innerJoin(candidate.user, eq(candidate.profile.userId, candidate.user.id))
			.where(eq(candidate.profile.id, profileId));

		if (!profile) {
			throw new Error('Candidate not found');
		}

		// Fetch guardian info if female candidate
		let guardian = null;
		if (profile.gender === 'female') {
			const [guardianData] = await db
				.select()
				.from(niyyah.guardian)
				.where(eq(niyyah.guardian.candidateProfileId, profileId));
			guardian = guardianData || null;
		}

		// Fetch user events (activity history)
		const events = await db
			.select()
			.from(niyyah.userEvent)
			.where(eq(niyyah.userEvent.userId, profile.userId))
			.orderBy(desc(niyyah.userEvent.createdAt))
			.limit(20);

		// Fetch messages sent to this candidate
		const messages = await db
			.select()
			.from(candidate.message)
			.where(eq(candidate.message.userId, profile.userId))
			.orderBy(desc(candidate.message.createdAt))
			.limit(10);

		return {
			profile,
			guardian,
			events,
			messages
		};
	}
);
