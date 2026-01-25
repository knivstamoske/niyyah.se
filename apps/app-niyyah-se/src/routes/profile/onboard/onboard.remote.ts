import { z } from 'zod';
import { form } from '$app/server';
import { db } from '$lib/server/db';
import { auth } from '$lib/server/auth';
import { candidate } from '@niyyah/db';

/**
 * Validation schema for profile creation
 */
const profileSchema = z.object({
	birthYear: z
		.string()
		.transform((val) => parseInt(val, 10))
		.pipe(
			z
				.number()
				.int()
				.min(1940, 'Birth year must be 1940 or later')
				.max(new Date().getFullYear() - 18, 'You must be at least 18 years old')
		),
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
export const onboard = form(profileSchema, async (data) => {
	// Get the current session to ensure user is authenticated
	const session = await auth.api.getSession();

	if (!session?.user?.id) {
		throw new Error('You must be logged in to create a profile');
	}

	try {
		// Insert the profile into the database
		await db.insert(candidate.profile).values({
			userId: session.user.id,
			birthYear: data.birthYear,
			kommun: data.kommun,
			gender: data.gender,
			maritalStatus: data.maritalStatus,
		});

		return {
			success: true,
			message: 'Profile created successfully!'
		};
	} catch (error: unknown) {
		// Handle duplicate profile (unique constraint on user_id)
		if ((error as { code?: string })?.code === '23505') {
			throw new Error('You have already created a profile');
		}

		console.error('Failed to create profile:', error);
		throw new Error('Failed to create profile. Please try again.');
	}
});
