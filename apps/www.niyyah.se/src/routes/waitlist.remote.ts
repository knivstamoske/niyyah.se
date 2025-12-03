import { z } from 'zod';
import { form } from '$app/server';
import { db } from '$lib/server/db';
import { waitlistEmails } from '$lib/server/db/schema';

export const joinWaitlist = form(
	z.object({
		email: z.email().min(1, 'Email is required')
	}),
	async ({ email }) => {
		try {
			await db.insert(waitlistEmails).values({
				email: email.toLowerCase().trim(),
				verified: false
			});
		} catch (error: any) {
			// Handle duplicate signups gracefully
			if (error?.code !== '23505') {
				console.error('Failed to add email to waitlist:', error);
				throw new Error('Failed to join waitlist. Please try again.');
			}
		}
		return { success: true, message: 'Successfully joined the waitlist!' };
	}
);
