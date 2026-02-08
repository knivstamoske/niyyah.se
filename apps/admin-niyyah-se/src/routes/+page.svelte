<script lang="ts">
	import { LanguagePicker } from '$lib/client/ui';
	import { m } from '$lib/i18n/messages.js';
	import { authClient } from '$lib/client/auth';
	import { goto } from '$app/navigation';

	let email = '';
	let error = '';
	let loading = false;
	let success = false;

	async function handleSendMagicLink() {
		if (!email) {
			error = m.login_error_email_required();
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
						error = ctx.error.message || m.login_error_failed();
					}
				}
			);
		} catch (err) {
			error = m.login_error_unexpected();
			console.error('Sign-in link error:', err);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>{m.page_title()} | Admin Portal</title>
	<meta name="description" content="Niyyah Administrator Login" />
</svelte:head>

<div class="min-h-screen flex flex-col bg-white text-midnyt">
	<!-- Language Picker -->
	<div class="absolute top-0 right-0 p-4">
		<LanguagePicker />
	</div>

	<main class="flex-1 flex flex-col items-center justify-center px-4">
		<div class="w-full max-w-md">
			<!-- Logo -->
			<div class="flex justify-center mb-10 -mt-36">
				<img src="/logo/logo-tall.png" alt="Niyyah" class="h-36 object-contain" />
			</div>

			<div class="text-center mb-8">
				<h1 class="text-2xl font-bold">Admin Login</h1>
				<p class="text-slate mt-2">Restricted access for Niyyah staff only.</p>
			</div>

			{#if success}
				<!-- Success Message -->
				<div class="text-center">
					<h2 class="text-xl font-bold mb-2">{m.login_check_email()}</h2>
					<p class="text-slate">
						{m.login_sent_link_to()}
						<span class="font-medium text-midnyt">{email}</span>.<br />
						{m.login_didnt_get_it()}
						<button
							type="button"
							class="text-bronze hover:underline"
							onclick={() => (success = false)}
						>
							{m.login_try_again()}
						</button>
					</p>
				</div>
			{:else}
				<!-- Magic Link Request Form -->
				<form
					onsubmit={(e) => {
						e.preventDefault();
						handleSendMagicLink();
					}}
					class="space-y-4"
				>
					<!-- Email Input -->
					<div>
						<label for="email" class="block text-sm font-medium mb-2">{m.login_email_label()}</label
						>
						<input
							id="email"
							type="email"
							bind:value={email}
							placeholder={m.login_email_placeholder()}
							class="w-full px-3 py-2 border border-slate/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze transition-all"
							required
							disabled={loading}
						/>
					</div>

					<!-- Error Message -->
					{#if error}
						<div class="bg-cream border-l-4 border-error p-4">
							<p class="text-sm text-error">{error}</p>
						</div>
					{/if}

					<!-- Submit Button -->
					<button
						type="submit"
						class="bg-midnyt text-cream px-6 py-2.5 rounded-md hover:bg-midnyt/90 transition-colors font-medium w-full"
						disabled={loading}
					>
						{loading ? m.login_sending() : m.login_continue()}
					</button>
				</form>
			{/if}
		</div>
	</main>
</div>
