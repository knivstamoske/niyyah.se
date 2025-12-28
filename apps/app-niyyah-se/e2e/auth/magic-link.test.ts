import { expect, test } from '@playwright/test';
import { generateTestEmail, MailpitClient } from '../test-helpers';

test.describe('Magic Link Authentication', () => {
	let mailpitClient: MailpitClient;
	let testEmail: string;

	test.beforeEach(async () => {
		mailpitClient = new MailpitClient();
		testEmail = generateTestEmail();
		// Clear all emails before each test
		await mailpitClient.clearAllEmails();
	});

	test.afterEach(async () => {
		// Clean up emails after test
		await mailpitClient.clearAllEmails();
	});

	test('should send magic link when user requests login', async ({ page }) => {
		await page.goto('/auth/login');

		// Fill in email
		const emailInput = page.locator('input[type="email"]');
		await emailInput.fill(testEmail);

		// Submit form
		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();

		// Wait for success message
		const successMessage = page.locator('text=/Check Your Email/i');
		await expect(successMessage).toBeVisible({ timeout: 10000 });

		// Verify email was sent to Mailpit
		// Wait a bit for email to arrive
		await page.waitForTimeout(2000);

		const latestEmail = await mailpitClient.getLatestEmailByRecipient(testEmail);
		expect(latestEmail).not.toBeNull();
		expect(latestEmail.Subject).toContain('Sign in to Niyyah');
	});

	test('should authenticate user when clicking magic link', async ({ page }) => {
		await page.goto('/auth/login');

		// Request magic link
		const emailInput = page.locator('input[type="email"]');
		await emailInput.fill(testEmail);

		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();

		// Wait for success message
		await expect(page.locator('text=/Check Your Email/i')).toBeVisible({ timeout: 10000 });

		// Wait for email to arrive in Mailpit
		await page.waitForTimeout(2000);

		// Get the magic link from the email
		const latestEmail = await mailpitClient.getLatestEmailByRecipient(testEmail);
		expect(latestEmail).not.toBeNull();

		const magicLink = await mailpitClient.extractMagicLinkFromEmail(latestEmail.ID);
		expect(magicLink).not.toBeNull();

		// Click the magic link
		await page.goto(magicLink!);

		// Should be redirected to dashboard
		await expect(page).toHaveURL('/dashboard', { timeout: 10000 });

		// Verify we're authenticated by checking if we can access dashboard
		const dashboardContent = page.locator('text=/Dashboard/i');
		await expect(dashboardContent).toBeVisible({ timeout: 5000 });
	});

	test('should handle invalid magic link token', async ({ page }) => {
		// Navigate to callback with invalid token
		await page.goto('/auth/callback?token=invalid-token-12345');

		// Should show error message
		const errorMessage = page.locator('text=/Verification Failed/i');
		await expect(errorMessage).toBeVisible({ timeout: 10000 });

		// Should not redirect to dashboard
		await expect(page).not.toHaveURL('/dashboard');
	});

	test('should register new user and send magic link', async ({ page }) => {
		await page.goto('/auth/register');

		// Fill in registration form
		const nameInput = page.locator('input[id="name"]');
		await nameInput.fill('Test User');

		const emailInput = page.locator('input[id="email"]');
		await emailInput.fill(testEmail);

		// Submit form
		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();

		// Wait for success message
		const successMessage = page.locator('text=/Check Your Email/i');
		await expect(successMessage).toBeVisible({ timeout: 10000 });

		// Verify email was sent
		await page.waitForTimeout(2000);

		const latestEmail = await mailpitClient.getLatestEmailByRecipient(testEmail);
		expect(latestEmail).not.toBeNull();
		expect(latestEmail.Subject).toContain('Sign in to Niyyah');

		// Get and click the magic link
		const magicLink = await mailpitClient.extractMagicLinkFromEmail(latestEmail.ID);
		expect(magicLink).not.toBeNull();

		await page.goto(magicLink!);

		// Should be authenticated and redirected to dashboard
		await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
	});

	test('should normalize email addresses', async ({ page }) => {
		// Use uppercase and spaces in email
		const unnormalizedEmail = `  ${testEmail.toUpperCase()}  `;

		await page.goto('/auth/login');

		// Request magic link with unnormalized email
		const emailInput = page.locator('input[type="email"]');
		await emailInput.fill(unnormalizedEmail);

		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();

		// Wait for success message
		await expect(page.locator('text=/Check Your Email/i')).toBeVisible({ timeout: 10000 });

		// Email should be sent to normalized address
		await page.waitForTimeout(2000);

		const latestEmail = await mailpitClient.getLatestEmailByRecipient(testEmail);
		expect(latestEmail).not.toBeNull();
	});
});
