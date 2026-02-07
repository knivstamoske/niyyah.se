<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import DefaultFooter from '$lib/client/ui/DefaultFooter.svelte';
	import LanguagePicker from '$lib/client/ui/LanguagePicker.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-white text-midnyt">
	<!-- Language Picker -->
	<div class="flex justify-end px-4 py-4">
		<LanguagePicker />
	</div>

	<main class="flex-grow">
		{@render children()}
	</main>

	<DefaultFooter />
</div>
