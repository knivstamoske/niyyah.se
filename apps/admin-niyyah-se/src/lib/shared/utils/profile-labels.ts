import { m } from '$lib/i18n/messages.js';

/**
 * Get translated gender label
 */
export function getGenderLabel(gender: 'male' | 'female'): string {
	return gender === 'male' ? m.gender_male() : m.gender_female();
}

/**
 * Get translated marital status label
 */
export function getMaritalStatusLabel(status: 'single' | 'divorced' | 'widowed'): string {
	switch (status) {
		case 'single':
			return m.marital_status_single();
		case 'divorced':
			return m.marital_status_divorced();
		case 'widowed':
			return m.marital_status_widowed();
	}
}
