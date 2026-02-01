import { query } from '$app/server';
import type { ActionItemKey } from '$lib/client/domain/action-items';

/**
 * getActions returns a list of action item keys for the current user.
 */
export const getActions = query(async (): Promise<ActionItemKey[]> => {
	// TODO: Implement logic to determine action items based on user status and data
	// For now, return an empty array
	return [];
});
