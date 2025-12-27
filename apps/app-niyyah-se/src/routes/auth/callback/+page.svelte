<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let error = '';
	let verifying = true;

	onMount(() => {
		// Check if verification was successful
		if (data && !data.error) {
			// Redirect to dashboard after successful verification
			setTimeout(() => {
				goto('/dashboard');
			}, 1000);
		} else {
			verifying = false;
			error = 'Invalid or expired magic link. Please request a new one.';
		}
	});
</script>

<svelte:head>
	<title>Verifying - Niyyah</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-app-background text-app-text">
	<main class="flex-1 flex flex-col items-center justify-center px-4 py-8">
		<div class="w-full max-w-md">
			<div class="bg-white rounded-lg shadow-sm border border-app-border p-8">
				{#if verifying}
					<!-- Verifying State -->
					<div class="text-center">
						<div class="mb-4">
							<svg
								class="w-16 h-16 mx-auto text-app-primary animate-spin"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								></path>
							</svg>
						</div>
						<h2 class="text-xl font-bold mb-2">Verifying...</h2>
						<p class="text-app-subtle-text">Please wait while we sign you in</p>
					</div>
				{:else if error}
					<!-- Error State -->
					<div class="text-center">
						<div class="mb-4">
							<svg
								class="w-16 h-16 mx-auto text-red-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
						</div>
						<h2 class="text-xl font-bold mb-2 text-red-600">Verification Failed</h2>
						<p class="text-app-subtle-text mb-6">{error}</p>
						<a href="/auth/login" class="btn bg-app-primary text-app-background border-0 w-full">
							Request New Link
						</a>
					</div>
				{/if}
			</div>

			<!-- Back to Home -->
			<div class="mt-6 text-center">
				<a href="/" class="text-app-subtle-text text-sm hover:text-app-text"> ← Back to Home </a>
			</div>
		</div>
	</main>
</div>
