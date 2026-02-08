<script lang="ts">
	import { getDashboardMetrics } from './getDashboardMetrics.remote';
	import { getRecentActivity } from './getRecentActivity.remote';

	/**
	 * STATUS_LABELS maps candidate status enum values to human-readable labels.
	 */
	const STATUS_LABELS: Record<string, string> = {
		onboarding: 'Onboarding',
		verifying: 'Pending Verification',
		active: 'Active',
		paused: 'Paused',
		matched: 'Matched',
		archived: 'Archived',
		banned: 'Banned'
	};

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
	 * formatRelativeTime formats a date as a relative time string (e.g., "2 hours ago").
	 */
	function formatRelativeTime(date: Date): string {
		const now = new Date();
		const diffMs = now.getTime() - new Date(date).getTime();
		const diffSec = Math.floor(diffMs / 1000);
		const diffMin = Math.floor(diffSec / 60);
		const diffHour = Math.floor(diffMin / 60);
		const diffDay = Math.floor(diffHour / 24);

		if (diffSec < 60) return 'just now';
		if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
		if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
		if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
		return new Date(date).toLocaleDateString();
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
	<title>Dashboard | Admin Portal</title>
</svelte:head>

<div class="min-h-screen bg-white text-midnyt">
	<div class="mx-auto max-w-7xl px-4 py-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold">Dashboard</h1>
			<p class="text-slate mt-2">Platform overview and recent activity</p>
		</div>

		{#await getDashboardMetrics()}
			<div class="text-center py-12">
				<p class="text-slate">Loading dashboard metrics...</p>
			</div>
		{:then metrics}
			<!-- Platform Metrics Cards -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				<!-- Total Candidates -->
				<div class="bg-cream border border-taupe/20 rounded-md p-6">
					<div class="text-sm text-slate mb-1">Total Candidates</div>
					<div class="text-3xl font-bold text-midnyt">{metrics.totalCandidates}</div>
					<div class="text-xs text-slate mt-2">
						{metrics.newRegistrations30d} new in last 30 days
					</div>
				</div>

				<!-- Pending Verifications -->
				<div class="bg-cream border border-taupe/20 rounded-md p-6">
					<div class="text-sm text-slate mb-1">Pending Verifications</div>
					<div class="text-3xl font-bold text-warning">{metrics.pendingVerifications}</div>
					<div class="text-xs text-slate mt-2">Requires attention</div>
				</div>

				<!-- Active Candidates -->
				<div class="bg-cream border border-taupe/20 rounded-md p-6">
					<div class="text-sm text-slate mb-1">Active Candidates</div>
					<div class="text-3xl font-bold text-success">{metrics.activeCandidates}</div>
					<div class="text-xs text-slate mt-2">Ready for matching</div>
				</div>

				<!-- Paused Candidates -->
				<div class="bg-cream border border-taupe/20 rounded-md p-6">
					<div class="text-sm text-slate mb-1">Paused Candidates</div>
					<div class="text-3xl font-bold text-slate">{metrics.pausedCandidates}</div>
					<div class="text-xs text-slate mt-2">Temporarily inactive</div>
				</div>
			</div>

			<!-- Two Column Layout for Charts -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
				<!-- Candidate Lifecycle Funnel -->
				<div class="bg-white border border-taupe/20 rounded-md p-6">
					<h2 class="text-xl font-bold mb-4">Candidate Lifecycle</h2>
					<div class="space-y-3">
						{#each metrics.candidatesByStatus as { status, count }}
							{@const percentage = calculatePercentage(count, metrics.totalCandidates)}
							<div>
								<div class="flex justify-between text-sm mb-1">
									<span class="font-medium">{STATUS_LABELS[status] || status}</span>
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
					<h2 class="text-xl font-bold mb-4">Gender Distribution</h2>
					<div class="space-y-4">
						<!-- Male -->
						<div>
							<div class="flex justify-between text-sm mb-1">
								<span class="font-medium">Male</span>
								<span class="text-slate">
									{metrics.maleCandidates} ({calculatePercentage(metrics.maleCandidates, metrics.totalCandidates)}%)
								</span>
							</div>
							<div class="bg-cream rounded-sm h-2">
								<div
									class="bg-midnyt rounded-sm h-2 transition-all"
									style="width: {calculatePercentage(metrics.maleCandidates, metrics.totalCandidates)}%"
								></div>
							</div>
						</div>

						<!-- Female -->
						<div>
							<div class="flex justify-between text-sm mb-1">
								<span class="font-medium">Female</span>
								<span class="text-slate">
									{metrics.femaleCandidates} ({calculatePercentage(metrics.femaleCandidates, metrics.totalCandidates)}%)
								</span>
							</div>
							<div class="bg-cream rounded-sm h-2">
								<div
									class="bg-bronze rounded-sm h-2 transition-all"
									style="width: {calculatePercentage(metrics.femaleCandidates, metrics.totalCandidates)}%"
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Geographic Distribution -->
			<div class="bg-white border border-taupe/20 rounded-md p-6 mb-8">
				<h2 class="text-xl font-bold mb-4">Geographic Distribution (Top 10 Kommuner)</h2>
				<div class="space-y-3">
					{#each metrics.candidatesByKommun as { kommun, count }}
						{@const percentage = calculatePercentage(count, metrics.totalCandidates)}
						<div>
							<div class="flex justify-between text-sm mb-1">
								<span class="font-medium">{kommun}</span>
								<span class="text-slate">{count} candidates ({percentage}%)</span>
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
				<p class="text-sm text-error">Failed to load dashboard metrics</p>
			</div>
		{/await}

		<!-- Recent Activity Feed -->
		<div class="bg-white border border-taupe/20 rounded-md p-6">
			<h2 class="text-xl font-bold mb-4">Recent Activity</h2>
			{#await getRecentActivity()}
				<div class="text-center py-8">
					<p class="text-slate">Loading recent activity...</p>
				</div>
			{:then activities}
				{#if activities.length === 0}
					<p class="text-slate text-center py-8">No recent activity</p>
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
</div>
