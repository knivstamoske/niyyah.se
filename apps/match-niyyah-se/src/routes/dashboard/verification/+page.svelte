<script lang="ts">
	import type { PageData } from './$types';
	// getCandidates removed, now loaded in +page.server.ts
	import { updateCandidateStatus } from '../candidates/[id]/updateCandidateStatus.remote';
	import { goto } from '$app/navigation';
	import { m } from '$lib/i18n/messages.js';
	import { ArrowLeft, Check, X, CheckCircle, Eye } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	const candidates = $derived(data.candidates);

	// ... (rest of script remains mostly same, remove filters definition if unused or keep for consistency)

	// Since filters are handled in server load, we might not need them here unless for UI state.
    // But data is already loaded.

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
	<title>{m.match_verification_title()} | {m.match_portal_title()}</title>
</svelte:head>

<div class="px-4 py-8">
	<!-- Header -->
	<div class="mb-8">
		<button
			onclick={() => goto('/dashboard/candidates')}
			class="text-bronze hover:underline text-sm font-medium mb-4 flex items-center gap-1"
		>
			<ArrowLeft class="w-4 h-4" />
			{m.match_verification_back()}
		</button>
		<h1 class="text-3xl font-bold">{m.match_verification_title()}</h1>
		<p class="text-slate mt-2">{m.match_verification_subtitle()}</p>
	</div>

	<!-- Verification Queue -->
	{#if candidates.length === 0}
		<div
			class="text-center py-12 bg-cream border border-taupe/20 rounded-md flex flex-col items-center gap-4"
		>
			<CheckCircle class="w-12 h-12 text-success/50" />
			<div>
				<p class="text-slate font-medium">{m.match_verification_empty()}</p>
				<p class="text-slate text-sm mt-1">{m.match_verification_empty_message()}</p>
			</div>
		</div>
	{:else}
		<div class="mb-4 text-sm text-slate">
			{m.match_verification_count({
				count: candidates.length,
				plural: candidates.length !== 1 ? 's' : ''
			})}
		</div>

		<div class="space-y-4">
			{#each candidates as candidate (candidate.id)}
				<div class="bg-white border border-taupe/20 rounded-md p-6">
					<div class="flex justify-between items-start mb-4">
						<div>
							<div class="flex items-center gap-2">
								<h2 class="text-xl font-bold">{candidate.name}</h2>
								{#if candidate.emailVerified}
									<div title="Email Verified">
										<CheckCircle class="w-4 h-4 text-success" />
									</div>
								{/if}
							</div>
							<p class="text-sm text-slate mt-1">{candidate.email}</p>
						</div>
						<div class="flex gap-2">
							<button
								onclick={() => handleViewProfile(candidate.id)}
								class="px-4 py-2 bg-cream text-midnyt rounded-md hover:bg-cream/80 transition-colors text-sm font-medium flex items-center gap-2"
							>
								<Eye class="w-4 h-4" />
								{m.match_verification_view_profile()}
							</button>
						</div>
					</div>

					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
						<div>
							<div class="text-xs text-slate mb-1">{m.match_table_age()}</div>
							<div class="font-medium text-midnyt">{calculateAge(candidate.birthYear)}</div>
						</div>
						<div>
							<div class="text-xs text-slate mb-1">{m.match_table_gender()}</div>
							<div class="font-medium capitalize text-midnyt">
								{candidate.gender === 'male'
									? m.gender_male_capitalized()
									: m.gender_female_capitalized()}
							</div>
						</div>
						<div>
							<div class="text-xs text-slate mb-1">{m.match_profile_marital_status()}</div>
							<div class="font-medium capitalize text-midnyt">{candidate.maritalStatus}</div>
						</div>
						<div>
							<div class="text-xs text-slate mb-1">{m.match_table_kommun()}</div>
							<div class="font-medium text-midnyt">{candidate.kommun}</div>
						</div>
					</div>

					<div class="mb-4 text-xs text-slate">
						{m.match_profile_registered()}: {formatDate(candidate.createdAt)}
					</div>

					<div class="flex gap-3">
						<button
							onclick={() => handleApprove(candidate.id)}
							disabled={approvingIds.has(candidate.id)}
							class="bg-midnyt text-white px-6 py-2 rounded-md hover:bg-midnyt/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
						>
							{#if approvingIds.has(candidate.id)}
								<span
									class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
								></span>
								{m.match_action_approving()}
							{:else}
								<Check class="w-4 h-4" />
								{m.match_action_approve()}
							{/if}
						</button>
						<button
							onclick={() => handleReject(candidate.id, candidate.name)}
							disabled={rejectingIds.has(candidate.id)}
							class="bg-white border border-taupe/20 text-midnyt px-6 py-2 rounded-md hover:bg-cream transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
						>
							{#if rejectingIds.has(candidate.id)}
								<span
									class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
								></span>
								{m.match_action_rejecting()}
							{:else}
								<X class="w-4 h-4" />
								{m.match_action_reject()}
							{/if}
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
