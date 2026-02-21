import { z } from 'zod';
import { query } from '$app/server';
import { db } from '$lib/server/db';
import { administrator } from '@niyyah/db/schema';
import { eq } from 'drizzle-orm';

/**
 * getFacilitatorProfile is a query that fetches a single facilitator's account details by user ID.
 */
export const getFacilitatorProfile = query(z.string().min(1), async (id) => {
	const [facilitator] = await db
		.select()
		.from(administrator.user)
		.where(eq(administrator.user.id, id));

	if (!facilitator) {
		throw new Error('Facilitator not found');
	}

	return facilitator;
});
