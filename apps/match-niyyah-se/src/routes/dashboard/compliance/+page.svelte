<script lang="ts">
	import type { PageData } from './$types';
	// getBannedCandidates removed, now loaded in +page.server.ts
	import { deleteCandidateData } from './deleteCandidateData.remote';
	import { updateCandidateStatus } from '../candidates/[id]/updateCandidateStatus.remote';
	import { goto } from '$app/navigation';
	import { m } from '$lib/i18n/messages.js';
	import { Trash2, Unlock, Eye, ShieldAlert } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	const banned = $derived(data.banned);

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
	<title>{m.match_compliance_title()} | {m.match_portal_title()}</title>
</svelte:head>

<div class="px-4 py-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold">{m.match_compliance_title()}</h1>
		<p class="text-slate mt-2">{m.match_compliance_subtitle()}</p>
	</div>

	<!-- Banned Candidates -->
	<div class="bg-white border border-taupe/20 rounded-md p-6">
		<h2 class="text-xl font-bold mb-6 flex items-center gap-2">
			<ShieldAlert class="w-5 h-5 text-error" />
			{m.match_compliance_banned_section()}
		</h2>

		{#if banned.length === 0}
			<div class="text-center py-12 flex flex-col items-center gap-2">
				<p class="text-slate">{m.match_compliance_no_banned()}</p>
			</div>
		{:else}
			<div class="mb-4 text-sm text-slate">
				{m.match_compliance_banned_count({
					count: banned.length,
					plural: banned.length !== 1 ? 's' : ''
				})}
			</div>

			<div class="space-y-4">
				{#each banned as candidate (candidate.id)}
					<div class="bg-cream/50 border border-taupe/10 rounded-md p-4">
						<div class="flex justify-between items-start mb-3">
							<div>
								<h3 class="font-bold">{candidate.name}</h3>
								<p class="text-sm text-slate">{candidate.email}</p>
							</div>
							<button
								onclick={() => handleViewProfile(candidate.id)}
								class="text-bronze hover:underline text-sm font-medium flex items-center gap-1"
							>
								<Eye class="w-3.5 h-3.5" />
								{m.match_action_view()}
							</button>
						</div>

						<div class="grid grid-cols-4 gap-4 mb-4 text-sm">
							<div>
								<div class="text-xs text-slate mb-1">{m.match_table_age()}</div>
								<div class="font-medium">{calculateAge(candidate.birthYear)}</div>
							</div>
							<div>
								<div class="text-xs text-slate mb-1">{m.match_table_gender()}</div>
								<div class="font-medium capitalize">
									{candidate.gender === 'male'
										? m.gender_male_capitalized()
										: m.gender_female_capitalized()}
								</div>
							</div>
							<div>
								<div class="text-xs text-slate mb-1">{m.match_table_kommun()}</div>
								<div class="font-medium">{candidate.kommun}</div>
							</div>
							<div>
								<div class="text-xs text-slate mb-1">{m.match_compliance_banned_on()}</div>
								<div class="font-medium">{formatDate(candidate.updatedAt)}</div>
							</div>
						</div>

						<div class="flex gap-3">
							<button
								onclick={() => handleUnban(candidate.id, candidate.name)}
								disabled={unbanningIds.has(candidate.id)}
								class="bg-success text-white px-4 py-2 rounded-md hover:bg-success/90 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
							>
								{#if unbanningIds.has(candidate.id)}
									<span
										class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"
									></span>
									{m.match_action_unbanning()}
								{:else}
									<Unlock class="w-3.5 h-3.5" />
									{m.match_action_unban()}
								{/if}
							</button>
							<button
								onclick={() => handleDeleteData(candidate.id, candidate.name)}
								disabled={deletingIds.has(candidate.id)}
								class="bg-error text-white px-4 py-2 rounded-md hover:bg-error/90 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
							>
								{#if deletingIds.has(candidate.id)}
									<span
										class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"
									></span>
									{m.match_action_deleting()}
								{:else}
									<Trash2 class="w-3.5 h-3.5" />
									{m.match_action_delete_gdpr()}
								{/if}
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
