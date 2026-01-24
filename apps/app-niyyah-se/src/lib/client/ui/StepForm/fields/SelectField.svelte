<script lang="ts">
	import type { SelectOption, SelectGroup } from '../types';

	interface Props {
		value: string | number | undefined;
		options: SelectOption[] | SelectGroup[];
		placeholder?: string;
		onChange: (value: string | number) => void;
		inputRef?: HTMLSelectElement | null;
	}

	let {
		value = '',
		options,
		placeholder = 'Select an option',
		onChange,
		inputRef = $bindable(null)
	}: Props = $props();

	/**
	 * Check if options are grouped
	 */
	const isGrouped = $derived(options.length > 0 && 'options' in options[0]);

	/**
	 * Handle value change
	 */
	function handleChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement;
		const newValue = target.value;

		// Try to convert to number if it looks like a number
		const numValue = Number(newValue);
		const finalValue = !isNaN(numValue) && newValue !== '' ? numValue : newValue;

		onChange(finalValue);
	}
</script>

<select bind:this={inputRef} {value} onchange={handleChange} class="select-field">
	<option value="" disabled>{placeholder}</option>

	{#if isGrouped}
		{#each options as group, i ('label' in group ? group.label : i)}
			{@const selectGroup = group as SelectGroup}
			<optgroup label={selectGroup.label}>
				{#each selectGroup.options as option (option.value)}
					<option value={option.value}>{option.label}</option>
				{/each}
			</optgroup>
		{/each}
	{:else}
		{#each options as option, i ('value' in option ? option.value : i)}
			{@const selectOption = option as SelectOption}
			<option value={selectOption.value}>{selectOption.label}</option>
		{/each}
	{/if}
</select>

<style>
	.select-field {
		width: 100%;
		padding: 0.75rem 1rem;
		font-size: 1rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		background: white;
		transition: all 0.2s ease;
		font-family: inherit;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 1rem center;
		padding-right: 3rem;
		cursor: pointer;
	}

	.select-field:focus {
		outline: none;
		border-color: var(--color-app-primary);
	}

	.select-field:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
