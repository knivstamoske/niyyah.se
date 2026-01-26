<script lang="ts">
	import { m } from '$lib/i18n/messages.js';
	import { resolve } from '$app/paths';
</script>

<footer class="bg-app-primary text-white py-10 px-6">
	<div class="max-w-md mx-auto">
		<!-- Links -->
		<div class="text-center">
			<p class="text-sm">
				<a href={resolve('/privacy')} class="hover:underline">{m.privacy_policy()}</a>
				·
				<a href={resolve('/terms')} class="hover:underline">{m.terms_of_service()}</a>
			</p>
		</div>

		<!-- Copyright -->
		<div class="mt-4 text-center">
			<p class="text-xs text-gray-500">{m.copyright()}</p>
		</div>
	</div>
</footer>
