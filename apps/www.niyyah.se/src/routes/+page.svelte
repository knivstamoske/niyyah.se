<script lang="ts">
	import { LanguagePicker } from '$lib/client/ui';
	import { m } from '$lib/i18n/messages.js';
	import { Heart } from 'lucide-svelte';
	import { joinWaitlist } from './waitlist.remote';
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
		<!-- Hero Image -->
		<div class="px-4 py-3 flex justify-center lg:px-8">
			<div class="w-full max-w-2xl rounded-xl overflow-hidden">
				<img
					src="/hero-family.png"
					alt="Muslim couple with child"
					class="w-full h-auto max-h-160 object-cover"
				/>
			</div>
		</div>

		<!-- Headline -->
		<h1 class="text-3xl font-bold leading-tight px-4 text-center pb-3 pt-8 lg:pt-8">
			{m.headline()}
		</h1>

		<!-- Description -->
		<p
			class="text-app-subtle-text text-base leading-relaxed pb-3 pt-1 px-4 text-center max-w-md mx-auto"
		>
			{m.description()}
		</p>
		<div class="grow lg:grow-0"></div>

		<!-- Waitlist Section -->
		<div class="px-4 py-6 mt-6 lg:mt-8 lg:px-8">
			<!-- Form -->
			<form {...joinWaitlist} class="flex flex-col gap-4 max-w-sm mx-auto">
				<label class="flex flex-col w-full">
					<span class="sr-only">{m.email_label()}</span>
					<input
						{...joinWaitlist.fields.email.as('email')}
						placeholder={m.email_placeholder()}
						class="input input-bordered w-full"
					/>
					{#each joinWaitlist.fields.email.issues() as issue}
						<p class="text-sm text-red-600 mt-1">{issue.message}</p>
					{/each}
				</label>

				<button
					type="submit"
					class="btn bg-app-primary text-app-background border-0 w-full"
					disabled={!!joinWaitlist.pending}
				>
					{joinWaitlist.pending ? m.joining() : m.join_waitlist()}
				</button>
			</form>

			<!-- Success/Error Messages -->
			{#if joinWaitlist.result}
				<p
					class="text-center mt-4 text-sm {joinWaitlist.result.success
						? 'text-green-600'
						: 'text-red-600'}"
				>
					{joinWaitlist.result.message}
				</p>
			{/if}

			<!-- Social Proof -->
			<p class="text-app-subtle-text text-sm pt-4 px-4 text-center">
				{m.social_proof()}
			</p>

			<!-- Privacy Notice -->
			<p class="text-app-subtle-text text-xs pt-2 px-4 text-center">
				{m.privacy_notice()}
			</p>
		</div>
	</main>

	<!-- Footer -->
	<footer class="bg-app-primary text-white py-10 px-6">
		<div class="max-w-md mx-auto">
			<!-- Brand Section -->
			<div class="flex flex-col items-center text-center">
				<div class="flex items-center gap-3">
					<Heart size={24} />
					<h3 class="text-xl font-bold">{m.headline()}</h3>
				</div>
				<p class="mt-2 text-sm text-gray-400">{m.footer_tagline()}</p>
			</div>

			<!-- Copyright -->
			<div class="mt-8 text-center">
				<p class="text-xs text-gray-500">{m.copyright()}</p>
			</div>
		</div>
	</footer>
</div>
