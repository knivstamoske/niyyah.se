<script lang="ts">
	import { setLocale, getLocale } from '$lib/i18n/runtime';

	/**
	 * LanguageOption is an option for the language picker.
	 */
	interface LanguageOption {
		code: 'en' | 'sv' | 'ar';
		label: string;
	}

	/**
	 * options is the list of available language options.
	 */
	const options: LanguageOption[] = [
		{ code: 'en', label: 'EN' },
		{ code: 'sv', label: 'SV' },
		{ code: 'ar', label: 'AR' }
	];

	const currentLocale = $derived(getLocale());

	/**
	 * handleLanguageChange handles the language selection change.
	 */
	function handleLanguageChange(code: 'en' | 'sv' | 'ar'): void {
		setLocale(code);
	}
</script>

<div class="flex items-center text-xs font-medium border border-slate/20 rounded-md overflow-hidden">
	{#each options as option, index (option.code)}
		{#if index > 0}
			<div class="w-px bg-slate/20 h-full"></div>
		{/if}
		<button
			type="button"
			class="px-3 py-1.5 {currentLocale === option.code
				? 'bg-cream text-midnyt'
				: 'bg-white text-slate hover:text-midnyt hover:bg-cream/50'} transition-colors"
			onclick={() => handleLanguageChange(option.code)}
		>
			{option.label}
		</button>
	{/each}
</div>
