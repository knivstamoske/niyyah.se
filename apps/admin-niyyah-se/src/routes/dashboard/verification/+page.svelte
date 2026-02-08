<script lang="ts">
	import { getCandidates } from '../candidates/getCandidates.remote';
	import { updateCandidateStatus } from '../candidates/[id]/updateCandidateStatus.remote';
	import { goto } from '$app/navigation';

	/**
	 * filters is the static filter for pending verification candidates.
	 */
	const filters = { status: 'verifying' as any, gender: 'all' as any, search: '' };

	let approvingIds = $state(new Set<string>());
	let rejectingIds = $state(new Set<string>());

	/**
	 * handleApprove approves a candidate by moving them to active status.
	 */
	async function handleApprove(profileId: string) {
		approvingIds.add(profileId);
		try {
			await updateCandidateStatus({
				profileId,
				newStatus: 'active',
				reason: 'Verified and approved by admin'
			});
			// Reload to show updated list
			window.location.reload();
		} catch (error) {
			alert('Failed to approve candidate');
			console.error(error);
		} finally {
			approvingIds.delete(profileId);
		}
	}

	/**
	 * handleReject rejects a candidate by moving them to banned status.
	 */
	async function handleReject(profileId: string, name: string) {
		const reason = prompt(`Reject ${name}?\n\nPlease provide a reason:`);
		if (!reason) return;

		rejectingIds.add(profileId);
		try {
			await updateCandidateStatus({
				profileId,
				newStatus: 'banned',
				reason
			});
			// Reload to show updated list
			window.location.reload();
		} catch (error) {
			alert('Failed to reject candidate');
			console.error(error);
		} finally {
			rejectingIds.delete(profileId);
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
	<title>Verification Queue | Admin Portal</title>
</svelte:head>

<div class="min-h-screen bg-white text-midnyt">
	<div class="mx-auto max-w-7xl px-4 py-8">
		<!-- Header -->
		<div class="mb-8">
			<button
				onclick={() => goto('/dashboard/candidates')}
				class="text-bronze hover:underline text-sm font-medium mb-4"
			>
				← Back to Candidates
			</button>
			<h1 class="text-3xl font-bold">Verification Queue</h1>
			<p class="text-slate mt-2">Approve or reject candidates awaiting manual verification</p>
		</div>

		<!-- Verification Queue -->
		{#await getCandidates(filters)}
			<div class="text-center py-12">
				<p class="text-slate">Loading verification queue...</p>
			</div>
		{:then candidates}
			{#if candidates.length === 0}
				<div class="text-center py-12 bg-cream border border-taupe/20 rounded-md">
					<p class="text-slate">No candidates pending verification</p>
					<p class="text-slate text-sm mt-2">All caught up! 🎉</p>
				</div>
			{:else}
				<div class="mb-4 text-sm text-slate">
					{candidates.length} candidate{candidates.length !== 1 ? 's' : ''} awaiting verification
				</div>

				<div class="space-y-4">
					{#each candidates as candidate}
						<div class="bg-white border border-taupe/20 rounded-md p-6">
							<div class="flex justify-between items-start mb-4">
								<div>
									<h2 class="text-xl font-bold">{candidate.name}</h2>
									<p class="text-sm text-slate mt-1">{candidate.email}</p>
								</div>
								<div class="flex gap-2">
									<button
										onclick={() => handleViewProfile(candidate.id)}
										class="px-4 py-2 bg-cream text-midnyt rounded-md hover:bg-cream/80 transition-colors text-sm font-medium"
									>
										View Full Profile
									</button>
								</div>
							</div>

							<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
								<div>
									<div class="text-xs text-slate mb-1">Age</div>
									<div class="text-sm font-medium">{calculateAge(candidate.birthYear)} years old</div>
								</div>
								<div>
									<div class="text-xs text-slate mb-1">Gender</div>
									<div class="text-sm font-medium capitalize">{candidate.gender}</div>
								</div>
								<div>
									<div class="text-xs text-slate mb-1">Marital Status</div>
									<div class="text-sm font-medium capitalize">{candidate.maritalStatus}</div>
								</div>
								<div>
									<div class="text-xs text-slate mb-1">Kommun</div>
									<div class="text-sm font-medium">{candidate.kommun}</div>
								</div>
							</div>

							<div class="mb-4 text-xs text-slate">
								Registered: {formatDate(candidate.createdAt)}
							</div>

							<div class="flex gap-3">
								<button
									onclick={() => handleApprove(candidate.id)}
									disabled={approvingIds.has(candidate.id)}
									class="bg-success text-white px-6 py-2 rounded-md hover:bg-success/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{approvingIds.has(candidate.id) ? 'Approving...' : 'Approve'}
								</button>
								<button
									onclick={() => handleReject(candidate.id, candidate.name)}
									disabled={rejectingIds.has(candidate.id)}
									class="bg-error text-white px-6 py-2 rounded-md hover:bg-error/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{rejectingIds.has(candidate.id) ? 'Rejecting...' : 'Reject'}
								</button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		{:catch error}
			<div class="bg-cream border-l-4 border-error p-4">
				<p class="text-sm text-error">Failed to load verification queue</p>
			</div>
		{/await}
	</div>
</div>
