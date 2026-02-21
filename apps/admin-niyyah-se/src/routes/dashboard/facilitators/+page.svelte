<script lang="ts">
	import { getFacilitators } from './getFacilitators.remote.js';
	import { addFacilitator } from './addFacilitator.remote.js';
	import { goto } from '$app/navigation';
	import { m } from '$lib/i18n/messages.js';
	import { Plus, Check, Mail, User as UserIcon, Eye } from 'lucide-svelte';

	/**
	 * facilitatorsQuery is the reactive query for the facilitators list.
	 */
	const facilitatorsQuery = getFacilitators();

	/**
	 * facilitators is a derived list from the query result, defaulting to empty array.
	 */
	const facilitators = $derived(facilitatorsQuery.current ?? []);

	let showAddModal = $state(false);

	$effect(() => {
		if (addFacilitator.result?.success) {
			setTimeout(() => {
				showAddModal = false;
			}, 1500);
		}
	});

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

	/**
	 * handleViewFacilitator navigates to the facilitator profile page.
	 */
	function handleViewFacilitator(facilitatorId: string) {
		goto(`/dashboard/facilitators/${facilitatorId}`);
	}
</script>

<svelte:head>
	<title>{m.admin_fac_title()} | {m.admin_portal_title()}</title>
</svelte:head>

<div class="px-4 py-8">
	<!-- Header -->
	<div class="mb-8 flex justify-between items-center">
		<div>
			<h1 class="text-3xl font-bold">{m.admin_fac_title()}</h1>
			<p class="text-slate mt-2">{m.admin_fac_subtitle()}</p>
		</div>
		<button
			onclick={() => { showAddModal = true; }}
			class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-bronze text-white text-sm font-medium rounded-md hover:bg-bronze/90 focus:outline-none focus:ring-2 focus:ring-bronze/20 transition-colors"
		>
			<Plus class="w-4 h-4" />
			{m.admin_fac_add()}
		</button>
	</div>

	<!-- Facilitators List -->
	{#if facilitatorsQuery.loading}
		<div class="text-center py-12">
			<p class="text-slate">{m.admin_fac_loading()}</p>
		</div>
	{:else if facilitatorsQuery.error}
		<div class="bg-cream border-l-4 border-error p-4">
			<p class="text-sm text-error">{m.admin_fac_error()}</p>
		</div>
	{:else if facilitators.length === 0}
		<div class="text-center py-12 bg-cream border border-taupe/20 rounded-md">
			<UserIcon class="w-12 h-12 mx-auto mb-4 text-slate opacity-50" />
			<p class="text-slate">{m.admin_fac_no_data()}</p>
		</div>
	{:else}
		<div class="bg-white border border-taupe/20 rounded-md overflow-hidden">
			<table class="w-full">
				<thead class="bg-cream border-b border-taupe/20">
					<tr>
						<th class="px-4 py-3 text-left text-sm font-medium">{m.admin_fac_name()}</th>
						<th class="px-4 py-3 text-left text-sm font-medium hidden md:table-cell">{m.admin_fac_email()}</th>
						<th class="px-4 py-3 text-left text-sm font-medium hidden lg:table-cell">{m.admin_fac_joined()}</th>
						<th class="px-4 py-3 text-left text-sm font-medium">{m.admin_fac_table_actions()}</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-taupe/10">
					{#each facilitators as facilitator (facilitator.id)}
						<tr class="hover:bg-cream/50 transition-colors">
							<td class="px-4 py-3 text-sm font-medium">{facilitator.name}</td>
							<td class="px-4 py-3 text-sm text-slate hidden md:table-cell">
								<div class="flex items-center gap-2">
									<Mail class="w-3.5 h-3.5 shrink-0" />
									{facilitator.email}
								</div>
							</td>
							<td class="px-4 py-3 text-sm text-slate hidden lg:table-cell">{formatDate(facilitator.createdAt)}</td>
							<td class="px-4 py-3">
								<button
									onclick={() => handleViewFacilitator(facilitator.id)}
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
			{facilitators.length}
			{facilitators.length !== 1 ? m.admin_fac_count_plural() : m.admin_fac_count_singular()}
		</div>
	{/if}
</div>

<!-- Add Facilitator Modal -->
{#if showAddModal}
	<div
		class="fixed inset-0 bg-midnyt/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		onclick={() => (showAddModal = false)}
		onkeydown={(e) => e.key === 'Escape' && (showAddModal = false)}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="bg-white rounded-md border border-taupe/20 w-full max-w-md overflow-hidden"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<div class="p-6 border-b border-taupe/20">
				<h2 class="text-xl font-bold">{m.admin_fac_modal_title()}</h2>
			</div>

			<form class="p-6 space-y-4" {...addFacilitator}>
				{#if addFacilitator.result?.success === false}
					<div class="p-3 bg-error/10 text-error rounded-md text-sm">
						{addFacilitator.result.message}
					</div>
				{/if}
				{#if addFacilitator.result?.success === true}
					<div class="p-3 bg-success/10 text-success rounded-md text-sm">
						{m.admin_fac_added()}
					</div>
				{/if}

				<div>
					<label for="name" class="block text-sm font-medium text-midnyt mb-1"
						>{m.admin_fac_modal_name()}</label
					>
					<input
						type="text"
						id="name"
						name="name"
						class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
					/>
					{#each addFacilitator.fields.name.issues() as issue}
						<p class="mt-1 text-sm text-error">{issue.message}</p>
					{/each}
				</div>

				<div>
					<label for="email" class="block text-sm font-medium text-midnyt mb-1"
						>{m.admin_fac_modal_email()}</label
					>
					<input
						type="email"
						id="email"
						name="email"
						class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
					/>
					{#each addFacilitator.fields.email.issues() as issue}
						<p class="mt-1 text-sm text-error">{issue.message}</p>
					{/each}
				</div>

				<div class="pt-4 flex items-center justify-end gap-3 border-t border-taupe/20">
					<button
						type="button"
						onclick={() => (showAddModal = false)}
						class="px-4 py-2 text-sm font-medium text-slate hover:text-midnyt"
					>
						{m.admin_modal_cancel()}
					</button>
					<button
						disabled={addFacilitator.pending ? true : false}
						class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-bronze rounded-md hover:bg-bronze/90 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{#if addFacilitator.pending}
							<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
							{m.admin_fac_modal_adding()}
						{:else}
							<Check class="w-4 h-4" />
							{m.admin_fac_modal_submit()}
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
