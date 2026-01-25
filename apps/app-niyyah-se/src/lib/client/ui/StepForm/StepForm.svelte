<script lang="ts" generics="T extends Record<string, unknown>">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import type { StepFieldConfig } from './types';
	import { SelectField, RadioGroupField } from './fields';

	/**
	 * Props for the StepForm component
	 */
	interface Props {
		steps: StepFieldConfig<keyof T & string>[];
		initialValues?: Partial<T>;
		onSubmit: (data: T) => void | Promise<void>;
		onStepChange?: (currentStep: number) => void;
		onValueChange?: (key: keyof T, value: T[keyof T]) => void;
		loading?: boolean;
		submitText?: string;
	}

	let {
		steps,
		initialValues = {} as Partial<T>,
		onSubmit,
		onStepChange,
		onValueChange,
		loading = false,
		submitText = 'Submit'
	}: Props = $props();

	// State
	let currentStep = $state(0);
	let formData = $state<Partial<T>>(structuredClone(initialValues));
	let error = $state<string>('');
	let direction = $state<'forward' | 'backward'>('forward');

	// Refs
	let inputRef = $state<HTMLElement | null>(null);

	// Computed
	const progress = $derived((currentStep / steps.length) * 100);
	const isLastStep = $derived(currentStep === steps.length - 1);
	const currentStepConfig = $derived(steps[currentStep]);

	/**
	 * Auto-focus on input when step changes
	 */
	$effect(() => {
		if (inputRef && 'focus' in inputRef && typeof inputRef.focus === 'function') {
			inputRef.focus();
		}
	});

	/**
	 * Validate current step
	 */
	function validateStep(): boolean {
		error = '';
		const step = currentStepConfig;
		const value = formData[step.id];

		// Check required
		if (step.required && (value === undefined || value === null || value === '')) {
			error = 'This field is required';
			return false;
		}

		// Custom validation
		if (step.validate && value !== undefined) {
			const validationResult = step.validate(value as T[keyof T]);
			if (typeof validationResult === 'string') {
				error = validationResult;
				return false;
			}
			if (!validationResult) {
				error = 'Please provide a valid answer';
				return false;
			}
		}

		return true;
	}

	/**
	 * Go to next step
	 */
	function handleNext() {
		if (!validateStep()) return;

		if (isLastStep) {
			handleSubmit();
		} else {
			direction = 'forward';
			currentStep++;
			onStepChange?.(currentStep);
		}
	}

	/**
	 * Go to previous step
	 */
	function handleBack() {
		if (currentStep > 0) {
			direction = 'backward';
			currentStep--;
			error = '';
			onStepChange?.(currentStep);
		}
	}

	/**
	 * Submit the form
	 */
	async function handleSubmit() {
		if (!validateStep()) return;
		await onSubmit(formData as T);
	}

	/**
	 * Handle keyboard navigation
	 */
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleNext();
		}
	}

	/**
	 * Update form data
	 */
	function updateValue(key: keyof T, value: T[keyof T]) {
		formData = { ...formData, [key]: value };
		error = '';
		onValueChange?.(key, value);
	}
</script>

<div class="step-form-container">
	<!-- Progress Bar -->
	<div class="progress-bar-container">
		<div class="progress-bar" style="width: {progress}%"></div>
	</div>

	<!-- Step Counter -->
	<div class="step-counter" in:fade={{ duration: 200 }}>
		{currentStep + 1} → {steps.length}
	</div>

	<!-- Main Content -->
	<div class="content-wrapper">
		{#key currentStep}
			<div
				class="step-content"
				in:fly={{
					x: direction === 'forward' ? 100 : -100,
					duration: 300,
					easing: cubicOut
				}}
				out:fly={{
					x: direction === 'forward' ? -100 : 100,
					duration: 300,
					easing: cubicOut
				}}
			>
				<!-- Question -->
				<h2 class="question">{currentStepConfig.question}</h2>

				{#if currentStepConfig.description}
					<p class="description">{currentStepConfig.description}</p>
				{/if}

				<!-- Field Input -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<div class="input-wrapper" role="group" onkeydown={handleKeyDown}>
					{#if currentStepConfig.fieldType === 'select'}
						<SelectField
							value={formData[currentStepConfig.id] as string | number | undefined}
							options={currentStepConfig.selectOptions || []}
							placeholder={currentStepConfig.placeholder}
							onChange={(value) => updateValue(currentStepConfig.id, value as T[keyof T])}
							bind:inputRef={inputRef as HTMLSelectElement | null}
						/>
					{:else if currentStepConfig.fieldType === 'radio'}
						<RadioGroupField
							value={formData[currentStepConfig.id] as string | number | boolean | undefined}
							options={currentStepConfig.radioOptions || []}
							onChange={(value) => updateValue(currentStepConfig.id, value as T[keyof T])}
						/>
					{/if}
				</div>

				<!-- Error Message -->
				{#if error}
					<div class="error-message" transition:fade={{ duration: 200 }}>
						{error}
					</div>
				{/if}
			</div>
		{/key}
	</div>

	<!-- Navigation -->
	<div class="navigation">
		{#if currentStep > 0}
			<button
				type="button"
				class="btn-back"
				onclick={handleBack}
				disabled={loading}
				transition:fade={{ duration: 200 }}
			>
				← Back
			</button>
		{/if}

		<button type="button" class="btn-next" onclick={handleNext} disabled={loading}>
			{#if loading}
				Processing...
			{:else if isLastStep}
				{submitText} →
			{:else}
				Continue →
			{/if}
		</button>
	</div>
</div>

<style>
	.step-form-container {
		max-width: 42rem;
		margin: 0 auto;
		padding: 2rem 1rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	/* Progress Bar */
	.progress-bar-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: rgba(0, 0, 0, 0.05);
		z-index: 100;
	}

	.progress-bar {
		height: 100%;
		background: var(--color-app-primary);
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Step Counter */
	.step-counter {
		font-size: 0.875rem;
		color: #6b7280;
		margin-bottom: 3rem;
		font-weight: 500;
	}

	/* Content */
	.content-wrapper {
		flex: 1;
		position: relative;
		overflow: hidden;
	}

	.step-content {
		position: absolute;
		width: 100%;
	}

	.question {
		font-size: 2rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 0.75rem;
		line-height: 1.2;
	}

	.description {
		font-size: 1.125rem;
		color: #6b7280;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.input-wrapper {
		margin-bottom: 1.5rem;
	}

	/* Error Message */
	.error-message {
		background: #fee2e2;
		color: #dc2626;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		margin-top: 1rem;
	}

	/* Navigation */
	.navigation {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
		padding-top: 2rem;
	}

	.btn-back,
	.btn-next {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		font-weight: 600;
		border-radius: 0.375rem;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.btn-back {
		background: #f3f4f6;
		color: #374151;
		border: 1px solid #d1d5db;
	}

	.btn-back:hover:not(:disabled) {
		background: #e5e7eb;
	}

	.btn-next {
		flex: 1;
		justify-content: center;
		background: var(--color-app-primary);
		color: white;
	}

	.btn-next:hover:not(:disabled) {
		opacity: 0.9;
	}

	.btn-back:disabled,
	.btn-next:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* Responsive */
	@media (max-width: 640px) {
		.question {
			font-size: 1.5rem;
		}

		.description {
			font-size: 1rem;
		}

		.step-form-container {
			padding: 1.5rem 1rem;
		}
	}
</style>
