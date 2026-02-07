<script lang="ts">
	import { m } from '$lib/i18n/messages.js';
	import { resolve } from '$app/paths';
</script>

<footer class="bg-white border-t border-cream py-16 px-6 sm:px-12 lg:px-24">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
			<!-- Brand Section -->
			<div class="col-span-1 md:col-span-1">
				<h2 class="text-2xl font-bold text-taupe mb-4">{m.headline()}</h2>
				<p class="text-slate text-sm leading-relaxed">
					{m.footer_tagline()}
				</p>
			</div>

			<!-- Navigation -->
			<div>
				<h3 class="text-midnyt font-semibold mb-4 uppercase tracking-wider text-xs">
					{m.navigation()}
				</h3>
				<ul class="space-y-3">
					<li>
						<a href={resolve('/')} class="text-slate hover:text-bronze transition-colors text-sm"
							>Home</a
						>
					</li>
					<li>
						<a
							href={resolve('/how-it-works')}
							class="text-slate hover:text-bronze transition-colors text-sm">{m.how_it_works()}</a
						>
					</li>
					<li>
						<a
							href={resolve('/contact')}
							class="text-slate hover:text-bronze transition-colors text-sm">{m.contact_us()}</a
						>
					</li>
				</ul>
			</div>

			<!-- Legal -->
			<div>
				<h3 class="text-midnyt font-semibold mb-4 uppercase tracking-wider text-xs">{m.legal()}</h3>
				<ul class="space-y-3">
					<li>
						<a
							href={resolve('/privacy')}
							class="text-slate hover:text-bronze transition-colors text-sm">{m.privacy_policy()}</a
						>
					</li>
					<li>
						<a
							href={resolve('/terms')}
							class="text-slate hover:text-bronze transition-colors text-sm"
							>{m.terms_of_service()}</a
						>
					</li>
				</ul>
			</div>

			<!-- Social (Placeholder) -->
			<div>
				<h3 class="text-midnyt font-semibold mb-4 uppercase tracking-wider text-xs">Social</h3>
				<ul class="space-y-3">
					<li>
						<a href={resolve('/')} class="text-slate hover:text-bronze transition-colors text-sm"
							>{m.facebook()}</a
						>
					</li>
					<li>
						<a href={resolve('/')} class="text-slate hover:text-bronze transition-colors text-sm"
							>{m.twitter()}</a
						>
					</li>
					<li>
						<a href={resolve('/')} class="text-slate hover:text-bronze transition-colors text-sm"
							>{m.instagram()}</a
						>
					</li>
				</ul>
			</div>
		</div>

		<div
			class="pt-8 border-t border-cream flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4"
		>
			<p class="text-slate text-xs">
				{m.copyright()}
			</p>
			<div class="bg-cream/50 px-3 py-1 rounded text-xs text-taupe italic">
				{m.privacy_notice()}
			</div>
		</div>
	</div>
</footer>
