import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'pnpm run build && pnpm vite preview --port 8050 --strictPort',
		port: 8050
	},
	testDir: 'e2e'
});
