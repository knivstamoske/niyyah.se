<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/client/auth';

	let { children } = $props();

	/**
	 * NAV_ITEMS are the navigation menu items for the admin dashboard.
	 */
	const NAV_ITEMS = [
		{ href: '/dashboard', label: 'Dashboard', icon: '📊' },
		{ href: '/dashboard/candidates', label: 'Candidates', icon: '👥' },
		{ href: '/dashboard/verification', label: 'Verification Queue', icon: '✓' },
		{ href: '/dashboard/compliance', label: 'Compliance', icon: '⚖️' }
	];

	/**
	 * isActive checks if a navigation item is currently active.
	 */
	function isActive(href: string): boolean {
		if (href === '/dashboard') {
			return page.url.pathname === '/dashboard';
		}
		return page.url.pathname.startsWith(href);
	}

	/**
	 * handleLogout logs out the current admin user.
	 */
	async function handleLogout() {
		await authClient.signOut();
		goto('/');
	}
</script>

<div class="min-h-screen bg-white flex">
	<!-- Sidebar -->
	<aside class="w-64 bg-cream border-r border-taupe/20 flex flex-col">
		<!-- Logo -->
		<div class="p-6 border-b border-taupe/20">
			<h1 class="text-xl font-bold text-midnyt">Niyyah Admin</h1>
			<p class="text-xs text-slate mt-1">Administrator Portal</p>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 p-4">
			<ul class="space-y-1">
				{#each NAV_ITEMS as item}
					<li>
						<a
							href={item.href}
							class="flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors text-sm font-medium {isActive(item.href) ? 'bg-bronze/20 text-bronze' : 'text-midnyt hover:bg-taupe/10'}"
						>
							<span class="text-lg">{item.icon}</span>
							<span>{item.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- User Info & Logout -->
		<div class="p-4 border-t border-taupe/20">
			<button
				onclick={handleLogout}
				class="w-full px-4 py-2 bg-midnyt text-cream rounded-md hover:bg-midnyt/90 transition-colors text-sm font-medium"
			>
				Logout
			</button>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="flex-1 overflow-y-auto">
		{@render children()}
	</main>
</div>
