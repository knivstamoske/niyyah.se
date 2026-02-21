import { createAuthClient } from 'better-auth/svelte';
import { magicLinkClient } from 'better-auth/client/plugins';

/**
 * authClient is the client-side better-auth instance for managing authentication state.
 */
export const authClient = createAuthClient({
	plugins: [magicLinkClient()]
});
