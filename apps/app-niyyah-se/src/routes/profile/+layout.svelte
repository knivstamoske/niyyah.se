<script lang="ts">
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/client/auth';
	import { goto } from '$app/navigation';
	import { LanguagePicker } from '$lib/client/ui';
	import { LogOut } from 'lucide-svelte';
	import { m } from '$lib/i18n/messages.js';

	let { children } = $props();

	async function handleLogout() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => goto(resolve('/'))
			}
		});
	}
</script>

<svelte:head>
	<title>{m.profile_layout_title()}</title>
</svelte:head>

<div
	class="min-h-screen bg-app-background text-app-text font-sans selection:bg-app-primary selection:text-white"
>
	<!-- Header -->
	<header class="border-b border-app-primary/10 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
		<div class="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
			<div class="flex items-center gap-2">
				<a
					href={resolve('/')}
					class="flex items-center hover:opacity-80 transition-opacity"
				>
					<img
						src="/logo/logo-wide.png"
						alt="Niyyah.se"
						class="h-8 object-contain"
					/>
				</a>
			</div>

			<div class="flex items-center gap-6">
				<div class="hidden md:block">
					<LanguagePicker />
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="max-w-5xl mx-auto px-6 py-12">
		{@render children()}
	</main>

	<!-- Footer with Logout -->
	<footer class="max-w-5xl mx-auto px-6 pb-12">
		<section class="pt-8 border-t border-app-primary/10">
			<button
				onclick={handleLogout}
				class="flex items-center gap-3 px-6 py-3 text-app-subtle-text hover:text-app-primary hover:bg-app-primary/5 transition-all rounded-sm group"
			>
				<LogOut class="w-5 h-5 group-hover:scale-110 transition-transform" />
				<span class="font-medium">{m.sign_out()}</span>
			</button>
		</section>
	</footer>
</div>
