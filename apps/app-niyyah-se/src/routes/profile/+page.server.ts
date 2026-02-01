import type { PageServerLoad } from './$types';
import type { UserStatus } from '$lib/shared/domain/user-status';

/**
 * Server-side load function for the profile page.
 * Calculates the user's current status based on their profile data.
 */
export const load: PageServerLoad = async ({ parent }) => {
	const { profile } = await parent();

	// Determine user status based on whether they have a profile
	const userStatus: UserStatus = profile ? 'waiting_for_match' : 'profile_incomplete';

	return {
		userStatus
	};
};
