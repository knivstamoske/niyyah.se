<script lang="ts">
	import { getCandidates } from './getCandidates.remote';
	import { goto } from '$app/navigation';

	/**
	 * STATUS_OPTIONS are the available status filter options.
	 */
	const STATUS_OPTIONS = [
		{ value: 'all', label: 'All Statuses' },
		{ value: 'onboarding', label: 'Onboarding' },
		{ value: 'verifying', label: 'Pending Verification' },
		{ value: 'active', label: 'Active' },
		{ value: 'paused', label: 'Paused' },
		{ value: 'matched', label: 'Matched' },
		{ value: 'archived', label: 'Archived' },
		{ value: 'banned', label: 'Banned' }
	];

	/**
	 * GENDER_OPTIONS are the available gender filter options.
	 */
	const GENDER_OPTIONS = [
		{ value: 'all', label: 'All Genders' },
		{ value: 'male', label: 'Male' },
		{ value: 'female', label: 'Female' }
	];

	/**
	 * STATUS_BADGES maps status values to badge styling.
	 */
	const STATUS_BADGES: Record<string, string> = {
		onboarding: 'bg-slate/20 text-slate',
		verifying: 'bg-warning/20 text-warning',
		active: 'bg-success/20 text-success',
		paused: 'bg-taupe/20 text-taupe',
		matched: 'bg-bronze/20 text-bronze',
		archived: 'bg-slate/20 text-slate',
		banned: 'bg-error/20 text-error'
	};

	let searchTerm = $state('');
	let statusFilter = $state('all');
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
	<title>Candidates | Admin Portal</title>
</svelte:head>

<div class="min-h-screen bg-white text-midnyt">
	<div class="mx-auto max-w-7xl px-4 py-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold">Candidate Directory</h1>
			<p class="text-slate mt-2">View and manage all registered candidates</p>
		</div>

		<!-- Filters -->
		<div class="bg-cream border border-taupe/20 rounded-md p-6 mb-6">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<!-- Search -->
				<div>
					<label for="search" class="block text-sm font-medium mb-2">Search</label>
					<input
						id="search"
						type="text"
						bind:value={searchTerm}
						placeholder="Name, email, or kommun"
						class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
					/>
				</div>

				<!-- Status Filter -->
				<div>
					<label for="status" class="block text-sm font-medium mb-2">Status</label>
					<select
						id="status"
						bind:value={statusFilter}
						class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
					>
						{#each STATUS_OPTIONS as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</div>

				<!-- Gender Filter -->
				<div>
					<label for="gender" class="block text-sm font-medium mb-2">Gender</label>
					<select
						id="gender"
						bind:value={genderFilter}
						class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
					>
						{#each GENDER_OPTIONS as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<!-- Candidates List -->
		{#await getCandidates(filters)}
			<div class="text-center py-12">
				<p class="text-slate">Loading candidates...</p>
			</div>
		{:then candidates}
			{#if candidates.length === 0}
				<div class="text-center py-12 bg-cream border border-taupe/20 rounded-md">
					<p class="text-slate">No candidates found matching your filters</p>
				</div>
			{:else}
				<div class="bg-white border border-taupe/20 rounded-md overflow-hidden">
					<table class="w-full">
						<thead class="bg-cream border-b border-taupe/20">
							<tr>
								<th class="px-4 py-3 text-left text-sm font-medium">Name</th>
								<th class="px-4 py-3 text-left text-sm font-medium">Email</th>
								<th class="px-4 py-3 text-left text-sm font-medium">Age</th>
								<th class="px-4 py-3 text-left text-sm font-medium">Gender</th>
								<th class="px-4 py-3 text-left text-sm font-medium">Kommun</th>
								<th class="px-4 py-3 text-left text-sm font-medium">Status</th>
								<th class="px-4 py-3 text-left text-sm font-medium">Registered</th>
								<th class="px-4 py-3 text-left text-sm font-medium">Actions</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-taupe/10">
							{#each candidates as candidate}
								<tr class="hover:bg-cream/50 transition-colors">
									<td class="px-4 py-3 text-sm font-medium">{candidate.name}</td>
									<td class="px-4 py-3 text-sm text-slate">{candidate.email}</td>
									<td class="px-4 py-3 text-sm">{calculateAge(candidate.birthYear)}</td>
									<td class="px-4 py-3 text-sm capitalize">{candidate.gender}</td>
									<td class="px-4 py-3 text-sm">{candidate.kommun}</td>
									<td class="px-4 py-3">
										<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium {STATUS_BADGES[candidate.status]}">
											{candidate.status}
										</span>
									</td>
									<td class="px-4 py-3 text-sm text-slate">{formatDate(candidate.createdAt)}</td>
									<td class="px-4 py-3">
										<button
											onclick={() => handleViewCandidate(candidate.id)}
											class="text-bronze hover:underline text-sm font-medium"
										>
											View
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div class="mt-4 text-sm text-slate text-center">
					Showing {candidates.length} candidate{candidates.length !== 1 ? 's' : ''}
				</div>
			{/if}
		{:catch error}
			<div class="bg-cream border-l-4 border-error p-4">
				<p class="text-sm text-error">Failed to load candidates</p>
			</div>
		{/await}
	</div>
</div>
