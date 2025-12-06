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
		{ code: 'en', label: 'En' },
		{ code: 'sv', label: 'Sv' },
		{ code: 'ar', label: 'Ar' }
	];

	/**
	 * handleLanguageChange handles the language selection change.
	 */
	function handleLanguageChange(event: Event): void {
		const target = event.target as HTMLSelectElement;
		setLocale(target.value as 'en' | 'sv' | 'ar');
	}
</script>

<select class="select select-sm" value={getLocale()} onchange={handleLanguageChange}>
	{#each options as option}
		<option value={option.code}>{option.label}</option>
	{/each}
</select>
