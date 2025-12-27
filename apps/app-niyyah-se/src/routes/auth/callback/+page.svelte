<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { Loader2, AlertCircle } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData & { error?: string } } = $props();

	let error = $state('');
	let verifying = $state(true);

	onMount(() => {
		// Check if verification was successful
		if (data && !data.error) {
			// Redirect to my-pages after successful verification
			setTimeout(() => {
				goto(resolve('/my-pages'));
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
							<Loader2 class="w-16 h-16 mx-auto text-app-primary animate-spin" />
						</div>
						<h2 class="text-xl font-bold mb-2">Verifying...</h2>
						<p class="text-app-subtle-text">Please wait while we sign you in</p>
					</div>
				{:else if error}
					<!-- Error State -->
					<div class="text-center">
						<div class="mb-4">
							<AlertCircle class="w-16 h-16 mx-auto text-red-500" />
						</div>
						<h2 class="text-xl font-bold mb-2 text-red-600">Verification Failed</h2>
						<p class="text-app-subtle-text mb-6">{error}</p>
						<a href={resolve('/')} class="btn bg-app-primary text-app-background border-0 w-full">
							Request New Link
						</a>
					</div>
				{/if}
			</div>

			<!-- Back to Home -->
			<div class="mt-6 text-center">
				<a href={resolve('/')} class="text-app-subtle-text text-sm hover:text-app-text">
					← Back to Home
				</a>
			</div>
		</div>
	</main>
</div>
