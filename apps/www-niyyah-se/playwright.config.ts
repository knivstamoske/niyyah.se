import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

export default defineConfig({
	webServer: {
		command: 'pnpm run build && pnpm vite preview --port 8050 --strictPort',
		port: 8050,
		reuseExistingServer: !process.env.CI,
		env: {
			DATABASE_URL: process.env.DATABASE_URL || ''
		}
	},
	testDir: 'e2e',
	use: {
		baseURL: 'http://localhost:8050'
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	]
});
