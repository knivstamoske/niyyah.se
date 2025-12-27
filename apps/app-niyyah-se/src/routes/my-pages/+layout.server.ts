import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

/**
 * Server-side auth guard for all protected routes.
 * Redirects unauthenticated users to login page.
 */
export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.user) {
		// Redirect to login with return URL
		throw redirect(303, `/auth/login?redirect=${encodeURIComponent(url.pathname)}`);
	}

	return {
		user: locals.user,
		session: locals.session
	};
};
