<script lang="ts">
	import { LanguagePicker, DefaultFooter } from '$lib/client/ui';
	import { m } from '$lib/i18n/messages.js';
	import { authClient } from '$lib/client/auth';

	const { user } = authClient.useSession();
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

	<!-- Main Content -->
	<main class="flex-1 flex flex-col lg:py-8 lg:justify-center">
		<!-- Headline -->
		<h1 class="text-3xl font-bold leading-tight px-4 text-center pb-3 pt-8 lg:pt-8">
			{#if $user}
				Welcome back, {$user.name || $user.email}
			{:else}
				{m.headline()}
			{/if}
		</h1>

		<!-- Description -->
		<p
			class="text-app-subtle-text text-base leading-relaxed pb-3 pt-1 px-4 text-center max-w-md mx-auto"
		>
			{#if $user}
				Manage your profile and track your progress
			{:else}
				{m.description()}
			{/if}
		</p>
		<div class="grow lg:grow-0"></div>

		<!-- Action Section -->
		<div class="px-4 py-6 mt-6 lg:mt-8 lg:px-8">
			<div class="flex flex-col gap-4 max-w-sm mx-auto">
				{#if $user}
					<!-- Logged in actions -->
					<a href="/dashboard" class="btn bg-app-primary text-app-background border-0 w-full">
						Go to Dashboard
					</a>
					<a href="/profile" class="btn btn-outline border-app-primary text-app-primary w-full">
						View Profile
					</a>
				{:else}
					<!-- Not logged in actions -->
					<a href="/auth/login" class="btn bg-app-primary text-app-background border-0 w-full">
						{m.get_started()}
					</a>
				{/if}
			</div>

			<!-- Privacy Notice -->
			<p class="text-app-subtle-text text-xs pt-4 px-4 text-center">
				{m.privacy_notice()}
			</p>
		</div>
	</main>

	<DefaultFooter />
</div>
