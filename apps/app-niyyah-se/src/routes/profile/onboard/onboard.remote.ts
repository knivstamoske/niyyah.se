import { z } from 'zod';
import { command, getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { auth } from '$lib/server/auth';
import { candidate } from '@niyyah/db';

/**
 * Validation schema for profile creation
 */
const profileSchema = z.object({
	birthYear: z
		.number()
		.int()
		.min(1940, 'Birth year must be 1940 or later')
		.max(new Date().getFullYear() - 18, 'You must be at least 18 years old'),
	kommun: z.string().min(1, 'Kommun is required').trim(),
	gender: z.enum(['male', 'female'], {
		message: 'Please select a valid gender'
	}),
	maritalStatus: z.enum(['single', 'divorced', 'widowed'], {
		message: 'Please select a valid marital status'
	})
});

/**
 * Remote function to create a candidate profile
 * Requires authentication
 */
export const onboard = command(profileSchema, async (data) => {
	const event = getRequestEvent();
	// Get the current session to ensure user is authenticated
	const session = await auth.api.getSession({
		headers: event?.request.headers
	});

	if (!session?.user?.id) {
		throw new Error('You must be logged in to create a profile');
	}

	try {
		// Insert or update the profile in the database
		await db
			.insert(candidate.profile)
			.values({
				userId: session.user.id,
				birthYear: data.birthYear,
				kommun: data.kommun,
				gender: data.gender,
				maritalStatus: data.maritalStatus
			})
			.onConflictDoUpdate({
				target: candidate.profile.userId,
				set: {
					birthYear: data.birthYear,
					kommun: data.kommun,
					gender: data.gender,
					maritalStatus: data.maritalStatus,
					updatedAt: new Date()
				}
			});

		return {
			success: true,
			message: 'Profile saved successfully!'
		};
	} catch (error: unknown) {
		console.error('Failed to save profile:', error);
		throw new Error('Failed to save profile. Please try again.');
	}
});
