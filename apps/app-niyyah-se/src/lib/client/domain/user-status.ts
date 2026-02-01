import { Clock, ClockAlert } from 'lucide-svelte';
import type { Component } from 'svelte';
import type { UserStatus } from '$lib/shared/domain/user-status';

/**
 * StatusDisplay contains the presentation details for a user status.
 */
export interface StatusDisplay {
	label: string;
	description: string;
	icon: Component;
	color: string;
}

/**
 * STATUS_CONFIG maps each user status to its display configuration.
 */
export const STATUS_CONFIG: Record<UserStatus, StatusDisplay> = {
	profile_incomplete: {
		label: 'Profile Incomplete',
		description: 'Complete your profile to start matching',
		icon: ClockAlert as unknown as Component,
		color: 'text-amber-600'
	},
	waiting_for_match: {
		label: 'Searching for Matches',
		description: 'We are actively looking for compatible matches for you',
		icon: Clock as unknown as Component,
		color: 'text-app-primary'
	}
};
