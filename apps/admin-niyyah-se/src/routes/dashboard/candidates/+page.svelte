<script lang="ts">
	import { getCandidates } from './getCandidates.remote';
	import { goto } from '$app/navigation';
	import { m } from '$lib/i18n/messages.js';
	import { page } from '$app/state';
	import { Search, Filter, SlidersHorizontal, Eye } from 'lucide-svelte';

	/**
	 * STATUS_OPTIONS are the available status filter options.
	 */
	const STATUS_OPTIONS = [
		{ value: 'all', label: () => m.admin_filter_all_statuses() },
		{ value: 'onboarding', label: () => m.admin_status_onboarding() },
		{ value: 'verifying', label: () => m.admin_status_verifying() },
		{ value: 'active', label: () => m.admin_status_active() },
		{ value: 'paused', label: () => m.admin_status_paused() },
		{ value: 'matching', label: () => m.admin_status_matching() },
		{ value: 'matched', label: () => m.admin_status_matched() },
		{ value: 'archived', label: () => m.admin_status_archived() },
		{ value: 'banned', label: () => m.admin_status_banned() }
	];

	/**
	 * GENDER_OPTIONS are the available gender filter options.
	 */
	const GENDER_OPTIONS = [
		{ value: 'all', label: () => m.admin_filter_all_genders() },
		{ value: 'male', label: () => m.gender_male_capitalized() },
		{ value: 'female', label: () => m.gender_female_capitalized() }
	];

	/**
	 * STATUS_BADGES maps status values to badge styling.
	 */
	const STATUS_BADGES: Record<string, string> = {
		onboarding: 'bg-slate/20 text-slate',
		verifying: 'bg-warning/20 text-warning',
		active: 'bg-success/20 text-success',
		paused: 'bg-taupe/20 text-taupe',
		matching: 'bg-bronze/20 text-bronze',
		matched: 'bg-bronze/20 text-bronze',
		archived: 'bg-slate/20 text-slate',
		banned: 'bg-error/20 text-error'
	};

	let searchTerm = $state('');
	let statusFilter = $state(page.url.searchParams.get('status') || 'all');
	let genderFilter = $state('all');

	/**
	 * filters is a derived reactive value combining all filter inputs.
	 */
	const filters = $derived({
		status: statusFilter as any,
		gender: genderFilter as any,
		search: searchTerm
	});

	/**
	 * handleViewCandidate navigates to the candidate profile page.
	 */
	function handleViewCandidate(candidateId: string) {
		goto(`/dashboard/candidates/${candidateId}`);
	}

	/**
	 * calculateAge computes current age from birth year.
	 */
	function calculateAge(birthYear: number): number {
		return new Date().getFullYear() - birthYear;
	}

	/**
	 * formatDate formats a date to a readable string.
	 */
	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{m.admin_candidates_title()} | {m.admin_portal_title()}</title>
</svelte:head>

<div class="px-4 py-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold">{m.admin_candidates_title()}</h1>
		<p class="text-slate mt-2">{m.admin_candidates_subtitle()}</p>
	</div>

	<!-- Filters -->
	<div class="bg-white border border-taupe/20 rounded-md p-6 mb-6">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<!-- Search -->
			<div class="relative">
				<label for="search" class="block text-sm font-medium mb-2">{m.admin_search_label()}</label>
				<div class="relative">
					<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Search class="h-4 w-4 text-slate" />
					</div>
					<input
						id="search"
						type="text"
						bind:value={searchTerm}
						placeholder={m.admin_search_placeholder()}
						class="w-full pl-10 pr-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
					/>
				</div>
			</div>

			<!-- Status Filter -->
			<div>
				<label for="status" class="block text-sm font-medium mb-2 flex items-center gap-2">
					<Filter class="w-3.5 h-3.5" />
					{m.admin_filter_status()}
				</label>
				<select
					id="status"
					bind:value={statusFilter}
					class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
				>
					{#each STATUS_OPTIONS as option}
						<option value={option.value}>{option.label()}</option>
					{/each}
				</select>
			</div>

			<!-- Gender Filter -->
			<div>
				<label for="gender" class="block text-sm font-medium mb-2 flex items-center gap-2">
					<SlidersHorizontal class="w-3.5 h-3.5" />
					{m.admin_filter_gender()}
				</label>
				<select
					id="gender"
					bind:value={genderFilter}
					class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
				>
					{#each GENDER_OPTIONS as option}
						<option value={option.value}>{option.label()}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<!-- Candidates List -->
	{#await getCandidates(filters)}
		<div class="text-center py-12">
			<p class="text-slate">{m.admin_loading_candidates()}</p>
		</div>
	{:then candidates}
		{#if candidates.length === 0}
			<div class="text-center py-12 bg-cream border border-taupe/20 rounded-md">
				<p class="text-slate">{m.admin_no_candidates()}</p>
			</div>
		{:else}
			<div class="bg-white border border-taupe/20 rounded-md overflow-hidden">
				<table class="w-full">
					<thead class="bg-cream border-b border-taupe/20">
						<tr>
							<th class="px-4 py-3 text-left text-sm font-medium">{m.admin_table_name()}</th>
							<th class="px-4 py-3 text-left text-sm font-medium hidden md:table-cell"
								>{m.admin_table_email()}</th
							>
							<th class="px-4 py-3 text-left text-sm font-medium">{m.admin_table_age()}</th>
							<th class="px-4 py-3 text-left text-sm font-medium hidden sm:table-cell"
								>{m.admin_table_gender()}</th
							>
							<th class="px-4 py-3 text-left text-sm font-medium hidden md:table-cell"
								>{m.admin_table_kommun()}</th
							>
							<th class="px-4 py-3 text-left text-sm font-medium">{m.admin_table_status()}</th>
							<th class="px-4 py-3 text-left text-sm font-medium hidden lg:table-cell"
								>{m.admin_table_registered()}</th
							>
							<th class="px-4 py-3 text-left text-sm font-medium">{m.admin_table_actions()}</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-taupe/10">
						{#each candidates as candidate}
							<tr class="hover:bg-cream/50 transition-colors">
								<td class="px-4 py-3 text-sm font-medium">{candidate.name}</td>
								<td class="px-4 py-3 text-sm text-slate hidden md:table-cell">{candidate.email}</td>
								<td class="px-4 py-3 text-sm">{calculateAge(candidate.birthYear)}</td>
								<td class="px-4 py-3 text-sm capitalize hidden sm:table-cell">{candidate.gender}</td
								>
								<td class="px-4 py-3 text-sm hidden md:table-cell">{candidate.kommun}</td>
								<td class="px-4 py-3">
									<span
										class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium {STATUS_BADGES[
											candidate.status
										]}"
									>
										{candidate.status}
									</span>
								</td>
								<td class="px-4 py-3 text-sm text-slate hidden lg:table-cell"
									>{formatDate(candidate.createdAt)}</td
								>
								<td class="px-4 py-3">
									<button
										onclick={() => handleViewCandidate(candidate.id)}
										class="text-bronze hover:underline text-sm font-medium inline-flex items-center gap-1"
									>
										<Eye class="w-3.5 h-3.5" />
										{m.admin_action_view()}
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="mt-4 text-sm text-slate text-center">
				{m.admin_showing_count({
					count: candidates.length,
					plural: candidates.length !== 1 ? 's' : ''
				})}
			</div>
		{/if}
	{:catch error}
		<div class="bg-cream border-l-4 border-error p-4">
			<p class="text-sm text-error">{m.admin_error_load_candidates()}</p>
		</div>
	{/await}
</div>
