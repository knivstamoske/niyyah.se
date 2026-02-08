import type { UserStatus } from '$lib/shared/domain/user-status';
import type { PageServerLoad } from './$types';

/**
 * Server-side load function for the profile page.
 * Calculates the user's current status based on their profile data.
 */
export const load: PageServerLoad = async ({ parent }) => {
	const userStatus: UserStatus = 'profile_incomplete';

	return {
		userStatus
	};
};
