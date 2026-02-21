<script lang="ts">
	import type { PageData } from './$types';
	import { getFacilitatorProfile } from './getFacilitatorProfile.remote';
	import { goto } from '$app/navigation';
	import { m } from '$lib/i18n/messages.js';
	import { ArrowLeft, User, Mail, Calendar, CheckCircle, AlertTriangle } from 'lucide-svelte';

	let { params }: { params: { id: string } } = $props();

	/**
	 * facilitatorQuery is the reactive query for a single facilitator's profile.
	 */
	const facilitatorQuery = $derived(getFacilitatorProfile(params.id));

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
	<title>{m.admin_fac_profile_title()} | {m.admin_portal_title()}</title>
</svelte:head>

<div class="px-4 py-8">
	{#await facilitatorQuery}
		<!-- Loading state -->
		<div class="text-center py-12">
			<p class="text-slate">{m.admin_fac_loading()}</p>
		</div>
	{:then facilitator}
		<!-- Header -->
		<div class="mb-8">
			<button
				onclick={() => goto('/dashboard/facilitators')}
				class="text-bronze hover:underline text-sm font-medium mb-4 flex items-center gap-1"
			>
				<ArrowLeft class="w-4 h-4" />
				{m.admin_fac_profile_back()}
			</button>

			<div class="flex justify-between items-start">
				<div>
					<h1 class="text-3xl font-bold flex items-center gap-3">
						{facilitator.name}
					</h1>
					<p class="text-slate mt-2 flex items-center gap-4 text-sm">
						<span class="flex items-center gap-1">
							<Mail class="w-4 h-4" />
							{facilitator.email}
						</span>
						{#if facilitator.emailVerified}
							<span class="flex items-center gap-1 text-success">
								<CheckCircle class="w-4 h-4" />
								{m.admin_profile_email_verified()}
							</span>
						{:else}
							<span class="flex items-center gap-1 text-warning">
								<AlertTriangle class="w-4 h-4" />
								{m.admin_fac_profile_email_verified()} —
								{m.admin_fac_profile_no()}
							</span>
						{/if}
					</p>
				</div>
			</div>
		</div>

		<!-- Profile Content -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Left Column: Account Info -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Account Information Card -->
				<div class="bg-white border border-taupe/20 rounded-md p-6">
					<h2 class="text-xl font-bold mb-4 flex items-center gap-2">
						<User class="w-5 h-5 text-bronze" />
						{m.admin_fac_profile_account_info()}
					</h2>
					<div class="grid grid-cols-2 gap-6 text-sm">
						<div>
							<div class="text-xs text-slate mb-1">{m.admin_fac_name()}</div>
							<div class="font-medium text-midnyt">{facilitator.name}</div>
						</div>
						<div>
							<div class="text-xs text-slate mb-1">{m.admin_fac_email()}</div>
							<div class="font-medium text-midnyt">{facilitator.email}</div>
						</div>
						<div>
							<div class="text-xs text-slate mb-1">{m.admin_fac_profile_email_verified()}</div>
							<div class="font-medium">
								{#if facilitator.emailVerified}
									<span class="text-success flex items-center gap-1">
										<CheckCircle class="w-3.5 h-3.5" />
										{m.admin_fac_profile_yes()}
									</span>
								{:else}
									<span class="text-warning flex items-center gap-1">
										<AlertTriangle class="w-3.5 h-3.5" />
										{m.admin_fac_profile_no()}
									</span>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Column: Dates -->
			<div class="space-y-6">
				<!-- Dates Card -->
				<div class="bg-white border border-taupe/20 rounded-md p-6">
					<h2 class="text-xl font-bold mb-4 flex items-center gap-2">
						<Calendar class="w-5 h-5 text-bronze" />
						{m.admin_fac_profile_dates()}
					</h2>
					<div class="space-y-3">
						<div>
							<div class="text-sm text-slate mb-1">{m.admin_fac_profile_registered()}</div>
							<div class="text-sm font-medium text-midnyt">
								{formatDate(facilitator.createdAt)}
							</div>
						</div>
						<div>
							<div class="text-sm text-slate mb-1">{m.admin_fac_profile_updated()}</div>
							<div class="text-sm font-medium text-midnyt">
								{formatDate(facilitator.updatedAt)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:catch}
		<!-- Error state -->
		<button
			onclick={() => goto('/dashboard/facilitators')}
			class="text-bronze hover:underline text-sm font-medium mb-4 flex items-center gap-1"
		>
			<ArrowLeft class="w-4 h-4" />
			{m.admin_fac_profile_back()}
		</button>
		<div class="bg-cream border-l-4 border-error p-4">
			<p class="text-sm text-error">{m.admin_fac_profile_not_found()}</p>
		</div>
	{/await}
</div>
