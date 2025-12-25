import { z } from 'zod';
import { form } from '$app/server';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';

export const joinWaitlist = form(
	z.object({
		email: z.email().min(1, 'Email is required')
	}),
	async ({ email }) => {
		try {
			await db.insert(waitlist).values({
				email: email.toLowerCase().trim()
			});
		} catch (error: unknown) {
			// Handle duplicate signups gracefully
			if ((error as { code?: string })?.code !== '23505') {
				console.error('Failed to add email to waitlist:', error);
				throw new Error('Failed to join waitlist. Please try again.');
			}
		}
		return { success: true, message: 'Successfully joined the waitlist!' };
	}
);
