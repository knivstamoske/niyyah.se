<script lang="ts">
	import { LanguagePicker, DefaultFooter } from '$lib/client/ui';
	import { m } from '$lib/i18n/messages.js';
	import { subscribe } from './subscribe.remote';
</script>

<svelte:head>
	<title>{m.page_title()}</title>
	<meta name="description" content={m.meta_description()} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-white text-midnyt">
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

		<!-- Logo -->
		<div class="px-4 pt-6 pb-3 flex justify-center">
			<img
				src="/logo/logo-wide.png"
				alt="Niyyah"
				class="h-10 object-contain"
			/>
		</div>

		<!-- Description -->
		<p
			class="text-slate text-base leading-relaxed pb-3 pt-1 px-4 text-center max-w-md mx-auto"
		>
			{m.description()}
		</p>
		<div class="grow lg:grow-0"></div>

		<!-- Waitlist Section -->
		<div class="px-4 py-6 mt-6 lg:mt-8 lg:px-8">
			<!-- Form -->
			<form {...subscribe} class="flex flex-col gap-4 max-w-sm mx-auto">
				<label class="flex flex-col w-full">
					<span class="sr-only">{m.email_label()}</span>
					<input
						{...subscribe.fields.email.as('email')}
						placeholder={m.email_placeholder()}
						class="w-full px-3 py-2 border border-slate/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze transition-all"
					/>
					{#each subscribe.fields.email.issues() as issue, index (index)}
						<p class="text-sm text-error mt-1">{issue.message}</p>
					{/each}
				</label>
				<button
					type="submit"
					class="bg-midnyt text-cream px-6 py-2.5 rounded-md hover:bg-midnyt/90 transition-colors font-medium w-full"
					disabled={!!subscribe.pending}
				>
					{subscribe.pending ? m.joining() : m.join_waitlist()}
				</button>
			</form>

			<!-- Success/Error Messages -->
			{#if subscribe.result}
				<p
					class="text-center mt-4 text-sm {subscribe.result.success
						? 'text-success'
						: 'text-error'}"
				>
					{subscribe.result.message}
				</p>
			{/if}

			<!-- Social Proof -->
			<p class="text-slate text-sm pt-4 px-4 text-center">
				{m.social_proof()}
			</p>

			<!-- Privacy Notice -->
			<p class="text-slate text-xs pt-2 px-4 text-center">
				{m.privacy_notice()}
			</p>
		</div>
	</main>

	<DefaultFooter />
</div>
