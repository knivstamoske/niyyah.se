<script lang="ts">
	import { LanguagePicker } from '$lib/client/ui';
	import { m } from '$lib/i18n/messages.js';
	import { authClient } from '$lib/client/auth';
	import { resolve } from '$app/paths';
	import { CircleCheck } from 'lucide-svelte';

	let email = '';
	let error = '';
	let loading = false;
	let success = false;

	const session = authClient.useSession();

	async function handleSendMagicLink() {
		if (!email) {
			error = 'Please enter your email address';
			return;
		}

		loading = true;
		error = '';

		try {
			await authClient.signIn.magicLink(
				{ email },
				{
					onSuccess: () => {
						success = true;
					},
					onError: (ctx) => {
						error = ctx.error.message || 'Failed to send link. Please try again.';
					}
				}
			);
		} catch (err) {
			error = 'An unexpected error occurred. Please try again.';
			console.error('Sign-in link error:', err);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>{m.page_title()}</title>
	<meta name="description" content={m.meta_description()} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-app-background text-app-text">
	<!-- Language Picker -->
	<div class="flex justify-end px-4 py-4">
		<LanguagePicker />
	</div>

	<main class="flex-1 flex flex-col items-center justify-center px-4 py-8">
		<div class="w-full max-w-md">
			{#if success}
				<!-- Success Message -->
				<div class="text-center">
					<div class="mb-4">
						<CircleCheck class="w-16 h-16 mx-auto text-app-primary" />
					</div>
					<h2 class="text-xl font-bold mb-2">Check Your Email</h2>
					<p class="text-app-subtle-text">
						We've sent a sign-in link to
						<span class="font-medium text-app-text">{email}</span>.<br />
						Didn't get it?
						<button
							type="button"
							class="text-app-primary hover:underline"
							on:click={() => (success = false)}
						>
							Try again
						</button>
					</p>
				</div>
			{:else if $session.data?.user}
				<div class="text-center mb-8">
					<p class="text-app-subtle-text mb-4">
						You are already logged in as {$session.data.user.email}
					</p>
					<a
						href={resolve('/my-pages')}
						class="btn bg-app-primary text-app-background border-0 w-full"
					>
						Go to My Pages
					</a>
				</div>
			{:else}
				<!-- Magic Link Request Form -->
				<form on:submit|preventDefault={handleSendMagicLink} class="space-y-4">
					<!-- Email Input -->
					<div>
						<label for="email" class="block text-sm font-medium mb-2"> Email </label>
						<input
							id="email"
							type="email"
							bind:value={email}
							placeholder="you@example.com"
							class="input input-bordered w-full"
							required
							disabled={loading}
						/>
					</div>

					<!-- Error Message -->
					{#if error}
						<div class="alert alert-error bg-red-50 text-red-600 border-red-200">
							<p class="text-sm">{error}</p>
						</div>
					{/if}

					<!-- Submit Button -->
					<button
						type="submit"
						class="btn bg-app-primary text-app-background border-0 w-full"
						disabled={loading}
					>
						{loading ? 'Sending...' : 'Continue'}
					</button>
				</form>
			{/if}
		</div>
	</main>
</div>
