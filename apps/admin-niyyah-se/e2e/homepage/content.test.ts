import { expect, test } from '@playwright/test';

test.describe('Homepage Content', () => {
	test('renders correctly with all key elements', async ({ page }) => {
		await page.goto('/');

		// Verify page title
		await expect(page).toHaveTitle(/Niyyah/);

		// Verify h1 is visible
		await expect(page.locator('h1')).toBeVisible();

		// Verify hero image is present
		const heroImage = page.locator('img[alt*="Muslim couple"]');
		await expect(heroImage).toBeVisible();

		// Verify waitlist form is visible
		const form = page.locator('form');
		await expect(form).toBeVisible();

		// Verify email input field exists
		const emailInput = page.locator('input[type="email"]');
		await expect(emailInput).toBeVisible();

		// Verify submit button is present
		const submitButton = page.locator('button[type="submit"]');
		await expect(submitButton).toBeVisible();
	});
});
