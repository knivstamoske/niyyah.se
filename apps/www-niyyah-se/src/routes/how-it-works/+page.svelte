<script lang="ts">
	import { m } from '$lib/i18n/messages.js';
	import { getLocale } from '$lib/i18n/runtime.js';
	import infographicEn from '$lib/assets/how_it_works_en.png';
	import infographicSv from '$lib/assets/how_it_works_sv.png';
	import infographicAr from '$lib/assets/how_it_works_ar.png';

	const currentLocale = $derived(getLocale());

	const infographic = $derived.by(() => {
		switch (currentLocale) {
			case 'sv':
				return infographicSv;
			case 'ar':
				return infographicAr;
			default:
				return infographicEn;
		}
	});
</script>

<div class="max-w-4xl mx-auto py-20 px-6">
	<h1 class="text-4xl font-bold mb-8 text-taupe text-center">{m.how_it_works()}</h1>

	<div class="bg-cream rounded-lg overflow-hidden shadow-sm mb-12">
		<div class="p-8 md:p-12 text-center">
			<h2 class="text-2xl font-semibold mb-6 text-midnyt">{m.how_it_works_process_title()}</h2>
			<p class="text-lg text-slate max-w-2xl mx-auto">
				{m.how_it_works_process_description()}
			</p>
		</div>
	</div>

	<img
		src={infographic}
		alt={m.how_it_works_infographic_alt()}
		class="mx-auto rounded-lg border border-bronze/20 shadow-md max-w-full h-auto mb-12"
	/>

	<div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-center">
		<div class="bg-white p-6 rounded-lg border border-slate/10">
			<h3 class="font-bold text-midnyt mb-2">{m.how_it_works_private_secure_title()}</h3>
			<p class="text-slate text-sm">
				{m.how_it_works_private_secure_description()}
			</p>
		</div>
		<div class="bg-white p-6 rounded-lg border border-slate/10">
			<h3 class="font-bold text-midnyt mb-2">{m.how_it_works_wali_involved_title()}</h3>
			<p class="text-slate text-sm">
				{m.how_it_works_wali_involved_description()}
			</p>
		</div>
		<div class="bg-white p-6 rounded-lg border border-slate/10">
			<h3 class="font-bold text-midnyt mb-2">{m.how_it_works_facilitator_led_title()}</h3>
			<p class="text-slate text-sm">
				{m.how_it_works_facilitator_led_description()}
			</p>
		</div>
	</div>
</div>
