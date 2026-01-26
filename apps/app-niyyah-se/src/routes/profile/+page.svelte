<script lang="ts">
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/client/auth';
	import { goto } from '$app/navigation';
	import { LanguagePicker } from '$lib/client/ui';
	import {
		MapPin,
		Calendar,
		Heart,
		User,
		LogOut,
		CheckCircle2,
		Clock,
		AlertCircle,
		ArrowRight,
		Pencil
	} from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	async function handleLogout() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => goto(resolve('/'))
			}
		});
	}

	function getAge(birthYear: number) {
		const currentYear = new Date().getFullYear();
		return currentYear - birthYear;
	}

	function formatText(text: string) {
		return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
	}

	// Status and action items logic
	type UserStatus =
		| 'profile_incomplete'
		| 'waiting_for_match'
		| 'match_found'
		| 'waiting_for_meeting_acceptance'
		| 'meeting_scheduled'
		| 'waiting_for_feedback';

	type ActionItem = {
		title: string;
		description: string;
		href: string;
		urgent: boolean;
	};

	// Mock status - in real app, this would come from the database
	const currentStatus: UserStatus = data.profile ? 'waiting_for_match' : 'profile_incomplete';

	const statusConfig: Record<
		UserStatus,
		{ label: string; description: string; icon: typeof Clock; color: string }
	> = {
		profile_incomplete: {
			label: 'Profile Incomplete',
			description: 'Complete your profile to start matching',
			icon: AlertCircle,
			color: 'text-amber-600'
		},
		waiting_for_match: {
			label: 'Searching for Matches',
			description: 'We are actively looking for compatible matches for you',
			icon: Clock,
			color: 'text-app-primary'
		},
		match_found: {
			label: 'Match Found',
			description: 'We found a compatible match for you',
			icon: Heart,
			color: 'text-app-secondary'
		},
		waiting_for_meeting_acceptance: {
			label: 'Waiting for Response',
			description: 'Your match is reviewing the meeting request',
			icon: Clock,
			color: 'text-app-primary'
		},
		meeting_scheduled: {
			label: 'Meeting Scheduled',
			description: 'Your meeting is confirmed',
			icon: CheckCircle2,
			color: 'text-green-600'
		},
		waiting_for_feedback: {
			label: 'Feedback Required',
			description: 'Please provide feedback about your meeting',
			icon: AlertCircle,
			color: 'text-amber-600'
		}
	};

	// Action items based on status
	const actionItems: ActionItem[] = $derived.by(() => {
		const items: ActionItem[] = [];

		if (!data.profile) {
			items.push({
				title: 'Complete Your Profile',
				description: 'Fill in your basic information to start matching',
				href: '/profile/onboard',
				urgent: true
			});
		} else {
			items.push({
				title: 'Update Profile',
				description: 'Keep your information up to date',
				href: '/profile/edit',
				urgent: false
			});
		}

		// Mock action items - in real app, these would be dynamic
		// items.push({
		// 	title: 'Respond to Meeting Request',
		// 	description: 'Review and accept the proposed meeting time',
		// 	href: '/profile/meetings',
		// 	urgent: true
		// });

		return items;
	});

	const status = $derived(statusConfig[currentStatus]);
</script>

<svelte:head>
	<title>My Profile - Niyyah.se</title>
</svelte:head>

<div
	class="min-h-screen bg-app-background text-app-text font-sans selection:bg-app-primary selection:text-white"
