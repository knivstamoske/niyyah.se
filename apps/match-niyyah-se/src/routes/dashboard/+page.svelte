<script lang="ts">
	import { getDashboardMetrics } from './getDashboardMetrics.remote';
	import { getRecentActivity } from './getRecentActivity.remote';
	import { m } from '$lib/i18n/messages.js';
	import {
		Clock,
		UserCheck,
		HeartHandshake,
		CalendarClock,
		CalendarCheck,
		MessageSquareDot,
		Activity
	} from 'lucide-svelte';

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

	/**
	 * formatEventType converts event type enum to human-readable text.
	 */
	function formatEventType(type: string): string {
		return EVENT_TYPE_LABELS[type] || type;
	}

	/**
	 * formatRelativeTime formats a date as a relative time string.
	 */
	function formatRelativeTime(date: Date): string {
		const now = new Date();
		const diffMs = now.getTime() - new Date(date).getTime();
		const diffSec = Math.floor(diffMs / 1000);
		const diffMin = Math.floor(diffSec / 60);
		const diffHour = Math.floor(diffMin / 60);
		const diffDay = Math.floor(diffHour / 24);

		if (diffSec < 60) return m.match_activity_time_ago({ time: 'just now' });
		if (diffMin < 60) return m.match_activity_time_ago({ time: `${diffMin}m` });
		if (diffHour < 24) return m.match_activity_time_ago({ time: `${diffHour}h` });
		return m.match_activity_time_ago({ time: `${diffDay}d` });
	}
</script>

<svelte:head>
	<title>{m.match_dashboard_title()} | {m.match_portal_title()}</title>
</svelte:head>

