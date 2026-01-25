<script lang="ts">
	import { tick } from 'svelte';
	import {
		StepForm,
		type StepFieldConfig,
		type SelectOption,
		type SelectGroup,
		type RadioOption
	} from '$lib/client/ui/StepForm';
	import { kommunsByLan } from '$lib/shared/constants/kommuns';
	import { createProfile } from './(remote)/profile.remote';

	/**
	 * Profile data type matching the database schema
	 */
	interface ProfileData {
		birthYear: number;
		kommun: string;
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
	const kommunOptions: SelectGroup[] = Object.entries(kommunsByLan).map(([lan, kommuns]) => ({
		label: lan,
		options: kommuns.map((kommun) => ({ value: kommun, label: kommun }))
	}));

	/**
	 * Marital status options
	 */
	const maritalStatusOptions: RadioOption[] = [
		{ value: 'single', label: 'Single' },
		{ value: 'divorced', label: 'Divorced' },
		{ value: 'widowed', label: 'Widowed' }
	];

	/**
	 * Open to widowed options
	 */
	const openToWidowedOptions: RadioOption[] = [
		{ value: true, label: "Yes, I'm open to widowed" },
		{ value: false, label: 'Not at this time' }
	];

	/**
	 * Step configurations for the profile creation flow
	 */
	const steps: StepFieldConfig<keyof ProfileData & string>[] = [
		{
			id: 'birthYear',
			question: 'What year were you born?',
			description: 'We use this to help you find compatible matches',
			required: true,
			fieldType: 'select',
			selectOptions: birthYearOptions,
			placeholder: 'Select your birth year',
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
			question: 'Which kommun do you live in?',
			description: 'This helps us connect you with people nearby',
			required: true,
			fieldType: 'select',
			selectOptions: kommunOptions,
			placeholder: 'Select your kommun',
			validate: (value: unknown) => {
				if (typeof value === 'string' && value.trim().length < 2) {
					return 'Please enter a valid kommun name';
				}
				return true;
			}
		},
		{
			id: 'maritalStatus',
			question: 'What is your marital status?',
			required: true,
			fieldType: 'radio',
			radioOptions: maritalStatusOptions
		},
		{
			id: 'openToWidowed',
			question: 'Are you open to matching with someone who is widowed?',
			fieldType: 'radio',
			radioOptions: openToWidowedOptions
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

	let formElement: HTMLFormElement;
	let formData: Partial<ProfileData> = { ...initialValues };

	/**
	 * Handle form submission using the form helper's submit method
	 */
	async function handleSubmit(data: Record<string, unknown>) {
		formData = data;
		await tick();
		if (formElement) {
			formElement.requestSubmit();
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
		loading={!!createProfile.pending}
	/>

	<form {...createProfile} bind:this={formElement} class="hidden">
		<input type="hidden" name="birthYear" value={formData.birthYear} />
		<input type="hidden" name="kommun" value={formData.kommun} />
		<input type="hidden" name="maritalStatus" value={formData.maritalStatus} />
		<input type="hidden" name="openToWidowed" value={String(formData.openToWidowed)} />
		<input type="hidden" name="openToOlder" value={String(formData.openToOlder)} />
		<input type="hidden" name="openToYounger" value={String(formData.openToYounger)} />
		<input type="hidden" name="openToSameAge" value={String(formData.openToSameAge)} />
	</form>

	{#if createProfile.result}
		<div class="max-w-md mx-auto px-4 py-4">
			<p
				class="text-center text-sm {createProfile.result.success
					? 'text-green-600'
					: 'text-red-600'}"
			>
				{createProfile.result.message}
			</p>
		</div>
	{/if}
</div>

<style>
	.page-wrapper {
		min-height: 100vh;
		background: white;
	}
</style>
