<script lang="ts">
	import type { PageData } from './$types';
	import { updateCandidateStatus } from './updateCandidateStatus.remote';
	import { goto } from '$app/navigation';
	import { m } from '$lib/i18n/messages.js';
	import {
		ArrowLeft,
		Calendar,
		User,
		Heart,
		Flag,
		Languages,
		MapPin,
		Phone,
		Mail,
		CheckCircle,
		Shield,
		History,
		MessageSquare,
		Clock,
		AlertTriangle,
		Activity,
		SquarePen
	} from 'lucide-svelte';

	let { params, data }: { params: { id: string }; data: PageData } = $props();

	const { profile, guardian, events, messages } = $derived(data.candidate);

	/**
	 * STATUS_OPTIONS are the available status values for candidate lifecycle.
	 */
	const STATUS_OPTIONS = [
		{ value: 'onboarding', label: 'Onboarding' },
		{ value: 'verifying', label: 'Pending Verification' },
		{ value: 'active', label: 'Active' },
		{ value: 'paused', label: 'Paused' },
		{ value: 'matching', label: 'Matching' },
		{ value: 'matched', label: 'Matched' },
		{ value: 'archived', label: 'Archived' },
		{ value: 'banned', label: 'Banned' }
	];

	let isStatusModalOpen = $state(false);
	let selectedStatus = $state('');
	let statusReason = $state('');
	let isUpdating = $state(false);

	/**
	 * openStatusModal opens the status change modal.
	 */
	function openStatusModal() {
		selectedStatus = profile.status;
		statusReason = '';
		isStatusModalOpen = true;
	}

	/**
	 * closeStatusModal closes the status change modal.
	 */
	function closeStatusModal() {
		isStatusModalOpen = false;
	}

	/**
	 * handleStatusUpdate submits the status change.
	 */
	async function handleStatusUpdate() {
		if (!selectedStatus) return;

		isUpdating = true;
		try {
			await updateCandidateStatus({
				profileId: profile.id,
				newStatus: selectedStatus as any,
				reason: statusReason
			});
			// Reload to show updated status
			window.location.reload();
		} catch (error) {
			alert('Failed to update status');
			console.error(error);
		} finally {
			isUpdating = false;
			closeStatusModal();
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
			year: 'numeric'
		});
	}

	/**
	 * formatEventType converts event type to readable string.
	 */
	function formatEventType(type: string): string {
		return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
	}
</script>

<svelte:head>
	<title>{m.admin_profile_title()} | {m.admin_portal_title()}</title>
</svelte:head>