<div class="px-4 py-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold">{m.match_dashboard_title()}</h1>
		<p class="text-slate mt-2">{m.match_dashboard_subtitle()}</p>
	</div>

	{#await getDashboardMetrics()}
		<div class="text-center py-12">
			<p class="text-slate">{m.match_loading_dashboard()}</p>
		</div>
	{:then metrics}
		<!-- Candidates Needing Attention -->
		<div class="mb-8">
			<h2 class="text-lg font-semibold mb-4">{m.match_section_candidates()}</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<!-- Pending Verification -->
				<a
					href="/dashboard/candidates?status=verifying"
					class="bg-white border border-taupe/20 rounded-md p-6 relative overflow-hidden block transition-colors hover:bg-cream/50 cursor-pointer"
				>
					<div class="absolute top-4 right-4 text-warning/20">
						<Clock class="w-12 h-12" />
					</div>
					<div class="relative z-10">
						<div class="text-sm text-slate mb-1">{m.match_metric_pending_verification()}</div>
						<div class="text-3xl font-bold text-warning">{metrics.pendingVerification}</div>
						<div class="text-xs text-slate mt-2">{m.match_metric_pending_verification_sub()}</div>
					</div>
				</a>

				<!-- Ready to Match -->
				<a
					href="/dashboard/candidates?status=active"
					class="bg-white border border-taupe/20 rounded-md p-6 relative overflow-hidden block transition-colors hover:bg-cream/50 cursor-pointer"
				>
					<div class="absolute top-4 right-4 text-success/20">
						<UserCheck class="w-12 h-12" />
					</div>
					<div class="relative z-10">
						<div class="text-sm text-slate mb-1">{m.match_metric_ready_to_match()}</div>
						<div class="text-3xl font-bold text-success">{metrics.readyToMatch}</div>
						<div class="text-xs text-slate mt-2">{m.match_metric_ready_to_match_sub()}</div>
					</div>
				</a>

				<!-- In Matching -->
				<a
					href="/dashboard/candidates?status=matching"
					class="bg-white border border-taupe/20 rounded-md p-6 relative overflow-hidden block transition-colors hover:bg-cream/50 cursor-pointer"
				>
					<div class="absolute top-4 right-4 text-bronze/20">
						<HeartHandshake class="w-12 h-12" />
					</div>
					<div class="relative z-10">
						<div class="text-sm text-slate mb-1">{m.match_metric_in_matching()}</div>
						<div class="text-3xl font-bold text-bronze">{metrics.inMatching}</div>
						<div class="text-xs text-slate mt-2">{m.match_metric_in_matching_sub()}</div>
					</div>
				</a>
			</div>
		</div>

		<!-- Meetings Overview -->
		<div class="mb-8">
			<h2 class="text-lg font-semibold mb-4">{m.match_section_meetings()}</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<!-- Scheduling -->
				<div class="bg-white border border-taupe/20 rounded-md p-6 relative overflow-hidden">
					<div class="absolute top-4 right-4 text-slate/10">
						<CalendarClock class="w-12 h-12" />
					</div>
					<div class="relative z-10">
						<div class="text-sm text-slate mb-1">{m.match_meeting_scheduling()}</div>
						<div class="text-3xl font-bold text-midnyt">{metrics.meetingsScheduling}</div>
						<div class="text-xs text-slate mt-2">{m.match_meeting_scheduling_sub()}</div>
					</div>
				</div>

				<!-- Scheduled / Upcoming -->
				<div class="bg-white border border-taupe/20 rounded-md p-6 relative overflow-hidden">
					<div class="absolute top-4 right-4 text-success/20">
						<CalendarCheck class="w-12 h-12" />
					</div>
					<div class="relative z-10">
						<div class="text-sm text-slate mb-1">{m.match_meeting_scheduled()}</div>
						<div class="text-3xl font-bold text-success">{metrics.meetingsScheduled}</div>
						<div class="text-xs text-slate mt-2">{m.match_meeting_scheduled_sub()}</div>
					</div>
				</div>

				<!-- Awaiting Feedback -->
				<div
					class="bg-white border border-taupe/20 rounded-md p-6 relative overflow-hidden"
					class:border-warning={metrics.meetingsPendingFeedback > 0}
					class:border-l-4={metrics.meetingsPendingFeedback > 0}
				>
					<div class="absolute top-4 right-4 text-warning/20">
						<MessageSquareDot class="w-12 h-12" />
					</div>
					<div class="relative z-10">
						<div class="text-sm text-slate mb-1">{m.match_meeting_pending_feedback()}</div>
						<div
							class="text-3xl font-bold"
							class:text-warning={metrics.meetingsPendingFeedback > 0}
							class:text-midnyt={metrics.meetingsPendingFeedback === 0}
						>
							{metrics.meetingsPendingFeedback}
						</div>
						<div class="text-xs text-slate mt-2">{m.match_meeting_pending_feedback_sub()}</div>
					</div>
				</div>
			</div>
		</div>
	{:catch}
		<div class="bg-cream border-l-4 border-error p-4 mb-8">
			<p class="text-sm text-error">{m.match_error_load_dashboard()}</p>
		</div>
	{/await}

	<!-- Recent Activity Feed -->
	<div class="bg-white border border-taupe/20 rounded-md p-6">
		<div class="flex items-center gap-2 mb-4">
			<Activity class="w-5 h-5 text-bronze" />
			<h2 class="text-xl font-bold">{m.match_activity_title()}</h2>
		</div>

		{#await getRecentActivity()}
			<div class="text-center py-8">
				<p class="text-slate">{m.match_activity_time_ago({ time: '...' })}</p>
			</div>
		{:then activities}
			{#if activities.length === 0}
				<p class="text-slate text-center py-8">{m.match_activity_empty()}</p>
			{:else}
				<div class="space-y-3">
					{#each activities as activity}
						<div class="flex items-start gap-4 p-3 bg-cream/50 rounded-md border border-taupe/10">
							<div class="flex-1">
								<div class="flex items-baseline gap-2">
									<span class="font-medium text-midnyt">{activity.userName}</span>
									<span class="text-sm text-slate">{formatEventType(activity.type)}</span>
								</div>
								<div class="text-xs text-slate mt-1">{activity.userEmail}</div>
							</div>
							<div class="text-xs text-slate whitespace-nowrap">
								{formatRelativeTime(activity.createdAt)}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		{:catch}
			<div class="bg-cream border-l-4 border-error p-4">
				<p class="text-sm text-error">{m.match_error_load_dashboard()}</p>
			</div>
		{/await}
	</div>
</div>
