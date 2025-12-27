import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { paraglideMiddleware } from '$lib/i18n/server';
import type { Handle } from '@sveltejs/kit';

/**
 * handleAuth integrates better-auth with SvelteKit request handling.
 * This handler manages authentication routes and populates session data in event.locals.
 */
const handleAuth: Handle = async ({ event, resolve }) => {
	// Fetch current session from Better Auth
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	// Make session and user available on server via event.locals
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

/**
 * handleParaglide integrates internationalization (i18n) middleware.
 */
const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

/**
 * Server hooks sequence with auth and i18n handlers.
 */
export const handle: Handle = async ({ event, resolve }) => {
	// Run auth handler first
	return handleAuth({
		event,
		resolve: (event) => handleParaglide({ event, resolve })
	});
};
