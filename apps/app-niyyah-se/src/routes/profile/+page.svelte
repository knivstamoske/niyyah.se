<script lang="ts">
	import { resolve } from '$app/paths';
	import { MapPin, Calendar, User, ArrowRight, Pencil, Heart } from 'lucide-svelte';
	import { STATUS_CONFIG } from '$lib/client/domain/user-status';
	import { getAge, capitalize } from '$lib/shared/utils/formatters';
	import { getGenderLabel, getMaritalStatusLabel } from '$lib/shared/utils/profile-labels';
	import { ACTION_ITEM_MAP } from '$lib/client/domain/action-items';
	import { getActions } from './getActions.remote';
	import { m } from '$lib/i18n/messages.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const status = $derived(STATUS_CONFIG[data.userStatus]);
	const actionItemKeys = $derived(await getActions());
	const actionItems = $derived(actionItemKeys.map((key) => ACTION_ITEM_MAP[key]));
</script>

<div class="space-y-16">
	<!-- Welcome Section -->
	<section class="space-y-6">
	<h1 class="text-4xl md:text-5xl font-light text-taupe tracking-tight">
		{@html m.profile_welcome_back({ name: `<span class="font-semibold text-midnyt">${data.profile?.fullName}</span>` })}
	</h1>
	</section>

	<!-- Status Section -->
	<section class="space-y-4">
	<h2 class="text-sm uppercase tracking-widest text-slate font-medium">
		Current Status
	</h2>
	<div
		class="bg-white border-l-4 border-bronze p-6 flex items-start gap-4 hover:border-bronze/70 transition-colors duration-300"
	>
			<status.icon class="w-6 h-6 {status.color} flex-shrink-0 mt-1" />
		<div class="flex-1">
			<h3 class="text-xl font-semibold text-midnyt mb-1">{status.label}</h3>
			<p class="text-slate leading-relaxed">{status.description}</p>
		</div>
		</div>
	</section>

	<!-- Action Items -->
	<section class="space-y-4">
	<h2 class="text-sm uppercase tracking-widest text-slate font-medium">
		Action Items
	</h2>
		{#if actionItems.length > 0}
			<div class="space-y-3">
				{#each actionItems as item}
					<a
						href={resolve(item.href)}
						class="block group bg-white border border-taupe/20 p-6 hover:border-bronze transition-all duration-300"
					>
						<div class="flex items-center justify-between">
							<div class="flex-1">
								<h3
									class="text-lg font-semibold text-midnyt group-hover:text-bronze transition-colors mb-1"
								>
									{item.title}
								</h3>
								<p class="text-slate">{item.description}</p>
							</div>
					<ArrowRight
						class="w-5 h-5 text-slate group-hover:text-bronze group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"
					/>
						</div>
					</a>
				{/each}
			</div>
		{:else}
		<div
			class="bg-white border border-taupe/20 p-12 text-center hover:border-bronze/50 transition-colors duration-300"
		>
			<p class="text-slate">
				{m.profile_no_action_items()}
			</p>
		</div>
		{/if}
	</section>

	<!-- Profile Information -->
	{#if data.profile}
		<section class="space-y-4">
			<div class="flex items-center justify-between">
				<h2 class="text-sm uppercase tracking-widest text-slate font-medium">
					{m.profile_information()}
				</h2>
				<a
					href="/profile/onboard"
					class="text-sm font-medium text-bronze hover:text-midnyt flex items-center gap-1.5 transition-colors"
				>
					<Pencil class="w-3.5 h-3.5" />
					{m.profile_edit()}
				</a>
			</div>

		<div class="bg-white border border-taupe/20 p-8">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
					<!-- Location -->
					<div class="space-y-2">
					<div class="flex items-center gap-2 text-slate">
						<MapPin class="w-4 h-4 text-bronze" />
						<p class="text-xs uppercase tracking-widest font-medium">{m.profile_location()}</p>
					</div>
					<p class="text-lg font-medium text-midnyt pl-6">
							{capitalize(data.profile.kommun)}
						</p>
					</div>

					<!-- Age -->
					<div class="space-y-2">
					<div class="flex items-center gap-2 text-slate">
						<Calendar class="w-4 h-4 text-bronze" />
						<p class="text-xs uppercase tracking-widest font-medium">{m.profile_age()}</p>
					</div>
					<p class="text-lg font-medium text-midnyt pl-6">
							{m.profile_age_years({ age: getAge(data.profile.birthYear) })}
						</p>
					</div>

					<!-- Gender -->
					<div class="space-y-2">
					<div class="flex items-center gap-2 text-slate">
						<User class="w-4 h-4 text-bronze" />
						<p class="text-xs uppercase tracking-widest font-medium">{m.profile_gender()}</p>
					</div>
					<p class="text-lg font-medium text-midnyt pl-6">
							{getGenderLabel(data.profile.gender)}
						</p>
					</div>

					<!-- Marital Status -->
					<div class="space-y-2">
					<div class="flex items-center gap-2 text-slate">
						<Heart class="w-4 h-4 text-bronze" />
						<p class="text-xs uppercase tracking-widest font-medium">{m.profile_marital_status()}</p>
					</div>
					<p class="text-lg font-medium text-midnyt pl-6">
							{getMaritalStatusLabel(data.profile.maritalStatus)}
						</p>
					</div>
				</div>
			</div>
		</section>
	{:else}
		<section class="space-y-4">
		<h2 class="text-sm uppercase tracking-widest text-slate font-medium">
			{m.profile_information()}
		</h2>
		<div
			class="bg-white border border-taupe/20 p-12 text-center hover:border-bronze/50 transition-colors duration-300"
		>
			<User class="w-12 h-12 text-slate mx-auto mb-4" />
			<p class="text-slate mb-4">{m.profile_incomplete_message()}</p>
			<a
				href={resolve('/profile/onboard')}
				class="inline-flex items-center gap-2 px-6 py-3 bg-midnyt text-white font-medium hover:bg-midnyt/90 transition-colors rounded-md"
			>
				{m.complete_profile_cta()}
				<ArrowRight class="w-4 h-4" />
			</a>
			</div>
		</section>
	{/if}
</div>
