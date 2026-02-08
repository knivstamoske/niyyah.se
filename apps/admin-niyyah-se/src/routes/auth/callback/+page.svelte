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
			// Redirect to dashboard after successful verification
			setTimeout(() => {
				goto(resolve('/dashboard'));
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

<div class="min-h-screen flex flex-col bg-white text-midnyt">
	<main class="flex-1 flex flex-col items-center justify-center px-4 py-8">
		<div class="w-full max-w-md">
			<div class="bg-white rounded-lg border border-taupe/20 p-8">
				{#if verifying}
					<!-- Verifying State -->
					<div class="text-center">
						<div class="mb-4">
							<Loader2 class="w-16 h-16 mx-auto text-bronze animate-spin" />
						</div>
						<h2 class="text-xl font-bold mb-2">Verifying...</h2>
						<p class="text-slate">Please wait while we sign you in</p>
					</div>
				{:else if error}
					<!-- Error State -->
					<div class="text-center">
						<div class="mb-4">
							<AlertCircle class="w-16 h-16 mx-auto text-error" />
						</div>
						<h2 class="text-xl font-bold mb-2 text-error">Verification Failed</h2>
						<p class="text-slate mb-6">{error}</p>
						<a
							href={resolve('/')}
							class="inline-flex items-center justify-center w-full bg-midnyt text-cream px-6 py-2.5 rounded-md hover:bg-midnyt/90 transition-colors font-medium"
						>
							Request New Link
						</a>
					</div>
				{/if}
			</div>

			<!-- Back to Home -->
			<div class="mt-6 text-center">
				<a href={resolve('/')} class="text-slate text-sm hover:text-midnyt"> ← Back to Home </a>
			</div>
		</div>
	</main>
</div>
