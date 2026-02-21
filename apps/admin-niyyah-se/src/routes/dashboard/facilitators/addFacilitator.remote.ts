import { z } from 'zod';
import { form } from '$app/server';
import { db } from '$lib/server/db';
import { facilitator } from '@niyyah/db/schema';

/**
 * addFacilitator inserts a new facilitator user directly into the DB.
 * We bypass better-auth's createUser API because the admin plugin injects a
 * `role` field that does not exist in the facilitator schema.
 */
export const addFacilitator = form(
	z.object({
		email: z.string().email('Invalid email address'),
		name: z.string().min(2, 'Name must be at least 2 characters')
	}),
	async ({ email, name }) => {
		try {
			await db.insert(facilitator.user).values({
				id: crypto.randomUUID(),
				email: email.toLowerCase().trim(),
				name: name.trim(),
				emailVerified: false,
				createdAt: new Date(),
				updatedAt: new Date()
			});

			return { success: true, message: 'Facilitator added successfully' };
		} catch (e: any) {
			console.error('Failed to create facilitator:', e);
			return { success: false, message: e.message || 'Failed to add facilitator' };
		}
	}
);
