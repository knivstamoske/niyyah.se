import { expect, test } from '@playwright/test';

test.describe('Homepage Content', () => {
	test('renders correctly with all key elements', async ({ page }) => {
		await page.goto('/');

		// Verify page title
		await expect(page).toHaveTitle(/Niyyah/);

		// Verify hero image is present
		const heroImage = page.locator('img[alt*="Muslim couple"]');
		await expect(heroImage).toBeVisible();

		// Verify join link is present
		const joinLink = page.getByRole('link', {
			name: /Create your profile/i
		});
		await expect(joinLink).toBeVisible();
		await expect(joinLink).toHaveAttribute('href', 'http://localhost:8020');
	});
});
