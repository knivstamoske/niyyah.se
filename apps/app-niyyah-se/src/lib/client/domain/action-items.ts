/**
 * ActionItemKey represents the possible action items a user can have.
 */
export type ActionItemKey = 'complete_profile';

/**
 * ActionItemPresentation contains the display information for an action item.
 */
export interface ActionItemPresentation {
	title: string;
	description: string;
	href: string;
}

/**
 * ACTION_ITEM_MAP maps action item keys to their presentation details.
 */
export const ACTION_ITEM_MAP = {
	complete_profile: {
		title: 'Complete Your Profile',
		description: 'Fill in your basic information to start matching',
		href: '/profile/onboard'
	}
} satisfies Record<ActionItemKey, ActionItemPresentation>;
