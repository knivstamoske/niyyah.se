import { auth } from '$lib/server/auth';
import type { RequestEvent } from './$types';

export async function GET(event: RequestEvent) {
	return await auth.handler(event.request);
}

export async function POST(event: RequestEvent) {
	return await auth.handler(event.request);
}
