<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		StepForm,
		type StepFieldConfig,
		type SelectOption,
		type SelectGroup,
		type RadioOption
	} from '$lib/client/ui/StepForm';
	import { KOMMUNS_BY_LAN } from '$lib/shared/constants/kommuns';
	import { onboard } from './onboard.remote';

	/**
	 * Profile data type matching the database schema
	 */
	interface ProfileData {
		birthYear: number;
		kommun: string;
		gender: 'male' | 'female';
		maritalStatus: 'single' | 'divorced' | 'widowed';
		openToWidowed: boolean;
		openToOlder: boolean;
		openToYounger: boolean;
		openToSameAge: boolean;
	}

	/**
	 * Current year for birth year selector
	 */
	const currentYear = new Date().getFullYear();
	const birthYearOptions: SelectOption[] = Array.from({ length: 70 }, (_, i) => ({
		value: currentYear - 18 - i,
		label: String(currentYear - 18 - i)
	}));

	/**
	 * Convert kommuns map to grouped select options
	 */
	const kommunOptions: SelectGroup[] = Object.entries(KOMMUNS_BY_LAN).map(([lan, kommuns]) => ({
		label: lan,
		options: kommuns.map((kommun) => ({ value: kommun, label: kommun }))
	}));

	/**
	 * Gender options
	 */
	const genderOptions: RadioOption[] = [
		{ value: 'male', label: 'Man' },
		{ value: 'female', label: 'Woman' }
	];

	/**
	 * Marital status options
	 */
	const maritalStatusOptions: RadioOption[] = [
		{ value: 'single', label: 'Single' },
		{ value: 'divorced', label: 'Divorced' },
		{ value: 'widowed', label: 'Widowed' }
	];

	/**
	 * Step configurations for the profile creation flow
	 */
	const steps: StepFieldConfig<keyof ProfileData & string>[] = [
		{
			id: 'gender',
			question: 'I am a',
			required: true,
			fieldType: 'radio',
			radioOptions: genderOptions
		},
		{
			id: 'birthYear',
			question: 'I was born in',
			required: true,
			fieldType: 'select',
			selectOptions: birthYearOptions,
			placeholder: 'Select year',
			validate: (value: unknown) => {
				const year = Number(value);
				const currentYear = new Date().getFullYear();
				if (year < 1940 || year > currentYear - 18) {
					return 'Please enter a valid birth year (you must be at least 18)';
				}
				return true;
			}
		},
		{
			id: 'kommun',
			question: 'I live in',
			required: true,
			fieldType: 'select',
			selectOptions: kommunOptions,
			placeholder: 'Select kommun',
			validate: (value: unknown) => {
				if (typeof value === 'string' && value.trim().length < 2) {
					return 'Please enter a valid kommun name';
				}
				return true;
			}
		},
		{
			id: 'maritalStatus',
			question: 'I am',
			required: true,
			fieldType: 'radio',
			radioOptions: maritalStatusOptions
		}
	];

	/**
	 * Initial form values
	 */
	let initialValues: Partial<ProfileData> = {
		openToOlder: true,
		openToYounger: true,
		openToSameAge: true,
		openToWidowed: false
	};

	let loading = false;
	let errorMessage = '';

	/**
	 * Handle form submission
	 */
	async function handleSubmit(data: Record<string, unknown>) {
		loading = true;
		errorMessage = '';
		try {
			// Call the remote function directly
			await onboard({
				birthYear: Number(data.birthYear),
				kommun: String(data.kommun),
				gender: data.gender as 'male' | 'female',
				maritalStatus: data.maritalStatus as 'single' | 'divorced' | 'widowed'
			});
			// Redirect on success
			await goto('/profile');
		} catch (error) {
			console.error('Failed to submit profile:', error);
			// Show error message
			if (error instanceof Error) {
				errorMessage = error.message;
			} else {
				errorMessage = 'An unexpected error occurred. Please try again.';
			}
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Create Your Profile - Niyyah</title>
</svelte:head>

<div class="page-wrapper">
	<StepForm
		{steps}
		{initialValues}
		onSubmit={handleSubmit}
		submitText="Complete Profile"
		loading={loading}
	/>

	{#if errorMessage}
		<div class="max-w-md mx-auto px-4 py-4">
			<p class="text-center text-sm text-red-600">
				{errorMessage}
			</p>
		</div>
	{/if}
</div>

<style>
	.page-wrapper {
		min-height: 100dvh;
		background: white;
	}
</style>