<div class="px-4 py-8">
	<!-- Header -->
	<div class="mb-8">
		<button
			onclick={() => goto('/dashboard/candidates')}
			class="text-bronze hover:underline text-sm font-medium mb-4 flex items-center gap-1"
		>
			<ArrowLeft class="w-4 h-4" />
			{m.admin_profile_back()}
		</button>

		<div class="flex justify-between items-start">
			<div>
				<h1 class="text-3xl font-bold flex items-center gap-3">
					{profile.name}
				</h1>
				<p class="text-slate mt-2 flex items-center gap-4 text-sm">
					<span class="flex items-center gap-1">
						<Mail class="w-4 h-4" />
						{profile.email}
					</span>
					<span class="flex items-center gap-1">
						<Phone class="w-4 h-4" />
						{profile.phone || m.admin_na()}
					</span>
					{#if profile.emailVerified}
						<span class="flex items-center gap-1 text-success">
							<CheckCircle class="w-4 h-4" />
							{m.admin_profile_email_verified()}
						</span>
					{/if}
				</p>
			</div>

		</div>
	</div>

	<!-- Profile Content -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Left Column: Personal Info -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Personal Information -->
			<div class="bg-white border border-taupe/20 rounded-md p-6">
				<h2 class="text-xl font-bold mb-4 flex items-center gap-2">
					<User class="w-5 h-5 text-bronze" />
					{m.admin_profile_personal_info()}
				</h2>
				<div class="grid grid-cols-2 gap-6 text-sm">
					<div>
						<div class="text-xs text-slate mb-1">{m.admin_table_age()}</div>
						<div class="font-medium text-midnyt">{calculateAge(profile.birthYear)}</div>
					</div>
					<div>
						<div class="text-xs text-slate mb-1">{m.admin_table_gender()}</div>
						<div class="font-medium capitalize text-midnyt">
							{profile.gender === 'male'
								? m.gender_male_capitalized()
								: m.gender_female_capitalized()}
						</div>
					</div>
					<div>
						<div class="text-xs text-slate mb-1">{m.admin_table_kommun()}</div>
						<div class="font-medium text-midnyt">{profile.kommun}</div>
					</div>
					<div>
						<div class="text-xs text-slate mb-1">{m.admin_profile_nationality()}</div>
						<div class="font-medium text-midnyt">{profile.nationality || m.admin_na()}</div>
					</div>
					<div>
						<div class="text-xs text-slate mb-1">{m.admin_profile_marital_status()}</div>
						<div class="font-medium capitalize text-midnyt">{profile.maritalStatus}</div>
					</div>
					<div>
						<div class="text-xs text-slate mb-1">{m.admin_profile_languages()}</div>
						<div class="font-medium text-midnyt">
							{#if profile.languages}
								{profile.languages}
							{:else}
								{m.admin_na()}
							{/if}
						</div>
					</div>
				</div>

				<div class="mt-6 pt-6 border-t border-taupe/10">
					<div class="mb-4">
						<div class="text-xs text-slate mb-1">Self Description</div>
						<p class="text-sm text-midnyt leading-relaxed bg-cream/30 p-3 rounded-md">
							{profile.bio || 'No description provided.'}
						</p>
					</div>
					<div>
						<div class="text-xs text-slate mb-1">Partner Expectations</div>
						<p class="text-sm text-midnyt leading-relaxed bg-cream/30 p-3 rounded-md">
							{profile.seeking || 'No expectations provided.'}
						</p>
					</div>
				</div>
			</div>

			<!-- Guardian Information (if applicable) -->
			{#if guardian}
				<div class="bg-white border border-taupe/20 rounded-md p-6">
					<h2 class="text-xl font-bold mb-4 flex items-center gap-2">
						<Shield class="w-5 h-5 text-bronze" />
						{m.admin_profile_guardian()}
					</h2>
					<div class="grid grid-cols-2 gap-6 text-sm">
						<div>
							<div class="text-xs text-slate mb-1">{m.admin_profile_guardian_name()}</div>
							<div class="font-medium text-midnyt">{guardian.name}</div>
						</div>
						<!-- <div>
							<div class="text-xs text-slate mb-1">Relationship</div>
							<div class="font-medium text-midnyt">{guardian.relationship}</div>
						</div> -->
						<div>
							<div class="text-xs text-slate mb-1">{m.admin_profile_guardian_phone()}</div>
							<div class="font-medium text-midnyt">{guardian.phone || m.admin_na()}</div>
						</div>
						<div>
							<div class="text-xs text-slate mb-1">{m.admin_profile_guardian_email()}</div>
							<div class="font-medium text-midnyt">{guardian.email || m.admin_na()}</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Activity History -->
			<div class="bg-white border border-taupe/20 rounded-md p-6">
				<h2 class="text-xl font-bold mb-4 flex items-center gap-2">
					<History class="w-5 h-5 text-bronze" />
					{m.admin_profile_activity()}
				</h2>
				{#if events.length === 0}
					<p class="text-slate text-sm italic">{m.admin_profile_no_activity()}</p>
				{:else}
					<div class="space-y-4">
						{#each events as event}
							<div
								class="flex items-start gap-3 text-sm pb-3 border-b border-taupe/10 last:border-0 last:pb-0"
							>
								<div class="mt-1">
									<Clock class="w-3.5 h-3.5 text-slate" />
								</div>
								<div>
									<span class="font-medium text-sm text-midnyt">{formatEventType(event.type)}</span>
									{#if (event.payload as any)?.reason}
										<span class="text-xs text-slate ml-2">— {(event.payload as any).reason}</span>
									{/if}
								</div>
								<div class="text-xs text-slate ml-auto">{formatDate(event.createdAt)}</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- Right Column: Status & Messages -->
		<div class="space-y-6">
			<!-- Status Card -->
			<div class="bg-white border border-taupe/20 rounded-md p-6">
				<h2 class="text-xl font-bold mb-4 flex items-center gap-2">
					<Activity class="w-5 h-5 text-bronze" />
					{m.admin_profile_status_section()}
				</h2>
				<div class="mb-4">
					<div class="text-sm text-slate mb-1">{m.admin_profile_current_status()}</div>
					<div class="flex items-center gap-2">
						<div
							class="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-bronze/10 text-bronze capitalize border border-bronze/20"
						>
							{profile.status}
						</div>
						<button
							onclick={openStatusModal}
							class="p-1.5 text-slate hover:text-bronze transition-colors rounded-md hover:bg-cream"
							title={m.admin_profile_change_status()}
						>
							<SquarePen class="w-4 h-4" />
						</button>
					</div>
				</div>
				<div class="text-xs text-slate flex items-center gap-1">
					<Clock class="w-3 h-3" />
					{m.admin_profile_last_updated({ date: formatDate(profile.updatedAt) })}
				</div>
			</div>

			<!-- Dates Card -->
			<div class="bg-white border border-taupe/20 rounded-md p-6">
				<h2 class="text-xl font-bold mb-4 flex items-center gap-2">
					<Calendar class="w-5 h-5 text-bronze" />
					{m.admin_profile_dates()}
				</h2>
				<div class="space-y-3">
					<div>
						<div class="text-sm text-slate mb-1">{m.admin_profile_registered()}</div>
						<div class="text-sm font-medium text-midnyt">
							{formatDate(profile.userCreatedAt)}
						</div>
					</div>
					<div>
						<div class="text-sm text-slate mb-1">{m.admin_profile_created()}</div>
						<div class="text-sm font-medium text-midnyt">
							{formatDate(profile.createdAt)}
						</div>
					</div>
				</div>
			</div>

			<!-- Messages -->
			<div class="bg-white border border-taupe/20 rounded-md p-6">
				<h2 class="text-xl font-bold mb-4 flex items-center gap-2">
					<MessageSquare class="w-5 h-5 text-bronze" />
					{m.admin_profile_messages()}
				</h2>
				{#if messages.length === 0}
					<p class="text-slate text-sm italic">{m.admin_profile_no_messages()}</p>
				{:else}
					<div class="space-y-3">
						{#each messages as message}
							<div class="bg-cream/50 rounded-md p-4 border border-taupe/10">
								<div class="flex justify-between items-start mb-2">
									<h3 class="font-medium text-sm text-midnyt">{message.title}</h3>
									<span class="text-xs text-slate">{formatDate(message.createdAt)}</span>
								</div>
								<p class="text-sm text-slate mb-3">{message.body}</p>

								<div class="flex items-center gap-1.5 text-xs">
									{#if message.readAt}
										<CheckCircle class="w-3.5 h-3.5 text-success" />
										<span class="text-success"
											>{m.admin_profile_message_read({ date: formatDate(message.readAt) })}</span
										>
									{:else}
										<AlertTriangle class="w-3.5 h-3.5 text-warning" />
										<span class="text-warning">{m.admin_profile_message_unread()}</span>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Status Change Modal -->
	{#if isStatusModalOpen}
		<div
			class="fixed inset-0 bg-midnyt/50 flex items-center justify-center z-50 p-4"
			role="dialog"
			aria-modal="true"
			onclick={closeStatusModal}
		>
			<div
				class="bg-white rounded-md p-6 max-w-md w-full shadow-lg"
				onclick={(e) => e.stopPropagation()}
			>
				<h2 class="text-xl font-bold mb-4">{m.admin_modal_change_status()}</h2>

				<div class="mb-4">
					<label for="newStatus" class="block text-sm font-medium mb-2"
						>{m.admin_modal_new_status()}</label
					>
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
					<label for="reason" class="block text-sm font-medium mb-2">{m.admin_modal_reason()}</label>
					<textarea
						id="reason"
						bind:value={statusReason}
						rows="3"
						class="w-full px-3 py-2 border border-taupe/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze"
						placeholder={m.admin_modal_reason_placeholder()}
					></textarea>
				</div>

				<div class="flex justify-end gap-3">
					<button
						onclick={closeStatusModal}
						class="px-4 py-2 text-slate hover:text-midnyt text-sm font-medium"
						disabled={isUpdating}
					>
						{m.admin_modal_cancel()}
					</button>
					<button
						onclick={handleStatusUpdate}
						disabled={isUpdating}
						class="bg-bronze text-white px-4 py-2 rounded-md hover:bg-bronze/90 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
					>
						{#if isUpdating}
							<span
								class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
							></span>
							{m.admin_modal_updating()}
						{:else}
							{m.admin_modal_update()}
						{/if}
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