>
	<!-- Header -->
	<header class="border-b border-app-primary/10 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
		<div class="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
			<div class="flex items-center gap-2">
			<a
				href={resolve('/')}
				class="flex items-center hover:opacity-80 transition-opacity"
			>
				<img
					src="/logo/logo-wide.png"
					alt="Niyyah.se"
					class="h-8 object-contain"
				/>
			</a>
		</div>

			<div class="flex items-center gap-6">
				<div class="hidden md:block">
					<LanguagePicker />
				</div>
			</div>
		</div>
	</header>

	<main class="max-w-5xl mx-auto px-6 py-12">
		<div class="space-y-16">
			<!-- Welcome Section -->
			<section class="space-y-6">
				<h1 class="text-4xl md:text-5xl font-light text-app-primary tracking-tight">
					Welcome back, <span class="font-semibold text-app-text">{data.user?.name}</span>
				</h1>
			</section>

			<!-- Status Section -->
			<section class="space-y-4">
				<h2 class="text-sm uppercase tracking-widest text-app-subtle-text font-medium">
					Current Status
				</h2>
				<div
					class="bg-white border-l-4 border-app-primary p-6 flex items-start gap-4 hover:border-app-secondary transition-colors duration-300"
				>
					<svelte:component this={status.icon} class="w-6 h-6 {status.color} flex-shrink-0 mt-1" />
					<div class="flex-1">
						<h3 class="text-xl font-semibold text-app-text mb-1">{status.label}</h3>
						<p class="text-app-subtle-text leading-relaxed">{status.description}</p>
					</div>
				</div>
			</section>

			<!-- Action Items -->
			{#if actionItems.length > 0}
				<section class="space-y-4">
					<h2 class="text-sm uppercase tracking-widest text-app-subtle-text font-medium">
						Action Items
					</h2>
					<div class="space-y-3">
						{#each actionItems as item}
							<a
								href={resolve(item.href)}
								class="block group bg-white border border-app-primary/20 p-6 hover:border-app-secondary transition-all duration-300"
							>
								<div class="flex items-center justify-between">
									<div class="flex-1">
										<div class="flex items-center gap-3 mb-1">
											<h3 class="text-lg font-semibold text-app-text group-hover:text-app-primary transition-colors">
												{item.title}
											</h3>
											{#if item.urgent}
												<span
													class="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded-sm"
												>
													URGENT
												</span>
											{/if}
										</div>
										<p class="text-app-subtle-text">{item.description}</p>
									</div>
									<ArrowRight
										class="w-5 h-5 text-app-subtle-text group-hover:text-app-secondary group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"
									/>
								</div>
							</a>
						{/each}
					</div>
				</section>
			{/if}

			<!-- Profile Information -->
			{#if data.profile}
				<section class="space-y-4">
					<div class="flex items-center justify-between">
						<h2 class="text-sm uppercase tracking-widest text-app-subtle-text font-medium">
							Profile Information
						</h2>
						<a
							href="/profile/edit"
							class="text-sm font-medium text-app-primary hover:text-app-secondary flex items-center gap-1.5 transition-colors"
						>
							<Pencil class="w-3.5 h-3.5" />
							Edit
						</a>
					</div>

					<div class="bg-white border border-app-primary/20 p-8">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
							<!-- Location -->
							<div class="space-y-2">
								<div class="flex items-center gap-2 text-app-subtle-text">
									<MapPin class="w-4 h-4 text-app-secondary" />
									<p class="text-xs uppercase tracking-widest font-medium">Location</p>
								</div>
								<p class="text-lg font-medium text-app-text pl-6">
									{formatText(data.profile.kommun)}
								</p>
							</div>

							<!-- Age -->
							<div class="space-y-2">
								<div class="flex items-center gap-2 text-app-subtle-text">
									<Calendar class="w-4 h-4 text-app-secondary" />
									<p class="text-xs uppercase tracking-widest font-medium">Age</p>
								</div>
								<p class="text-lg font-medium text-app-text pl-6">
									{getAge(data.profile.birthYear)} years
								</p>
							</div>

							<!-- Gender -->
							<div class="space-y-2">
								<div class="flex items-center gap-2 text-app-subtle-text">
									<User class="w-4 h-4 text-app-secondary" />
									<p class="text-xs uppercase tracking-widest font-medium">Gender</p>
								</div>
								<p class="text-lg font-medium text-app-text pl-6">
									{formatText(data.profile.gender)}
								</p>
							</div>

							<!-- Marital Status -->
							<div class="space-y-2">
								<div class="flex items-center gap-2 text-app-subtle-text">
									<Heart class="w-4 h-4 text-app-secondary" />
									<p class="text-xs uppercase tracking-widest font-medium">Marital Status</p>
								</div>
								<p class="text-lg font-medium text-app-text pl-6">
									{formatText(data.profile.maritalStatus)}
								</p>
							</div>
						</div>
					</div>
				</section>
			{:else}
				<section class="space-y-4">
					<h2 class="text-sm uppercase tracking-widest text-app-subtle-text font-medium">
						Profile Information
					</h2>
					<div
						class="bg-white border border-app-primary/20 p-12 text-center hover:border-app-secondary/50 transition-colors duration-300"
					>
						<User class="w-12 h-12 text-app-subtle-text mx-auto mb-4" />
						<p class="text-app-subtle-text mb-4">Your profile is incomplete</p>
						<a
							href={resolve('/profile/onboard')}
							class="inline-flex items-center gap-2 px-6 py-3 bg-app-primary text-white font-medium hover:bg-app-secondary transition-colors"
						>
							Complete Profile
							<ArrowRight class="w-4 h-4" />
						</a>
					</div>
				</section>
			{/if}

			<!-- Logout Section -->
			<section class="pt-8 border-t border-app-primary/10">
				<button
					onclick={handleLogout}
					class="flex items-center gap-3 px-6 py-3 text-app-subtle-text hover:text-app-primary hover:bg-app-primary/5 transition-all rounded-sm group"
				>
					<LogOut class="w-5 h-5 group-hover:scale-110 transition-transform" />
					<span class="font-medium">Sign Out</span>
				</button>
			</section>
		</div>
	</main>
</div>
