import { query } from '$app/server';
import { db } from '$lib/server/db';
import { facilitator } from '@niyyah/db/schema';
import { desc } from 'drizzle-orm';

export const getFacilitators = query(async () => {
	const items = await db
		.select()
		.from(facilitator.user)
		.orderBy(desc(facilitator.user.createdAt));
	return items;
});
