<script lang="ts">
	import { getDashboardMetrics } from './getDashboardMetrics.remote';
	import { getRecentActivity } from './getRecentActivity.remote';
	import { m } from '$lib/i18n/messages.js';
	import { Users, UserCheck, CheckCircle, PauseCircle, Activity, Clock } from 'lucide-svelte';

	/**
	 * STATUS_LABELS maps candidate status metrics to their translation keys.
	 */
	const STATUS_LABELS: Record<string, () => string> = {
		onboarding: () => m.match_status_onboarding(),
		verifying: () => m.match_status_verifying(),
		active: () => m.match_status_active(),
		paused: () => m.match_status_paused(),
		matched: () => m.match_status_matched(),
		archived: () => m.match_status_archived(),
		banned: () => m.match_status_banned()
	};

	/**
	 * EVENT_TYPE_LABELS maps user event types to human-readable labels.
	 * TODO: Add specific translations for event types in next phase
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

	/**
	 * calculatePercentage calculates percentage with safe division by zero.
	 */
	function calculatePercentage(part: number, total: number): number {
		if (total === 0) return 0;
		return Math.round((part / total) * 100);
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
			<p class="text-slate">{m.match_loading_metrics()}</p>
		</div>
	{:then metrics}
		<!-- Platform Metrics Cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
			<!-- Total Candidates -->
			<div class="bg-white border border-taupe/20 rounded-md p-6 relative overflow-hidden">
				<div class="absolute top-4 right-4 text-taupe/20">
					<Users class="w-12 h-12" />
				</div>
				<div class="relative z-10">
					<div class="text-sm text-slate mb-1">{m.match_metric_total_candidates()}</div>
					<div class="text-3xl font-bold text-midnyt">{metrics.totalCandidates}</div>
					<div class="text-xs text-slate mt-2">
						{m.match_metric_new_registrations({ count: metrics.newRegistrations30d })}
					</div>
				</div>
			</div>

			<!-- Pending Verifications -->
			<!-- Pending Verifications -->
			<a
				href="/dashboard/candidates?status=verifying"
				class="bg-white border border-taupe/20 rounded-md p-6 relative overflow-hidden block transition-colors hover:bg-cream/50 cursor-pointer"
			>
				<div class="absolute top-4 right-4 text-warning/20">
					<Clock class="w-12 h-12" />
				</div>
				<div class="relative z-10">
					<div class="text-sm text-slate mb-1">{m.match_metric_pending_verifications()}</div>
					<div class="text-3xl font-bold text-warning">{metrics.pendingVerifications}</div>
					<div class="text-xs text-slate mt-2">{m.match_metric_requires_attention()}</div>
				</div>
			</a>

			<!-- Active Candidates -->
			<div class="bg-white border border-taupe/20 rounded-md p-6 relative overflow-hidden">
				<div class="absolute top-4 right-4 text-success/20">
					<UserCheck class="w-12 h-12" />
				</div>
				<div class="relative z-10">
					<div class="text-sm text-slate mb-1">{m.match_metric_active_candidates()}</div>
					<div class="text-3xl font-bold text-success">{metrics.activeCandidates}</div>
					<div class="text-xs text-slate mt-2">{m.match_metric_ready_for_matching()}</div>
				</div>
			</div>

			<!-- Paused Candidates -->
			<div class="bg-white border border-taupe/20 rounded-md p-6 relative overflow-hidden">
				<div class="absolute top-4 right-4 text-slate/10">
					<PauseCircle class="w-12 h-12" />
				</div>
				<div class="relative z-10">
					<div class="text-sm text-slate mb-1">{m.match_metric_paused_candidates()}</div>
					<div class="text-3xl font-bold text-slate">{metrics.pausedCandidates}</div>
					<div class="text-xs text-slate mt-2">{m.match_metric_temporarily_inactive()}</div>
				</div>
			</div>
		</div>

		<!-- Two Column Layout for Charts -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
			<!-- Candidate Lifecycle Funnel -->
			<div class="bg-white border border-taupe/20 rounded-md p-6">
				<h2 class="text-xl font-bold mb-4">{m.match_chart_lifecycle()}</h2>
				<div class="space-y-3">
					{#each metrics.candidatesByStatus as { status, count }}
						{@const percentage = calculatePercentage(count, metrics.totalCandidates)}
						<div>
							<div class="flex justify-between text-sm mb-1">
								<span class="font-medium">{STATUS_LABELS[status]?.() || status}</span>
								<span class="text-slate">{count} ({percentage}%)</span>
							</div>
							<div class="bg-cream rounded-sm h-2">
								<div
									class="bg-bronze rounded-sm h-2 transition-all"
									style="width: {percentage}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Gender Distribution -->
			<div class="bg-white border border-taupe/20 rounded-md p-6">
				<h2 class="text-xl font-bold mb-4">{m.match_chart_gender_distribution()}</h2>
				<div class="space-y-4">
					<!-- Male -->
					<div>
						<div class="flex justify-between text-sm mb-1">
							<span class="font-medium">{m.gender_male_capitalized()}</span>
							<span class="text-slate">
								{metrics.maleCandidates} ({calculatePercentage(
									metrics.maleCandidates,
									metrics.totalCandidates
								)}%)
							</span>
						</div>
						<div class="bg-cream rounded-sm h-2">
							<div
								class="bg-midnyt rounded-sm h-2 transition-all"
								style="width: {calculatePercentage(
									metrics.maleCandidates,
									metrics.totalCandidates
								)}%"
							></div>
						</div>
					</div>

					<!-- Female -->
					<div>
						<div class="flex justify-between text-sm mb-1">
							<span class="font-medium">{m.gender_female_capitalized()}</span>
							<span class="text-slate">
								{metrics.femaleCandidates} ({calculatePercentage(
									metrics.femaleCandidates,
									metrics.totalCandidates
								)}%)
							</span>
						</div>
						<div class="bg-cream rounded-sm h-2">
							<div
								class="bg-bronze rounded-sm h-2 transition-all"
								style="width: {calculatePercentage(
									metrics.femaleCandidates,
									metrics.totalCandidates
								)}%"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Geographic Distribution -->
		<div class="bg-white border border-taupe/20 rounded-md p-6 mb-8">
			<h2 class="text-xl font-bold mb-4">{m.match_chart_geographic_distribution()}</h2>
			<div class="space-y-3">
				{#each metrics.candidatesByKommun as { kommun, count }}
					{@const percentage = calculatePercentage(count, metrics.totalCandidates)}
					<div>
						<div class="flex justify-between text-sm mb-1">
							<span class="font-medium">{kommun}</span>
							<span class="text-slate">{count} ({percentage}%)</span>
						</div>
						<div class="bg-cream rounded-sm h-2">
							<div
								class="bg-taupe rounded-sm h-2 transition-all"
								style="width: {percentage}%"
							></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:catch error}
		<div class="bg-cream border-l-4 border-error p-4 mb-8">
			<p class="text-sm text-error">{m.match_error_load_metrics()}</p>
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
				<p class="text-slate">Loading recent activity...</p>
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
		{:catch error}
			<div class="bg-cream border-l-4 border-error p-4">
				<p class="text-sm text-error">Failed to load recent activity</p>
			</div>
		{/await}
	</div>
</div>
