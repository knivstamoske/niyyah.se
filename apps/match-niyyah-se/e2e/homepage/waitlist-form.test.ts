import { expect, test } from '@playwright/test';
import { TestDatabase, generateTestEmail } from '../test-helpers';

test.describe('Waitlist Form', () => {
	let testDb: TestDatabase;
	let testEmail: string;

	test.beforeEach(() => {
		testDb = new TestDatabase();
		testEmail = generateTestEmail();
	});

	test.afterEach(async () => {
		// Clean up test data
		if (testEmail) {
			await testDb.deleteWaitlistEntry(testEmail);
		}
		await testDb.close();
	});

	test('successfully submits and adds entry to database', async ({ page }) => {
		await page.goto('/');

		// Fill in the email field
		const emailInput = page.locator('input[type="email"]');
		await emailInput.fill(testEmail);

		// Submit the form
		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();

		// Wait for success message
		const successMessage = page.locator('text=/Successfully joined the waitlist/i');
		await expect(successMessage).toBeVisible({ timeout: 10000 });

		// Verify the message has green color (success)
		await expect(successMessage).toHaveClass(/text-green-600/);

		// Verify entry was added to database
		const entry = await testDb.getWaitlistEntry(testEmail);
		expect(entry).not.toBeNull();
		expect(entry?.email).toBe(testEmail.toLowerCase().trim());
		expect(entry?.createdAt).toBeDefined();
	});

	test('handles duplicate email submissions gracefully', async ({ page }) => {
		await page.goto('/');

		// First submission
		const emailInput = page.locator('input[type="email"]');
		await emailInput.fill(testEmail);

		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();

		// Wait for first success message
		const successMessage = page.locator('text=/Successfully joined the waitlist/i');
		await expect(successMessage).toBeVisible({ timeout: 10000 });

		// Clear the form and submit again with the same email
		await emailInput.clear();
		await emailInput.fill(testEmail);
		await submitButton.click();

		// Wait for second success message (should still show success)
		await expect(successMessage).toBeVisible({ timeout: 10000 });

		// Verify only one entry exists in database
		const count = await testDb.countWaitlistEntries(testEmail);
		expect(count).toBe(1);
	});

	test('normalizes email to lowercase and trimmed', async ({ page }) => {
		// Use an email with uppercase and spaces
		const unnormalizedEmail = `  ${testEmail.toUpperCase()}  `;

		await page.goto('/');

		// Fill in the email field with unnormalized email
		const emailInput = page.locator('input[type="email"]');
		await emailInput.fill(unnormalizedEmail);

		// Submit the form
		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();

		// Wait for success message
		const successMessage = page.locator('text=/Successfully joined the waitlist/i');
		await expect(successMessage).toBeVisible({ timeout: 10000 });

		// Verify entry was added with normalized email
		const entry = await testDb.getWaitlistEntry(testEmail);
		expect(entry).not.toBeNull();
		expect(entry?.email).toBe(testEmail.toLowerCase().trim());
	});

	test('shows validation error for invalid email', async ({ page }) => {
		await page.goto('/');

		// Fill in an invalid email
		const emailInput = page.locator('input[type="email"]');
		await emailInput.fill('invalid-email');

		// Submit the form
		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();

		// Check if the browser's built-in validation message appears
		// The input should have the invalid state
		const validationMessage = await emailInput.evaluate(
			(el: HTMLInputElement) => el.validationMessage
		);
		expect(validationMessage).toBeTruthy();
		expect(validationMessage.length).toBeGreaterThan(0);

		// Verify no entry was added to database
		const entry = await testDb.getWaitlistEntry('invalid-email');
		expect(entry).toBeNull();
	});
});
