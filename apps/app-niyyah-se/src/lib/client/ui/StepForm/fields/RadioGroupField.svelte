<script lang="ts">
	import type { RadioOption } from '../types';

	interface Props {
		value: string | number | boolean | undefined;
		options: RadioOption[];
		onChange: (value: string | number | boolean) => void;
	}

	let { value, options, onChange }: Props = $props();

	/**
	 * Handle option click
	 */
	function handleClick(optionValue: string | number | boolean) {
		onChange(optionValue);
	}

	/**
	 * Check if an option is selected
	 */
	function isSelected(optionValue: string | number | boolean): boolean {
		return value === optionValue;
	}
</script>

<div class="radio-group">
	{#each options as option (option.value)}
		<button
			type="button"
			class="radio-option"
			class:selected={isSelected(option.value)}
			onclick={() => handleClick(option.value)}
		>
			<span class="radio-label">{option.label}</span>
		</button>
	{/each}
</div>

<style>
	.radio-group {
		display: grid;
		gap: 0.75rem;
	}

	.radio-option {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		cursor: pointer;
		transition: all 0.2s ease;
		background: white;
		font-size: 1rem;
		font-weight: 500;
		text-align: left;
		width: 100%;
	}

	.radio-option:hover {
		border-color: var(--color-app-primary);
		background: #fafafa;
	}

	.radio-option.selected {
		border-color: var(--color-app-primary);
		background: #e6f2ff;
	}

	.radio-label {
		flex: 1;
		color: #111827;
	}
</style>
