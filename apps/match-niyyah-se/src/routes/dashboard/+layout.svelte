<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/client/auth';
	import { LanguagePicker } from '$lib/client/ui';
	import { m } from '$lib/i18n/messages.js';
	import { LayoutDashboard, Users, CheckCircle, Scale, LogOut } from 'lucide-svelte';

	let { children } = $props();

	/**
	 * NAV_ITEMS are the navigation menu items for the facilitator dashboard.
	 */
	const NAV_ITEMS = [
		{ path: '/dashboard', label: () => m.match_nav_dashboard(), icon: LayoutDashboard },
		{ path: '/dashboard/candidates', label: () => m.match_nav_candidates(), icon: Users },
		{ path: '/dashboard/compliance', label: () => m.match_nav_compliance(), icon: Scale }
	];

	/**
	 * handleLogout logs the user out and redirects to the home page.
	 */
	async function handleLogout() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => goto('/')
			}
		});
	}
</script>

<svelte:head>
	<title>{m.match_portal_title()}</title>
</svelte:head>

<div
	class="min-h-screen bg-app-background text-app-text font-sans selection:bg-app-primary selection:text-white"
>
	<!-- Header -->
	<header class="border-b border-app-primary/10 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
			<div class="flex items-center gap-8">
				<a href="/dashboard" class="flex items-center hover:opacity-80 transition-opacity">
					<img src="/logo/logo-wide.png" alt="Niyyah.se" class="h-8 object-contain" />
				</a>

				<!-- Navigation -->
				<nav class="hidden md:flex items-center gap-1">
					{#each NAV_ITEMS as item}
						{@const isActive = page.url.pathname === item.path}
						<a
							href={item.path}
							class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors {isActive
								? 'bg-cream text-midnyt'
								: 'text-slate hover:text-midnyt hover:bg-cream/50'}"
						>
							<svelte:component this={item.icon} class="w-4 h-4" />
							{item.label()}
						</a>
					{/each}
				</nav>
			</div>

			<div class="flex items-center gap-4">
				<div>
					<LanguagePicker />
				</div>
				<button
					onclick={handleLogout}
					class="flex items-center gap-2 p-2 text-app-subtle-text hover:text-app-primary hover:bg-app-primary/5 transition-all rounded-sm group"
					title={m.match_logout()}
				>
					<LogOut class="w-5 h-5 group-hover:scale-110 transition-transform" />
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		<nav class="md:hidden border-t border-app-primary/10 px-4 py-2 flex gap-1 overflow-x-auto">
			{#each NAV_ITEMS as item}
				{@const isActive = page.url.pathname === item.path}
				<a
					href={item.path}
					class="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap {isActive
						? 'bg-cream text-midnyt'
						: 'text-slate hover:text-midnyt hover:bg-cream/50'}"
				>
					<svelte:component this={item.icon} class="w-4 h-4" />
					{item.label()}
				</a>
			{/each}
		</nav>
	</header>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-6 py-12">
		{@render children()}
	</main>
</div>
