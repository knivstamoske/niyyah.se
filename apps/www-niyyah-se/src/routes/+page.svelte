<script lang="ts">
	import { m } from '$lib/i18n/messages.js';
	import { env } from '$env/dynamic/public';
</script>

<svelte:head>
	<title>{m.page_title()}</title>
	<meta name="description" content={m.meta_description()} />
</svelte:head>

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
		<img src="/logo/logo-wide.png" alt="Niyyah" class="h-10 object-contain" />
	</div>

	<!-- Description -->
	<p class="text-slate text-base leading-relaxed pb-3 pt-1 px-4 text-center max-w-md mx-auto">
		{m.description()}
	</p>
	<div class="grow lg:grow-0"></div>

	<!-- Waitlist Section -->
	<div class="px-4 py-6 mt-6 lg:mt-8 lg:px-8">
		<!-- CTA Button -->
		<div class="flex justify-center">
			<a
				href={env.PUBLIC_CANDIDATE_APP_URL}
				class="bg-midnyt text-cream px-6 py-2.5 rounded-md hover:bg-midnyt/90 transition-colors font-medium inline-block"
			>
				{m.create_profile()}
			</a>
		</div>

		<!-- Privacy Notice -->
		<p class="text-slate text-xs pt-2 px-4 text-center">
			{m.privacy_notice()}
		</p>
	</div>
</main>
