import { redirect } from '@sveltejs/kit';

export async function load() {
	// Better-auth handles the callback automatically via the API route
	// Just redirect to dashboard
	throw redirect(303, '/my-pages');
}
