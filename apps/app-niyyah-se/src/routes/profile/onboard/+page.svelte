<script lang="ts">
	import { goto } from '$app/navigation';
	import { KOMMUNS_BY_LAN } from '$lib/shared/constants/kommuns';
	import { onboard } from './onboard.remote';
	import { m } from '$lib/i18n/messages.js';

	/**
	 * Profile data type matching the database schema
	 */
	interface ProfileData {
		fullName: string;
		birthYear: number;
		kommun: string;
		gender: 'male' | 'female';
		maritalStatus: 'single' | 'divorced' | 'widowed';
		fluentLanguages: string;
		mobileNumber?: string;
		nationality: string;
		selfDescription: string;
		partnerExpectations: string;
	}

	/**
	 * Current year for birth year selector
	 */
	const currentYear = new Date().getFullYear();
	const birthYearOptions = Array.from({ length: 70 }, (_, i) => ({
		value: currentYear - 18 - i,
		label: String(currentYear - 18 - i)
	}));

	/**
	 * Convert kommuns map to flat array for select
	 */
	const kommunOptions = Object.entries(KOMMUNS_BY_LAN).flatMap(([lan, kommuns]) =>
		kommuns.map((kommun) => ({ lan, kommun }))
	);

	/**
	 * Form state
	 */
	let formData: Partial<ProfileData> = $state({});
	let loading = $state(false);
	let errors = $state<Record<string, string>>({});

	/**
	 * Validate form
	 */
	function validate(): boolean {
		errors = {};

		if (!formData.fullName || formData.fullName.trim().length < 2) {
			errors.fullName = 'Name must be at least 2 characters';
		}

		if (!formData.gender) {
			errors.gender = m.step_form_field_required();
		}

		if (!formData.birthYear) {
			errors.birthYear = m.step_form_field_required();
		} else {
			const year = Number(formData.birthYear);
			if (year < 1940 || year > currentYear - 18) {
				errors.birthYear = m.onboarding_birth_year_error();
			}
		}

		if (!formData.kommun || formData.kommun.trim().length < 2) {
			errors.kommun = m.step_form_field_required();
		}

		if (!formData.maritalStatus) {
			errors.maritalStatus = m.step_form_field_required();
		}

		if (!formData.fluentLanguages || formData.fluentLanguages.trim().length < 1) {
			errors.fluentLanguages = 'Please specify at least one language';
		}

		if (formData.mobileNumber && !/^\+?[0-9\s\-()]+$/.test(formData.mobileNumber)) {
			errors.mobileNumber = 'Invalid phone number format';
		}

		if (!formData.nationality || formData.nationality.trim().length < 2) {
			errors.nationality = 'Nationality is required';
		}

		if (formData.selfDescription && formData.selfDescription.length > 500) {
			errors.selfDescription = 'Description must be 500 characters or less';
		}

		if (formData.partnerExpectations && formData.partnerExpectations.length > 500) {
			errors.partnerExpectations = 'Expectations must be 500 characters or less';
		}

		return Object.keys(errors).length === 0;
	}

	/**
	 * Handle form submission
	 */
	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (!validate()) {
			return;
		}

		loading = true;
		try {
			await onboard({
				fullName: String(formData.fullName).trim(),
				birthYear: Number(formData.birthYear),
				kommun: String(formData.kommun),
				gender: formData.gender as 'male' | 'female',
				maritalStatus: formData.maritalStatus as 'single' | 'divorced' | 'widowed',
				fluentLanguages: String(formData.fluentLanguages).trim(),
				mobileNumber: formData.mobileNumber?.trim() || '',
				nationality: String(formData.nationality).trim(),
				selfDescription: String(formData.selfDescription || '').trim(),
				partnerExpectations: String(formData.partnerExpectations || '').trim()
			});
			await goto('/profile');
		} catch (error) {
			console.error('Failed to submit profile:', error);
			errors.general = error instanceof Error ? error.message : m.onboarding_error_unexpected();
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>{m.onboarding_title()}</title>
</svelte:head>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 py-12">
		<!-- Header -->
		<div class="mb-12">
			<h1 class="text-3xl font-bold text-midnyt mb-2">{m.onboarding_title()}</h1>
			<p class="text-slate">{m.complete_profile_text()}</p>
		</div>

		<form on:submit={handleSubmit} class="space-y-8">
			<!-- Full Name -->
			<div class="space-y-3">
				<label for="fullName" class="block text-sm font-medium text-midnyt">
					Full Name <span class="text-error">*</span>
				</label>
				<input
					id="fullName"
					type="text"
					bind:value={formData.fullName}
					placeholder="Enter your full name"
					class="w-full px-4 py-3 border-2 rounded-md transition-all {errors.fullName
						? 'border-error'
						: 'border-taupe/20 hover:border-taupe/40 focus:border-bronze focus:outline-none'}"
				/>
				{#if errors.fullName}
					<p class="text-sm text-error">{errors.fullName}</p>
				{/if}
			</div>

			<!-- Gender -->
			<div class="space-y-3">
				<label class="block text-sm font-medium text-midnyt">
					{m.onboarding_gender_question()} <span class="text-error">*</span>
				</label>
				<div class="grid grid-cols-2 gap-3">
					<label
						class="relative flex items-center justify-center px-4 py-3 border-2 rounded-md cursor-pointer transition-all {formData.gender ===
						'male'
							? 'border-bronze bg-bronze/5'
							: 'border-taupe/20 hover:border-taupe/40'}"
					>
						<input
							type="radio"
							name="gender"
							value="male"
							bind:group={formData.gender}
							class="sr-only"
						/>
						<span class="font-medium text-midnyt">{m.onboarding_gender_man()}</span>
					</label>
					<label
						class="relative flex items-center justify-center px-4 py-3 border-2 rounded-md cursor-pointer transition-all {formData.gender ===
						'female'
							? 'border-bronze bg-bronze/5'
							: 'border-taupe/20 hover:border-taupe/40'}"
					>
						<input
							type="radio"
							name="gender"
							value="female"
							bind:group={formData.gender}
							class="sr-only"
						/>
						<span class="font-medium text-midnyt">{m.onboarding_gender_woman()}</span>
					</label>
				</div>
				{#if errors.gender}
					<p class="text-sm text-error">{errors.gender}</p>
				{/if}
			</div>

			<!-- Birth Year -->
			<div class="space-y-3">
				<label for="birthYear" class="block text-sm font-medium text-midnyt">
					{m.onboarding_birth_year_question()} <span class="text-error">*</span>
				</label>
				<select
					id="birthYear"
					bind:value={formData.birthYear}
					class="w-full px-4 py-3 border-2 rounded-md transition-all {errors.birthYear
						? 'border-error'
						: 'border-taupe/20 hover:border-taupe/40 focus:border-bronze focus:outline-none'}"
				>
					<option value="">{m.onboarding_birth_year_placeholder()}</option>
					{#each birthYearOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
				{#if errors.birthYear}
					<p class="text-sm text-error">{errors.birthYear}</p>
				{/if}
			</div>

			<!-- Kommun -->
			<div class="space-y-3">
				<label for="kommun" class="block text-sm font-medium text-midnyt">
					{m.onboarding_kommun_question()} <span class="text-error">*</span>
				</label>
				<select
					id="kommun"
					bind:value={formData.kommun}
					class="w-full px-4 py-3 border-2 rounded-md transition-all {errors.kommun
						? 'border-error'
						: 'border-taupe/20 hover:border-taupe/40 focus:border-bronze focus:outline-none'}"
				>
					<option value="">{m.onboarding_kommun_placeholder()}</option>
					{#each kommunOptions as { lan, kommun }}
						<option value={kommun}>{kommun} ({lan})</option>
					{/each}
				</select>
				{#if errors.kommun}
					<p class="text-sm text-error">{errors.kommun}</p>
				{/if}
			</div>

			<!-- Marital Status -->
			<div class="space-y-3">
				<label class="block text-sm font-medium text-midnyt">
					{m.onboarding_marital_status_question()} <span class="text-error">*</span>
				</label>
				<div class="grid grid-cols-1 gap-3">
					{#each [
						{ value: 'single', label: m.onboarding_marital_status_single() },
						{ value: 'divorced', label: m.onboarding_marital_status_divorced() },
						{ value: 'widowed', label: m.onboarding_marital_status_widowed() }
					] as option}
						<label
							class="relative flex items-center justify-center px-4 py-3 border-2 rounded-md cursor-pointer transition-all {formData.maritalStatus ===
							option.value
								? 'border-bronze bg-bronze/5'
								: 'border-taupe/20 hover:border-taupe/40'}"
						>
							<input
								type="radio"
								name="maritalStatus"
								value={option.value}
								bind:group={formData.maritalStatus}
								class="sr-only"
							/>
							<span class="font-medium text-midnyt">{option.label}</span>
						</label>
					{/each}
				</div>
				{#if errors.maritalStatus}
					<p class="text-sm text-error">{errors.maritalStatus}</p>
				{/if}
			</div>

			<!-- Fluent Languages -->
			<div class="space-y-3">
				<label for="fluentLanguages" class="block text-sm font-medium text-midnyt">
					Fluent Languages <span class="text-error">*</span>
				</label>
				<input
					id="fluentLanguages"
					type="text"
					bind:value={formData.fluentLanguages}
					placeholder="e.g. Swedish, English, Arabic"
					class="w-full px-4 py-3 border-2 rounded-md transition-all {errors.fluentLanguages
						? 'border-error'
						: 'border-taupe/20 hover:border-taupe/40 focus:border-bronze focus:outline-none'}"
				/>
				<p class="text-xs text-slate">Separate multiple languages with commas</p>
				{#if errors.fluentLanguages}
					<p class="text-sm text-error">{errors.fluentLanguages}</p>
				{/if}
			</div>

			<!-- Nationality -->
			<div class="space-y-3">
				<label for="nationality" class="block text-sm font-medium text-midnyt">
					Nationality <span class="text-error">*</span>
				</label>
				<input
					id="nationality"
					type="text"
					bind:value={formData.nationality}
					placeholder="e.g. Swedish, Moroccan, Syrian"
					class="w-full px-4 py-3 border-2 rounded-md transition-all {errors.nationality
						? 'border-error'
						: 'border-taupe/20 hover:border-taupe/40 focus:border-bronze focus:outline-none'}"
				/>
				{#if errors.nationality}
					<p class="text-sm text-error">{errors.nationality}</p>
				{/if}
			</div>

			<!-- Mobile Number -->
			<div class="space-y-3">
				<label for="mobileNumber" class="block text-sm font-medium text-midnyt">
					Mobile Number (Optional)
				</label>
				<input
					id="mobileNumber"
					type="tel"
					bind:value={formData.mobileNumber}
					placeholder="+46 70 123 45 67"
					class="w-full px-4 py-3 border-2 rounded-md transition-all {errors.mobileNumber
						? 'border-error'
						: 'border-taupe/20 hover:border-taupe/40 focus:border-bronze focus:outline-none'}"
				/>
				{#if errors.mobileNumber}
					<p class="text-sm text-error">{errors.mobileNumber}</p>
				{/if}
			</div>

			<!-- Self Description -->
			<div class="space-y-3">
				<label for="selfDescription" class="block text-sm font-medium text-midnyt">
					Describe Yourself
				</label>
				<textarea
					id="selfDescription"
					bind:value={formData.selfDescription}
					placeholder="Tell us about yourself, your interests, values, and what makes you unique..."
					rows="4"
					maxlength="500"
					class="w-full px-4 py-3 border-2 rounded-md transition-all resize-none {errors.selfDescription
						? 'border-error'
						: 'border-taupe/20 hover:border-taupe/40 focus:border-bronze focus:outline-none'}"
				></textarea>
				<p class="text-xs text-slate">
					{formData.selfDescription?.length || 0}/500 characters
				</p>
				{#if errors.selfDescription}
					<p class="text-sm text-error">{errors.selfDescription}</p>
				{/if}
			</div>

			<!-- Partner Expectations -->
			<div class="space-y-3">
				<label for="partnerExpectations" class="block text-sm font-medium text-midnyt">
					What Are You Looking For?
				</label>
				<textarea
					id="partnerExpectations"
					bind:value={formData.partnerExpectations}
					placeholder="Describe what you're looking for in a partner, including qualities, values, and preferences..."
					rows="4"
					maxlength="500"
					class="w-full px-4 py-3 border-2 rounded-md transition-all resize-none {errors.partnerExpectations
						? 'border-error'
						: 'border-taupe/20 hover:border-taupe/40 focus:border-bronze focus:outline-none'}"
				></textarea>
				<p class="text-xs text-slate">
					{formData.partnerExpectations?.length || 0}/500 characters
				</p>
				{#if errors.partnerExpectations}
					<p class="text-sm text-error">{errors.partnerExpectations}</p>
				{/if}
			</div>

			<!-- General Error -->
			{#if errors.general}
				<div class="bg-error/10 border-l-4 border-error px-4 py-3 rounded-sm">
					<p class="text-sm text-error">{errors.general}</p>
				</div>
			{/if}

			<!-- Submit Button -->
			<div class="pt-4">
				<button
					type="submit"
					disabled={loading}
					class="w-full px-6 py-3 bg-midnyt text-cream font-medium rounded-md hover:bg-midnyt/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{loading ? m.step_form_processing() : m.onboarding_submit()}
				</button>
			</div>
		</form>
	</div>
</div>
