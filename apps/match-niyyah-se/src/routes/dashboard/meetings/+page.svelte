<script lang="ts">
	import { getMeetings } from './getMeetings.remote';
	import { getActiveCandidates } from './getActiveCandidates.remote';
	import { createMeeting } from './createMeeting.remote';
	import { m } from '$lib/i18n/messages.js';
	import {
		CalendarDays,
		CalendarClock,
		CalendarCheck,
		MessageSquareDot,
		CheckCircle2,
		XCircle,
		Plus,
		X,
		MapPin
	} from 'lucide-svelte';

	/**
	 * MEETING_STATUSES defines the tab options with their labels.
	 */
	const MEETING_STATUSES = [
		{ value: 'all', label: () => m.match_meetings_filter_all() },
		{ value: 'scheduling', label: () => m.match_meeting_status_scheduling() },
		{ value: 'scheduled', label: () => m.match_meeting_status_scheduled() },
		{ value: 'pending_feedback', label: () => m.match_meeting_status_pending_feedback() },
		{ value: 'completed', label: () => m.match_meeting_status_completed() },
		{ value: 'cancelled', label: () => m.match_meeting_status_cancelled() }
	] as const;

	/**
	 * STATUS_BADGES maps meeting status values to badge styling.
	 */
	const STATUS_BADGES: Record<string, string> = {
		scheduling: 'bg-slate/20 text-slate',
		scheduled: 'bg-success/20 text-success',
		pending_feedback: 'bg-warning/20 text-warning',
		completed: 'bg-bronze/20 text-bronze',
		cancelled: 'bg-error/20 text-error'
	};

	/**
	 * STATUS_ICONS maps meeting status values to icons.
	 */
	const STATUS_ICONS: Record<string, any> = {
		scheduling: CalendarClock,
		scheduled: CalendarCheck,
		pending_feedback: MessageSquareDot,
		completed: CheckCircle2,
		cancelled: XCircle
	};

	// Filter state
	let activeStatus = $state<string>('all');

	// Derived meetings query — re-runs when filter changes
	const meetings = $derived(getMeetings(activeStatus === 'all' ? undefined : (activeStatus as any)));

	// Modal state
	let showModal = $state(false);
	let candidate1Id = $state('');
	let candidate2Id = $state('');
	let scheduledAt = $state('');
	let location = $state('');
	let isSubmitting = $state(false);
	let submitError = $state('');
	let submitSuccess = $state(false);

	/**
	 * openModal resets and opens the new meeting modal.
	 */
	function openModal() {
		candidate1Id = '';
		candidate2Id = '';
		scheduledAt = '';
		location = '';
		submitError = '';
		submitSuccess = false;
		showModal = true;
	}

	/**
	 * closeModal closes the new meeting modal.
	 */
	function closeModal() {
		showModal = false;
	}

	/**
	 * handleSubmit calls createMeeting with the entered data.
	 */
	async function handleSubmit() {
		if (!candidate1Id || !candidate2Id) return;
		isSubmitting = true;
		submitError = '';
		try {
			await createMeeting({
				candidate1Id,
				candidate2Id,
				scheduledAt: scheduledAt || undefined,
				location: location || undefined
			});
			submitSuccess = true;
			// Close modal after short delay and refresh
			setTimeout(() => {
				showModal = false;
				// Force re-fetch by toggling filter back
				activeStatus = activeStatus;
			}, 1200);
		} catch (e) {
			submitError = m.match_new_meeting_error();
		} finally {
			isSubmitting = false;
		}
	}

	/**
	 * formatDate formats date to a readable string.
	 */
	function formatDate(date: Date | null): string {
		if (!date) return m.match_meeting_no_date();
		return new Date(date).toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>{m.match_meetings_title()} | {m.match_portal_title()}</title>
</svelte:head>

<div class="px-4 py-8">
	<!-- Header -->
	<div class="mb-8 flex items-start justify-between gap-4">
		<div>
			<h1 class="text-3xl font-bold">{m.match_meetings_title()}</h1>
			<p class="text-slate mt-2">{m.match_meetings_subtitle()}</p>
		</div>
		<button
			onclick={openModal}
			class="flex items-center gap-2 bg-bronze text-white px-4 py-2 rounded-md hover:bg-bronze/90 transition-colors text-sm font-medium shrink-0"
		>
			<Plus class="w-4 h-4" />
			{m.match_meetings_new()}
		</button>
	</div>

	<!-- Status Filter Tabs -->
	<div class="flex gap-1 mb-6 overflow-x-auto pb-1">
		{#each MEETING_STATUSES as tab}
			<button
				onclick={() => (activeStatus = tab.value)}
				class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors
					{activeStatus === tab.value
					? 'bg-midnyt text-white'
					: 'bg-white border border-taupe/20 text-slate hover:text-midnyt hover:bg-cream/50'}"
			>
				{#if tab.value !== 'all'}
					{@const TabIcon = STATUS_ICONS[tab.value]}
					<TabIcon class="w-3.5 h-3.5" />
				{/if}
				{tab.label()}
			</button>
		{/each}
	</div>

	<!-- Meetings Table -->
	{#await meetings}
		<div class="text-center py-12">
			<p class="text-slate">{m.match_loading_meetings()}</p>
		</div>
	{:then meetingList}
		{#if meetingList.length === 0}
			<div
				class="text-center py-16 bg-white border border-taupe/20 rounded-md flex flex-col items-center gap-4"
			>
				<CalendarDays class="w-12 h-12 text-taupe/40" />
				<p class="text-slate">{m.match_meetings_empty()}</p>
				<button
					onclick={openModal}
					class="flex items-center gap-2 bg-bronze text-white px-4 py-2 rounded-md hover:bg-bronze/90 transition-colors text-sm font-medium"
				>
					<Plus class="w-4 h-4" />
					{m.match_meetings_new()}
				</button>
			</div>
		{:else}
			<div class="bg-white border border-taupe/20 rounded-md overflow-hidden">
				<table class="w-full">
					<thead class="bg-cream border-b border-taupe/20">
						<tr>
							<th class="px-4 py-3 text-left text-sm font-medium"
								>{m.match_meeting_col_candidates()}</th
							>
							<th class="px-4 py-3 text-left text-sm font-medium">{m.match_meeting_col_status()}</th>
							<th class="px-4 py-3 text-left text-sm font-medium hidden md:table-cell"
								>{m.match_meeting_col_date()}</th
							>
							<th class="px-4 py-3 text-left text-sm font-medium hidden lg:table-cell"
								>{m.match_meeting_col_location()}</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-taupe/10">
						{#each meetingList as meeting}
							{@const StatusIcon = STATUS_ICONS[meeting.status]}
							<tr class="hover:bg-cream/50 transition-colors">
								<!-- Candidates -->
								<td class="px-4 py-3">
									<div class="text-sm font-medium text-midnyt">{meeting.candidate1Name}</div>
									<div class="text-sm text-slate mt-0.5">{meeting.candidate2Name}</div>
								</td>

								<!-- Status badge -->
								<td class="px-4 py-3">
									<span
										class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium {STATUS_BADGES[
											meeting.status
										]}"
									>
										<StatusIcon class="w-3 h-3" />
										{MEETING_STATUSES.find((s) => s.value === meeting.status)?.label() ??
											meeting.status}
									</span>
								</td>

								<!-- Date -->
								<td class="px-4 py-3 text-sm text-slate hidden md:table-cell">
									{formatDate(meeting.scheduledAt)}
								</td>

								<!-- Location -->
								<td class="px-4 py-3 hidden lg:table-cell">
									{#if meeting.location}
										<span class="flex items-center gap-1 text-sm text-slate">
											<MapPin class="w-3.5 h-3.5 shrink-0" />
											{meeting.location}
										</span>
									{:else}
										<span class="text-sm text-taupe/50">{m.match_meeting_no_location()}</span>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<div class="px-4 py-3 border-t border-taupe/10 text-sm text-slate">
					{meetingList.length}
					{meetingList.length === 1 ? 'meeting' : 'meetings'}
				</div>
			</div>

			<!-- Feedback notice for pending_feedback rows -->
			{#if meetingList.some((m) => m.status === 'pending_feedback')}
				<div class="mt-4 p-4 bg-warning/10 border border-warning/30 rounded-md">
					<p class="text-sm text-warning font-medium">
						⚠ {meetingList.filter((m) => m.status === 'pending_feedback').length} meeting{meetingList.filter((m) => m.status === 'pending_feedback').length !== 1 ? 's' : ''} await feedback from candidates.
					</p>
				</div>
			{/if}
		{/if}
	{:catch}
		<div class="bg-cream border-l-4 border-error p-4">
			<p class="text-sm text-error">{m.match_error_load_meetings()}</p>
		</div>
	{/await}
</div>

<!-- New Meeting Modal -->
{#if showModal}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 bg-black/40 z-40"
		role="button"
		tabindex="-1"
		onclick={closeModal}
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
	></div>

	<!-- Modal panel -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		role="dialog"
		aria-modal="true"
	>
		<div class="bg-white rounded-md border border-taupe/20 w-full max-w-lg p-6">
			<!-- Modal header -->
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-xl font-bold">{m.match_new_meeting_title()}</h2>
				<button
					onclick={closeModal}
					class="p-1 text-slate hover:text-midnyt transition-colors rounded-sm"
					aria-label="Close"
				>
					<X class="w-5 h-5" />
				</button>
			</div>

			{#if submitSuccess}
				<div class="flex flex-col items-center gap-3 py-8 text-center">
					<CheckCircle2 class="w-12 h-12 text-success" />
					<p class="font-medium text-success">{m.match_new_meeting_success()}</p>
				</div>
			{:else}
				{#await getActiveCandidates()}
					<div class="text-center py-8">
						<p class="text-slate text-sm">{m.match_loading_meetings()}</p>
					</div>
				{:then candidates}
					<form
						onsubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
						class="space-y-5"
					>
						<!-- Candidate 1 -->
						<div>
							<label for="candidate1" class="block text-sm font-medium mb-1.5">
								{m.match_new_meeting_candidate1()}
							</label>
							<select
								id="candidate1"
								bind:value={candidate1Id}
								required
								class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
							>
								<option value="">{m.match_new_meeting_select_candidate()}</option>
								{#each candidates as c}
									<option value={c.id} disabled={c.id === candidate2Id}>
										{c.name} ({c.gender}, {c.kommun})
									</option>
								{/each}
							</select>
						</div>

						<!-- Candidate 2 -->
						<div>
							<label for="candidate2" class="block text-sm font-medium mb-1.5">
								{m.match_new_meeting_candidate2()}
							</label>
							<select
								id="candidate2"
								bind:value={candidate2Id}
								required
								class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
							>
								<option value="">{m.match_new_meeting_select_candidate()}</option>
								{#each candidates as c}
									<option value={c.id} disabled={c.id === candidate1Id}>
										{c.name} ({c.gender}, {c.kommun})
									</option>
								{/each}
							</select>
						</div>

						<!-- Date & Time (optional) -->
						<div>
							<label for="scheduledAt" class="block text-sm font-medium mb-1.5">
								{m.match_new_meeting_date()}
							</label>
							<input
								id="scheduledAt"
								type="datetime-local"
								bind:value={scheduledAt}
								class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
							/>
						</div>

						<!-- Location (optional) -->
						<div>
							<label for="location" class="block text-sm font-medium mb-1.5">
								{m.match_new_meeting_location()}
							</label>
							<input
								id="location"
								type="text"
								bind:value={location}
								placeholder={m.match_new_meeting_location_placeholder()}
								class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
							/>
						</div>

						<!-- Error -->
						{#if submitError}
							<div class="bg-cream border-l-4 border-error p-3 rounded-sm">
								<p class="text-sm text-error">{submitError}</p>
							</div>
						{/if}

						<!-- Actions -->
						<div class="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onclick={closeModal}
								class="px-4 py-2 text-sm font-medium text-slate hover:text-midnyt transition-colors"
							>
								{m.match_new_meeting_cancel()}
							</button>
							<button
								type="submit"
								disabled={isSubmitting || !candidate1Id || !candidate2Id}
								class="flex items-center gap-2 bg-bronze text-white px-4 py-2 rounded-md hover:bg-bronze/90 transition-colors text-sm font-medium disabled:opacity-50"
							>
								{#if isSubmitting}
									<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
									></span>
									{m.match_new_meeting_submitting()}
								{:else}
									{m.match_new_meeting_submit()}
								{/if}
							</button>
						</div>
					</form>
				{:catch}
					<p class="text-sm text-error text-center py-4">{m.match_error_load_meetings()}</p>
				{/await}
			{/if}
		</div>
	</div>
{/if}
