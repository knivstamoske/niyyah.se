<script lang="ts">
	import { submitApplication } from './submit.remote';
	import { m } from '$lib/i18n/messages.js';
	import { setLocale, getLocale } from '$lib/i18n/runtime';
</script>

<svelte:head>
	<title>{m.candidate_page_title()}</title>
	<meta name="description" content={m.candidate_meta_description()} />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen flex flex-col bg-background text-text">
	<!-- Language Picker -->
	<div class="flex justify-end px-4 py-2">
		<div class="flex gap-3 text-sm text-subtle-text">
			<button
				class="hover:text-primary transition-colors {getLocale() === 'en'
					? 'text-primary font-semibold'
					: ''}"
				onclick={() => setLocale('en')}
			>
				English
			</button>
			<span class="text-border">|</span>
			<button
				class="hover:text-primary transition-colors {getLocale() === 'sv'
					? 'text-primary font-semibold'
					: ''}"
				onclick={() => setLocale('sv')}
			>
				Svenska
			</button>
			<span class="text-border">|</span>
			<button
				class="hover:text-primary transition-colors {getLocale() === 'ar'
					? 'text-primary font-semibold'
					: ''}"
				onclick={() => setLocale('ar')}
			>
				العربية
			</button>
		</div>
	</div>

	<!-- Main Content -->
	<main class="flex-1 flex flex-col px-4 py-8 lg:px-8">
		<div class="max-w-2xl mx-auto w-full">
			<!-- Header -->
			<h1 class="text-3xl font-bold text-center mb-2">{m.candidate_headline()}</h1>
			<p class="text-subtle-text text-center mb-8">{m.candidate_description()}</p>

			<!-- Application Form -->
			<form {...submitApplication} class="space-y-6">
				<!-- Personal Information Section -->
				<fieldset class="fieldset">
					<legend class="fieldset-legend text-lg font-semibold">
						{m.candidate_personal_info()}
					</legend>

					<div class="grid gap-4">
						<label class="flex flex-col">
							<span class="label">{m.candidate_name()} *</span>
							<input
								{...submitApplication.fields.name.as('text')}
								class="input"
								placeholder={m.candidate_name_placeholder()}
							/>
							{#each submitApplication.fields.name.issues() as issue (issue.message)}
								<p class="text-sm text-red-600 mt-1">{issue.message}</p>
							{/each}
						</label>

						<label class="flex flex-col">
							<span class="label">{m.candidate_email()} *</span>
							<input
								{...submitApplication.fields.email.as('email')}
								class="input"
								placeholder={m.candidate_email_placeholder()}
							/>
							{#each submitApplication.fields.email.issues() as issue (issue.message)}
								<p class="text-sm text-red-600 mt-1">{issue.message}</p>
							{/each}
						</label>

						<label class="flex flex-col">
							<span class="label">{m.candidate_phone()}</span>
							<input
								{...submitApplication.fields.phone.as('tel')}
								class="input"
								placeholder={m.candidate_phone_placeholder()}
							/>
							{#each submitApplication.fields.phone.issues() as issue (issue.message)}
								<p class="text-sm text-red-600 mt-1">{issue.message}</p>
							{/each}
						</label>

						<label class="flex flex-col">
							<span class="label">{m.candidate_birth_year()} *</span>
							<input
								{...submitApplication.fields.birthYear.as('number')}
								class="input"
								placeholder={m.candidate_birth_year_placeholder()}
							/>
							{#each submitApplication.fields.birthYear.issues() as issue (issue.message)}
								<p class="text-sm text-red-600 mt-1">{issue.message}</p>
							{/each}
						</label>

						<label class="flex flex-col">
							<span class="label">{m.candidate_gender()} *</span>
							<select {...submitApplication.fields.gender.as('select')} class="select">
								<option value="">{m.candidate_gender_select()}</option>
								<option value="man">{m.candidate_gender_man()}</option>
								<option value="woman">{m.candidate_gender_woman()}</option>
							</select>
							{#each submitApplication.fields.gender.issues() as issue (issue.message)}
								<p class="text-sm text-red-600 mt-1">{issue.message}</p>
							{/each}
						</label>

						<label class="flex flex-col">
							<span class="label">{m.candidate_city()} *</span>
							<input
								{...submitApplication.fields.city.as('text')}
								class="input"
								placeholder={m.candidate_city_placeholder()}
							/>
							{#each submitApplication.fields.city.issues() as issue (issue.message)}
								<p class="text-sm text-red-600 mt-1">{issue.message}</p>
							{/each}
						</label>
					</div>
				</fieldset>

				<!-- Profile Information Section -->
				<fieldset class="fieldset">
					<legend class="fieldset-legend text-lg font-semibold">
						{m.candidate_profile_info()}
					</legend>

					<div class="grid gap-4">
						<label class="flex flex-col">
							<span class="label">{m.candidate_occupation()}</span>
							<input
								{...submitApplication.fields.occupation.as('text')}
								class="input"
								placeholder={m.candidate_occupation_placeholder()}
							/>
							{#each submitApplication.fields.occupation.issues() as issue (issue.message)}
								<p class="text-sm text-red-600 mt-1">{issue.message}</p>
							{/each}
						</label>

						<label class="flex flex-col">
							<span class="label">{m.candidate_education()}</span>
							<input
								{...submitApplication.fields.education.as('text')}
								class="input"
								placeholder={m.candidate_education_placeholder()}
							/>
							{#each submitApplication.fields.education.issues() as issue (issue.message)}
								<p class="text-sm text-red-600 mt-1">{issue.message}</p>
							{/each}
						</label>
					</div>

					<label class="flex flex-col mt-4">
						<span class="label">{m.candidate_family_situation()}</span>
						<textarea
							{...submitApplication.fields.familySituation.as('textarea')}
							class="textarea"
							rows="3"
							placeholder={m.candidate_family_situation_placeholder()}
						></textarea>
						{#each submitApplication.fields.familySituation.issues() as issue (issue.message)}
							<p class="text-sm text-red-600 mt-1">{issue.message}</p>
						{/each}
					</label>

					<label class="flex flex-col mt-4">
						<span class="label">{m.candidate_religious_practice()}</span>
						<textarea
							{...submitApplication.fields.religiousPractice.as('textarea')}
							class="textarea"
							rows="3"
							placeholder={m.candidate_religious_practice_placeholder()}
						></textarea>
						{#each submitApplication.fields.religiousPractice.issues() as issue (issue.message)}
							<p class="text-sm text-red-600 mt-1">{issue.message}</p>
						{/each}
					</label>

					<label class="flex flex-col mt-4">
						<span class="label">{m.candidate_housing_situation()}</span>
						<textarea
							{...submitApplication.fields.housingSituation.as('textarea')}
							class="textarea"
							rows="3"
							placeholder={m.candidate_housing_situation_placeholder()}
						></textarea>
						{#each submitApplication.fields.housingSituation.issues() as issue (issue.message)}
							<p class="text-sm text-red-600 mt-1">{issue.message}</p>
						{/each}
					</label>

					<label class="flex flex-col mt-4">
						<span class="label">{m.candidate_intention()}</span>
						<textarea
							{...submitApplication.fields.intention.as('textarea')}
							class="textarea"
							rows="3"
							placeholder={m.candidate_intention_placeholder()}
						></textarea>
						{#each submitApplication.fields.intention.issues() as issue (issue.message)}
							<p class="text-sm text-red-600 mt-1">{issue.message}</p>
						{/each}
					</label>

					<label class="flex flex-col mt-4">
						<span class="label">{m.candidate_about_me()}</span>
						<textarea
							{...submitApplication.fields.aboutMe.as('textarea')}
							class="textarea"
							rows="4"
							placeholder={m.candidate_about_me_placeholder()}
						></textarea>
						{#each submitApplication.fields.aboutMe.issues() as issue (issue.message)}
							<p class="text-sm text-red-600 mt-1">{issue.message}</p>
						{/each}
					</label>
				</fieldset>

				<!-- What You're Seeking Section -->
				<fieldset class="fieldset">
					<legend class="fieldset-legend text-lg font-semibold">{m.candidate_seeking()}</legend>

					<div class="grid gap-4">
						<label class="flex flex-col">
							<span class="label">{m.candidate_seeking_age_min()}</span>
							<input
								{...submitApplication.fields.seekingAgeMin.as('number')}
								class="input"
								placeholder="18"
								min="18"
								max="100"
							/>
							{#each submitApplication.fields.seekingAgeMin.issues() as issue (issue.message)}
								<p class="text-sm text-red-600 mt-1">{issue.message}</p>
							{/each}
						</label>

						<label class="flex flex-col">
							<span class="label">{m.candidate_seeking_age_max()}</span>
							<input
								{...submitApplication.fields.seekingAgeMax.as('number')}
								class="input"
								placeholder="100"
								min="18"
								max="100"
							/>
							{#each submitApplication.fields.seekingAgeMax.issues() as issue (issue.message)}
								<p class="text-sm text-red-600 mt-1">{issue.message}</p>
							{/each}
						</label>

						<label class="flex flex-col">
							<span class="label">{m.candidate_seeking_city()}</span>
							<input
								{...submitApplication.fields.seekingCity.as('text')}
								class="input"
								placeholder={m.candidate_seeking_city_placeholder()}
							/>
							{#each submitApplication.fields.seekingCity.issues() as issue (issue.message)}
								<p class="text-sm text-red-600 mt-1">{issue.message}</p>
							{/each}
						</label>
					</div>
				</fieldset>

				<!-- Submit Button -->
				<div class="pt-4">
					<button
						type="submit"
						class="btn btn-primary w-full h-14 text-lg text-white"
						disabled={!!submitApplication.pending}
					>
						{submitApplication.pending ? m.candidate_submitting() : m.candidate_submit()}
					</button>
				</div>

				<!-- Success/Error Messages -->
				{#if submitApplication.result}
					<p
						class="text-center text-sm {submitApplication.result.success
							? 'text-green-600'
							: 'text-red-600'}"
					>
						{submitApplication.result.message}
					</p>
				{/if}
			</form>

			<!-- Privacy Notice -->
			<p class="text-subtle-text text-xs pt-6 text-center">{m.candidate_privacy_notice()}</p>
		</div>
	</main>
</div>
