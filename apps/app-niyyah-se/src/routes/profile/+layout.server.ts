import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { candidate } from '@niyyah/db';
import type { LayoutServerLoad } from './$types';

/**
 * Server-side auth guard for all protected routes.
 * Redirects unauthenticated users to login page.
 * Redirects authenticated users without a profile to onboarding page.
 */
export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.user) {
		// Redirect to login with return URL
		throw redirect(303, `/auth/login?redirect=${encodeURIComponent(url.pathname)}`);
	}

	// Check if user has a complete profile
	const [userProfile] = await db
		.select()
		.from(candidate.profile)
		.where(eq(candidate.profile.userId, locals.user.id))
		.limit(1);

	// If no profile exists and not already on onboard page, redirect to onboarding
	if (!userProfile && url.pathname !== '/profile/onboard') {
		throw redirect(303, '/profile/onboard');
	}

	return {
		user: locals.user,
		session: locals.session,
		profile: userProfile ?? null
	};
};
