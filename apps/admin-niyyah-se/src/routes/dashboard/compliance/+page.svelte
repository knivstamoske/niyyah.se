<script lang="ts">
	import { getBannedCandidates } from './getBannedCandidates.remote';
	import { deleteCandidateData } from './deleteCandidateData.remote';
	import { updateCandidateStatus } from '../candidates/[id]/updateCandidateStatus.remote';
	import { goto } from '$app/navigation';

	let deletingIds = $state(new Set<string>());
	let unbanningIds = $state(new Set<string>());

	/**
	 * handleDeleteData permanently deletes a candidate's data.
	 */
	async function handleDeleteData(profileId: string, name: string) {
		const confirmed = confirm(
			`⚠️ PERMANENT DELETION\n\nThis will permanently delete all data for ${name}.\n\nThis action CANNOT be undone.\n\nContinue?`
		);
		if (!confirmed) return;

		const reason = prompt('Provide a reason for deletion (required for audit):');
		if (!reason) return;

		deletingIds.add(profileId);
		try {
			await deleteCandidateData({ profileId, reason });
			// Reload to show updated list
			window.location.reload();
		} catch (error) {
			alert('Failed to delete candidate data');
			console.error(error);
		} finally {
			deletingIds.delete(profileId);
		}
	}

	/**
	 * handleUnban restores a banned candidate to active status.
	 */
	async function handleUnban(profileId: string, name: string) {
		const reason = prompt(`Unban ${name}?\n\nProvide a reason for unbanning:`);
		if (!reason) return;

		unbanningIds.add(profileId);
		try {
			await updateCandidateStatus({
				profileId,
				newStatus: 'active',
				reason
			});
			// Reload to show updated list
			window.location.reload();
		} catch (error) {
			alert('Failed to unban candidate');
			console.error(error);
		} finally {
			unbanningIds.delete(profileId);
		}
	}

	/**
	 * handleViewProfile navigates to the candidate profile page.
	 */
	function handleViewProfile(candidateId: string) {
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
	<title>Compliance | Admin Portal</title>
</svelte:head>

<div class="min-h-screen bg-white text-midnyt">
	<div class="mx-auto max-w-7xl px-4 py-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold">Compliance Management</h1>
			<p class="text-slate mt-2">Ban management and GDPR data deletion</p>
		</div>

		<!-- Banned Candidates -->
		<div class="bg-white border border-taupe/20 rounded-md p-6">
			<h2 class="text-xl font-bold mb-6">Banned Candidates</h2>

			{#await getBannedCandidates()}
				<div class="text-center py-8">
					<p class="text-slate">Loading banned candidates...</p>
				</div>
			{:then banned}
				{#if banned.length === 0}
					<p class="text-slate text-center py-8">No banned candidates</p>
				{:else}
					<div class="mb-4 text-sm text-slate">
						{banned.length} banned candidate{banned.length !== 1 ? 's' : ''}
					</div>

					<div class="space-y-4">
						{#each banned as candidate}
							<div class="bg-cream/50 border border-taupe/10 rounded-md p-4">
								<div class="flex justify-between items-start mb-3">
									<div>
										<h3 class="font-bold">{candidate.name}</h3>
										<p class="text-sm text-slate">{candidate.email}</p>
									</div>
									<button
										onclick={() => handleViewProfile(candidate.id)}
										class="text-bronze hover:underline text-sm font-medium"
									>
										View Profile
									</button>
								</div>

								<div class="grid grid-cols-4 gap-4 mb-4 text-sm">
									<div>
										<div class="text-xs text-slate mb-1">Age</div>
										<div class="font-medium">{calculateAge(candidate.birthYear)}</div>
									</div>
									<div>
										<div class="text-xs text-slate mb-1">Gender</div>
										<div class="font-medium capitalize">{candidate.gender}</div>
									</div>
									<div>
										<div class="text-xs text-slate mb-1">Kommun</div>
										<div class="font-medium">{candidate.kommun}</div>
									</div>
									<div>
										<div class="text-xs text-slate mb-1">Banned On</div>
										<div class="font-medium">{formatDate(candidate.updatedAt)}</div>
									</div>
								</div>

								<div class="flex gap-3">
									<button
										onclick={() => handleUnban(candidate.id, candidate.name)}
										disabled={unbanningIds.has(candidate.id)}
										class="bg-success text-white px-4 py-2 rounded-md hover:bg-success/90 transition-colors text-sm font-medium disabled:opacity-50"
									>
										{unbanningIds.has(candidate.id) ? 'Unbanning...' : 'Unban'}
									</button>
									<button
										onclick={() => handleDeleteData(candidate.id, candidate.name)}
										disabled={deletingIds.has(candidate.id)}
										class="bg-error text-white px-4 py-2 rounded-md hover:bg-error/90 transition-colors text-sm font-medium disabled:opacity-50"
									>
										{deletingIds.has(candidate.id) ? 'Deleting...' : 'Delete Data (GDPR)'}
									</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			{:catch error}
				<div class="bg-cream border-l-4 border-error p-4">
					<p class="text-sm text-error">Failed to load banned candidates</p>
				</div>
			{/await}
		</div>
	</div>
</div>
