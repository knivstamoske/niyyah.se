<script lang="ts">
	import { Heart, Facebook, Twitter, Instagram } from 'lucide-svelte';
	import { joinWaitlist } from './waitlist.remote';
	import { m } from '$lib/i18n/messages.js';
	import { setLocale, getLocale } from '$lib/i18n/runtime';
</script>

<svelte:head>
	<title>{m.page_title()}</title>
	<meta name="description" content={m.meta_description()} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-background text-text">
	<!-- Language Picker -->
	<div class="flex justify-end px-4 py-2">
		<div class="flex gap-3 text-sm text-subtle-text">
			<button
				class="hover:text-primary transition-colors {getLocale() === 'en' ? 'text-primary font-semibold' : ''}"
				onclick={() => setLocale('en')}
			>
				English
			</button>
			<span class="text-border">|</span>
			<button
				class="hover:text-primary transition-colors {getLocale() === 'sv' ? 'text-primary font-semibold' : ''}"
				onclick={() => setLocale('sv')}
			>
				Svenska
			</button>
			<span class="text-border">|</span>
			<button
				class="hover:text-primary transition-colors {getLocale() === 'ar' ? 'text-primary font-semibold' : ''}"
				onclick={() => setLocale('ar')}
			>
				العربية
			</button>
		</div>
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
			class="text-subtle-text text-base leading-relaxed pb-3 pt-1 px-4 text-center max-w-md mx-auto"
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
						class="w-full h-14 px-4 rounded-lg bg-white border-2 border-border text-text placeholder:text-subtle-text focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
					/>
					{#each joinWaitlist.fields.email.issues() as issue}
						<p class="text-sm text-red-600 mt-1">{issue.message}</p>
					{/each}
				</label>

				<button
					type="submit"
					class="h-14 px-6 rounded-lg w-full bg-primary text-white font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
			<p class="text-subtle-text text-sm pt-4 px-4 text-center">
				{m.social_proof()}
			</p>

			<!-- Privacy Notice -->
			<p class="text-subtle-text text-xs pt-2 px-4 text-center">
				{m.privacy_notice()}
			</p>
		</div>
	</main>

	<!-- Footer -->
	<footer class="bg-footer-bg text-white py-10 px-6">
		<div class="max-w-md mx-auto">
			<!-- Brand Section -->
			<div class="flex flex-col items-center text-center">
				<div class="flex items-center gap-3">
					<Heart class="text-secondary" size={24} />
					<h3 class="text-xl font-bold">{m.headline()}</h3>
				</div>
				<p class="mt-2 text-sm text-gray-400">{m.footer_tagline()}</p>
			</div>

			<!-- Social Links -->
			<div class="flex justify-center gap-6 mt-6">
				<a href="#facebook" class="text-gray-400 hover:text-secondary transition-colors">
					<Facebook size={24} />
					<span class="sr-only">{m.facebook()}</span>
				</a>
				<a href="#twitter" class="text-gray-400 hover:text-secondary transition-colors">
					<Twitter size={24} />
					<span class="sr-only">{m.twitter()}</span>
				</a>
				<a href="#instagram" class="text-gray-400 hover:text-secondary transition-colors">
					<Instagram size={24} />
					<span class="sr-only">{m.instagram()}</span>
				</a>
			</div>

			<!-- Copyright -->
			<div class="mt-8 text-center">
				<p class="text-xs text-gray-500">{m.copyright()}</p>
			</div>
		</div>
	</footer>
</div>
