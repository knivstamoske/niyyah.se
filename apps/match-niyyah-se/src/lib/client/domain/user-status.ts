import { Clock, ClockAlert } from 'lucide-svelte';
import type { Component } from 'svelte';
import type { UserStatus } from '$lib/shared/domain/user-status';
import { m } from '$lib/i18n/messages.js';

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
		label: m.status_profile_incomplete_label(),
		description: m.status_profile_incomplete_description(),
		icon: ClockAlert as unknown as Component,
		color: 'text-amber-600'
	},
	waiting_for_match: {
		label: m.status_waiting_for_match_label(),
		description: m.status_waiting_for_match_description(),
		icon: Clock as unknown as Component,
		color: 'text-app-primary'
	}
};
