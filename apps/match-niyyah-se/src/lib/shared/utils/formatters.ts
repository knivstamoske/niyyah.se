/**
 * getAge calculates the age from a birth year.
 */
export function getAge(birthYear: number): number {
	const currentYear = new Date().getFullYear();
	return currentYear - birthYear;
}

/**
 * capitalize converts a string to have the first letter uppercase and the rest lowercase.
 */
export function capitalize(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
