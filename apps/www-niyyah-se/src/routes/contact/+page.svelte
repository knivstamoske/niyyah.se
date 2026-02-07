<script lang="ts">
	import { m } from '$lib/i18n/messages.js';
</script>

<div class="max-w-4xl mx-auto py-20 px-6">
	<h1 class="text-4xl font-bold mb-8 text-taupe">{m.contact_us()}</h1>
	<p class="text-lg text-slate mb-6">
		{m.contact_under_construction()}
	</p>
	<div class="bg-cream p-8 rounded-lg">
		<p class="font-medium mb-4">In the meantime, you can reach us at:</p>
		<div class="space-y-3">
			<p>
				<span class="font-semibold">{m.contact_address_label()}:</span>
				{m.contact_address_value()}
			</p>
			<p>
				<span class="font-semibold">{m.contact_phone_label()}:</span>
				<a href="tel:{m.contact_phone_value()}" class="text-bronze hover:underline"
					>{m.contact_phone_value()}</a
				>
			</p>
			<p>
				<span class="font-semibold">{m.contact_email_label()}:</span>
				<a
					href="mailto:{m.contact_email_value()}"
					class="text-bronze hover:underline"
					data-ignore-resolve>{m.contact_email_value()}</a
				>
			</p>
		</div>
	</div>
</div>
