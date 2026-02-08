<script lang="ts">
	import { getCandidateProfile } from './getCandidateProfile.remote';
	import { updateCandidateStatus } from './updateCandidateStatus.remote';
	import { goto } from '$app/navigation';

	let { params } = $props();

	/**
	 * STATUS_OPTIONS are the available status values for candidate lifecycle.
	 */
	const STATUS_OPTIONS = [
		{ value: 'onboarding', label: 'Onboarding' },
		{ value: 'verifying', label: 'Pending Verification' },
		{ value: 'active', label: 'Active' },
		{ value: 'paused', label: 'Paused' },
		{ value: 'matched', label: 'Matched' },
		{ value: 'archived', label: 'Archived' },
		{ value: 'banned', label: 'Banned' }
	];

	/**
	 * EVENT_TYPE_LABELS maps user event types to human-readable labels.
	 */
	const EVENT_TYPE_LABELS: Record<string, string> = {
		register: 'Registered',
		onboard: 'Completed Onboarding',
		verify: 'Verified',
		match: 'Matched',
		meet: 'Met',
		blacklist: 'Blacklisted',
		pause: 'Paused',
		resume: 'Resumed',
		archive: 'Archived',
		ban: 'Banned'
	};

	let showStatusModal = $state(false);
	let selectedStatus = $state('');
	let statusChangeReason = $state('');
	let statusChanging = $state(false);

	/**
	 * handleOpenStatusModal opens the status change modal.
	 */
	function handleOpenStatusModal(currentStatus: string) {
		selectedStatus = currentStatus;
		statusChangeReason = '';
		showStatusModal = true;
	}

	/**
	 * handleChangeStatus submits the status change.
	 */
	async function handleChangeStatus(profileId: string) {
		if (!selectedStatus) return;

		statusChanging = true;
		try {
			await updateCandidateStatus({
				profileId,
				newStatus: selectedStatus as any,
				reason: statusChangeReason || undefined
			});
			showStatusModal = false;
			// Reload page to show updated data
			window.location.reload();
		} catch (error) {
			alert('Failed to update candidate status');
			console.error(error);
		} finally {
			statusChanging = false;
		}
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
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	/**
	 * formatEventType converts event type enum to human-readable text.
	 */
	function formatEventType(type: string): string {
		return EVENT_TYPE_LABELS[type] || type;
	}
</script>

<svelte:head>
	<title>Candidate Profile | Admin Portal</title>
</svelte:head>

<div class="min-h-screen bg-white text-midnyt">
	{#await getCandidateProfile(params.id)}
		<div class="mx-auto max-w-5xl px-4 py-8">
			<div class="text-center py-12">
				<p class="text-slate">Loading candidate profile...</p>
			</div>
		</div>
	{:then data}
		<div class="mx-auto max-w-5xl px-4 py-8">
			<!-- Header with Back Button -->
			<div class="mb-6">
				<button
					onclick={() => goto('/dashboard/candidates')}
					class="text-bronze hover:underline text-sm font-medium mb-4"
				>
					← Back to Candidates
				</button>
				<div class="flex justify-between items-start">
					<div>
						<h1 class="text-3xl font-bold">{data.profile.name}</h1>
						<p class="text-slate mt-1">{data.profile.email}</p>
					</div>
					<button
						onclick={() => handleOpenStatusModal(data.profile.status)}
						class="bg-bronze text-white px-4 py-2 rounded-md hover:bg-bronze/90 transition-colors text-sm font-medium"
					>
						Change Status
					</button>
				</div>
			</div>

			<!-- Profile Information -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
				<!-- Personal Information -->
				<div class="lg:col-span-2 bg-cream border border-taupe/20 rounded-md p-6">
					<h2 class="text-xl font-bold mb-4">Personal Information</h2>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<div class="text-sm text-slate mb-1">Age</div>
							<div class="font-medium">{calculateAge(data.profile.birthYear)} years old</div>
						</div>
						<div>
							<div class="text-sm text-slate mb-1">Gender</div>
							<div class="font-medium capitalize">{data.profile.gender}</div>
						</div>
						<div>
							<div class="text-sm text-slate mb-1">Marital Status</div>
							<div class="font-medium capitalize">{data.profile.maritalStatus}</div>
						</div>
						<div>
							<div class="text-sm text-slate mb-1">Nationality</div>
							<div class="font-medium">{data.profile.nationality}</div>
						</div>
						<div>
							<div class="text-sm text-slate mb-1">Languages</div>
							<div class="font-medium">{data.profile.languages}</div>
						</div>
						<div>
							<div class="text-sm text-slate mb-1">Kommun</div>
							<div class="font-medium">{data.profile.kommun}</div>
						</div>
						<div>
							<div class="text-sm text-slate mb-1">Phone</div>
							<div class="font-medium">{data.profile.phone || 'N/A'}</div>
						</div>
						<div>
							<div class="text-sm text-slate mb-1">Email Verified</div>
							<div class="font-medium">{data.profile.emailVerified ? 'Yes' : 'No'}</div>
						</div>
					</div>

					<div class="mt-4">
						<div class="text-sm text-slate mb-1">Bio</div>
						<p class="text-sm leading-relaxed">{data.profile.bio}</p>
					</div>

					<div class="mt-4">
						<div class="text-sm text-slate mb-1">Seeking</div>
						<p class="text-sm leading-relaxed">{data.profile.seeking}</p>
					</div>
				</div>

				<!-- Status & Dates -->
				<div class="space-y-6">
					<div class="bg-cream border border-taupe/20 rounded-md p-6">
						<h2 class="text-xl font-bold mb-4">Status</h2>
						<div class="mb-4">
							<div class="text-sm text-slate mb-1">Current Status</div>
							<div class="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-bronze/20 text-bronze capitalize">
								{data.profile.status}
							</div>
						</div>
						<div class="text-xs text-slate">
							Last updated: {formatDate(data.profile.updatedAt)}
						</div>
					</div>

					<div class="bg-cream border border-taupe/20 rounded-md p-6">
						<h2 class="text-xl font-bold mb-4">Dates</h2>
						<div class="space-y-3">
							<div>
								<div class="text-sm text-slate mb-1">Registered</div>
								<div class="text-sm font-medium">{formatDate(data.profile.userCreatedAt)}</div>
							</div>
							<div>
								<div class="text-sm text-slate mb-1">Profile Created</div>
								<div class="text-sm font-medium">{formatDate(data.profile.createdAt)}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Guardian Information -->
			{#if data.guardian}
				<div class="bg-cream border border-taupe/20 rounded-md p-6 mb-6">
					<h2 class="text-xl font-bold mb-4">Guardian (Wali) Information</h2>
					<div class="grid grid-cols-3 gap-4">
						<div>
							<div class="text-sm text-slate mb-1">Name</div>
							<div class="font-medium">{data.guardian.name}</div>
						</div>
						<div>
							<div class="text-sm text-slate mb-1">Phone</div>
							<div class="font-medium">{data.guardian.phone}</div>
						</div>
						<div>
							<div class="text-sm text-slate mb-1">Email</div>
							<div class="font-medium">{data.guardian.email || 'N/A'}</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Activity History -->
			<div class="bg-white border border-taupe/20 rounded-md p-6 mb-6">
				<h2 class="text-xl font-bold mb-4">Activity History</h2>
				{#if data.events.length === 0}
					<p class="text-slate text-sm">No activity recorded</p>
				{:else}
					<div class="space-y-2">
						{#each data.events as event}
							<div class="flex justify-between items-center py-2 border-b border-taupe/10 last:border-0">
								<div>
									<span class="font-medium text-sm">{formatEventType(event.type)}</span>
									{#if event.payload && event.payload.reason}
										<span class="text-xs text-slate ml-2">— {event.payload.reason}</span>
									{/if}
								</div>
								<div class="text-xs text-slate">{formatDate(event.createdAt)}</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Messages -->
			<div class="bg-white border border-taupe/20 rounded-md p-6">
				<h2 class="text-xl font-bold mb-4">Messages</h2>
				{#if data.messages.length === 0}
					<p class="text-slate text-sm">No messages sent</p>
				{:else}
					<div class="space-y-3">
						{#each data.messages as message}
							<div class="bg-cream/50 rounded-md p-4 border border-taupe/10">
								<div class="flex justify-between items-start mb-2">
									<h3 class="font-medium text-sm">{message.title}</h3>
									<span class="text-xs text-slate">{formatDate(message.createdAt)}</span>
								</div>
								<p class="text-sm text-slate">{message.body}</p>
								{#if message.readAt}
									<div class="text-xs text-success mt-2">Read {formatDate(message.readAt)}</div>
								{:else}
									<div class="text-xs text-warning mt-2">Unread</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- Status Change Modal -->
		{#if showStatusModal}
			<div class="fixed inset-0 bg-midnyt/50 flex items-center justify-center z-50" role="dialog" aria-modal="true" onclick={() => showStatusModal = false}>
				<div class="bg-white rounded-md p-6 max-w-md w-full mx-4" onclick={(e) => e.stopPropagation()}>
					<h2 class="text-xl font-bold mb-4">Change Candidate Status</h2>

					<div class="mb-4">
						<label for="newStatus" class="block text-sm font-medium mb-2">New Status</label>
						<select
							id="newStatus"
							bind:value={selectedStatus}
							class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
						>
							{#each STATUS_OPTIONS as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>

					<div class="mb-6">
						<label for="reason" class="block text-sm font-medium mb-2">Reason (optional)</label>
						<textarea
							id="reason"
							bind:value={statusChangeReason}
							placeholder="Explain why the status is being changed..."
							class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
							rows="3"
						></textarea>
					</div>

					<div class="flex gap-3">
						<button
							onclick={() => showStatusModal = false}
							class="flex-1 bg-cream text-midnyt px-4 py-2 rounded-md hover:bg-cream/80 transition-colors font-medium"
							disabled={statusChanging}
						>
							Cancel
						</button>
						<button
							onclick={() => handleChangeStatus(data.profile.id)}
							class="flex-1 bg-bronze text-white px-4 py-2 rounded-md hover:bg-bronze/90 transition-colors font-medium"
							disabled={statusChanging}
						>
							{statusChanging ? 'Updating...' : 'Update Status'}
						</button>
					</div>
				</div>
			</div>
		{/if}
	{:catch error}
		<div class="mx-auto max-w-5xl px-4 py-8">
			<div class="bg-cream border-l-4 border-error p-4">
				<p class="text-sm text-error">Failed to load candidate profile</p>
			</div>
		</div>
	{/await}
</div>
