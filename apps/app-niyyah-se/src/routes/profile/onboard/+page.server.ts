import type { PageServerLoad } from './$types';

/**
 * Server-side load function for the onboarding page.
 * Passes profile data from parent layout to populate form.
 */
export const load: PageServerLoad = async ({ parent }) => {
	const { profile } = await parent();

	return {
		profile
	};
};
