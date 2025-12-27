import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load(event: RequestEvent) {
	// Better-auth handles the callback automatically via the API route
	// Just redirect to dashboard
	throw redirect(303, '/dashboard');
}
