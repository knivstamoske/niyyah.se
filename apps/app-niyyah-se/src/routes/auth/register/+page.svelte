<script lang="ts">
	import { authClient } from '$lib/client/auth';
	import { m } from '$lib/i18n/messages.js';

	let email = '';
	let name = '';
	let error = '';
	let loading = false;
	let success = false;

	/**
	 * handleRegister processes the registration and sends magic link.
	 */
	async function handleRegister() {
		if (!email || !name) {
			error = 'Please fill in all fields';
			return;
		}

		loading = true;
		error = '';

		try {
			await authClient.signUp.email(
				{ email, name },
				{
					onSuccess: () => {
						success = true;
						console.log('\n========== REGISTRATION SUCCESSFUL ==========');
						console.log(`Check Mailpit UI at http://localhost:8090 for the magic link`);
						console.log('=============================================\n');
					},
					onError: (ctx) => {
						error = ctx.error.message || 'Failed to register. Please try a different email.';
					}
				}
			);
		} catch (err) {
			error = 'An unexpected error occurred. Please try again.';
			console.error('Registration error:', err);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Register - {m.page_title()}</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-app-background text-app-text">
	<main class="flex-1 flex flex-col items-center justify-center px-4 py-8">
		<div class="w-full max-w-md">
			<!-- Header -->
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold mb-2">Create Account</h1>
				<p class="text-app-subtle-text">Join Niyyah.se to find your match</p>
			</div>

			{#if success}
				<!-- Success Message -->
				<div class="bg-white rounded-lg shadow-sm border border-app-border p-6">
					<div class="text-center">
						<div class="mb-4">
							<svg
								class="w-16 h-16 mx-auto text-green-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
						</div>
						<h2 class="text-xl font-bold mb-2">Check Your Email</h2>
						<p class="text-app-subtle-text mb-4">
							We've sent a magic link to <span class="font-medium text-app-text">{email}</span>
						</p>
						<p class="text-sm text-app-subtle-text mb-6">
							<strong>Development Mode:</strong> Check Mailpit at
							<a
								href="http://localhost:8090"
								target="_blank"
								rel="noopener noreferrer"
								class="text-app-primary hover:underline">http://localhost:8090</a
							>
						</p>
						<a href="/auth/login" class="btn bg-app-primary text-app-background border-0 w-full">
							Go to Sign In
						</a>
					</div>
				</div>
			{:else}
				<!-- Registration Form -->
				<div class="bg-white rounded-lg shadow-sm border border-app-border p-6">
					<form on:submit|preventDefault={handleRegister} class="space-y-4">
						<!-- Name Input -->
						<div>
							<label for="name" class="block text-sm font-medium mb-2"> Full Name </label>
							<input
								id="name"
								type="text"
								bind:value={name}
								placeholder="Enter your full name"
								class="input input-bordered w-full"
								required
								disabled={loading}
							/>
						</div>

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

						<!-- Info Box -->
						<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
							<p class="text-sm text-blue-800">
								<strong>No Password Required:</strong> We'll send you a secure magic link to sign in.
							</p>
						</div>

						<!-- Submit Button -->
						<button
							type="submit"
							class="btn bg-app-primary text-app-background border-0 w-full"
							disabled={loading}
						>
							{loading ? 'Creating Account...' : 'Create Account'}
						</button>
					</form>

					<!-- Links -->
					<div class="mt-6 text-center text-sm">
						<p class="text-app-subtle-text">
							Already have an account?
							<a href="/auth/login" class="text-app-primary font-medium hover:underline">
								Sign In
							</a>
						</p>
					</div>
				</div>
			{/if}

			<!-- Back to Home -->
			<div class="mt-6 text-center">
				<a href="/" class="text-app-subtle-text text-sm hover:text-app-text"> ← Back to Home </a>
			</div>
		</div>
	</main>
</div>
