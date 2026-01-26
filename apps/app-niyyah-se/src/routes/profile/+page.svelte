<script lang="ts">
	import { authClient } from '$lib/client/auth';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { LanguagePicker } from '$lib/client/ui';
	import {
		LogOut,
		MapPin,
		Calendar,
		Heart,
		Bell,
		Mail,
		User,
		ChevronRight,
		Settings
	} from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Mock Data
	const notifications = [
		{
			id: 1,
			title: 'Profile Verified',
			message: 'Your profile has been verified successfully.',
			time: '2 hours ago',
			type: 'success'
		},
		{
			id: 2,
			title: 'New Match Suggestion',
			message: 'We have found a potential match for you based on your preferences.',
			time: '1 day ago',
			type: 'info'
		}
	];

	const messages = [
		{
			id: 1,
			sender: 'Matchmaker',
			preview: 'Hello! I have reviewed your profile and I have a few questions regarding...',
			time: '3 hours ago',
			unread: true
		},
		{
			id: 2,
			sender: 'Support Team',
			preview: 'Welcome to Niyyah.se! Let us know if you need any help getting started.',
			time: '2 days ago',
			unread: false
		}
	];

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
</script>

<svelte:head>
	<title>My Profile - Niyyah.se</title>
</svelte:head>

<div class="min-h-screen bg-app-background text-app-text font-sans selection:bg-app-primary selection:text-white">
	<!-- Header -->
	<header class="border-b border-app-border/40 bg-white/50 backdrop-blur-xl sticky top-0 z-50">
		<div class="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
			<div class="flex items-center gap-2">
				<a href={resolve('/')} class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-app-primary to-app-primary/70 tracking-tight">
					Niyyah.se
				</a>
			</div>

			<div class="flex items-center gap-6">
				<div class="hidden md:block">
					<LanguagePicker />
				</div>
				<button
					onclick={handleLogout}
					class="flex items-center gap-2 text-sm font-medium text-app-subtle-text hover:text-app-primary transition-all duration-300 hover:bg-app-primary/5 px-4 py-2 rounded-full group"
				>
					<LogOut class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
				</button>
			</div>
		</div>
	</header>

	<main class="max-w-5xl mx-auto px-6 py-12 space-y-16">
		<!-- Welcome Section -->
		<section class="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
			<h1 class="text-4xl md:text-5xl font-bold text-app-text tracking-tight">
				Welcome back, <span class="text-app-primary">{data.user?.name}</span>
			</h1>
			<p class="text-lg text-app-subtle-text font-light max-w-2xl leading-relaxed">
				Manage your profile, view your matches, and stay updated with your latest notifications.
			</p>
		</section>

		<!-- Dashboard Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
			<!-- Left Column: Profile Overview -->
			<div class="lg:col-span-4 space-y-12">
				<section class="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
					<div class="flex items-center gap-3 mb-2">
						<div class="p-2 bg-app-primary/10 rounded-xl text-app-primary">
							<User class="w-5 h-5" />
						</div>
						<h2 class="text-xl font-semibold tracking-tight">My Profile</h2>
					</div>

					<div class="bg-white rounded-3xl p-8 border border-app-border/40 hover:border-app-primary/20 transition-all duration-500 group relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-app-primary/5 to-transparent rounded-bl-[60px] -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-110"></div>

						{#if data.profile}
							<div class="space-y-6 relative">
								<div class="flex items-start gap-4">
									<div class="flex-1 space-y-1">
										<p class="text-sm text-app-subtle-text font-medium uppercase tracking-wider">Location</p>
										<div class="flex items-center gap-2 text-app-text">
											<MapPin class="w-4 h-4 text-app-primary" />
											<span class="font-medium">{formatText(data.profile.kommun)}</span>
										</div>
									</div>
								</div>

								<div class="w-full h-px bg-app-border/30"></div>

								<div class="flex items-start gap-4">
									<div class="flex-1 space-y-1">
										<p class="text-sm text-app-subtle-text font-medium uppercase tracking-wider">Personal Details</p>
										<div class="space-y-2">
											<div class="flex items-center gap-2 text-app-text">
												<Calendar class="w-4 h-4 text-app-primary" />
												<span class="font-medium">{getAge(data.profile.birthYear)} years old</span>
											</div>
											<div class="flex items-center gap-2 text-app-text">
												<User class="w-4 h-4 text-app-primary" />
												<span class="font-medium">{formatText(data.profile.gender)}</span>
											</div>
											<div class="flex items-center gap-2 text-app-text">
												<Heart class="w-4 h-4 text-app-primary" />
												<span class="font-medium">{formatText(data.profile.maritalStatus)}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						{:else}
							<div class="text-center py-8">
								<p class="text-app-subtle-text">Profile incomplete</p>
								<a href={resolve('/profile/onboard')} class="text-app-primary hover:underline mt-2 inline-block">Complete Setup</a>
							</div>
						{/if}
					</div>
				</section>
			</div>

			<!-- Right Column: Notifications & Messages -->
			<div class="lg:col-span-8 space-y-12">

				<!-- Notifications -->
				<section class="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
					<div class="flex items-center justify-between mb-2">
						<div class="flex items-center gap-3">
							<div class="p-2 bg-orange-50 rounded-xl text-orange-600">
								<Bell class="w-5 h-5" />
							</div>
							<h2 class="text-xl font-semibold tracking-tight">Notifications</h2>
						</div>
						<span class="text-xs font-semibold px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full">{notifications.length} New</span>
					</div>

					<div class="space-y-4">
						{#each notifications as notification}
							<div class="group bg-white rounded-2xl p-6 border border-app-border/40 hover:border-app-primary/20 transition-all duration-300 hover:bg-gray-50/50 cursor-pointer flex gap-4 items-start">
								<div class={`w-2 h-2 rounded-full mt-2.5 flex-shrink-0 ${notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
								<div class="flex-1">
									<h3 class="font-semibold text-app-text group-hover:text-app-primary transition-colors">{notification.title}</h3>
									<p class="text-app-subtle-text text-sm mt-1 leading-relaxed">{notification.message}</p>
									<p class="text-xs text-app-subtle-text/70 mt-3 font-medium">{notification.time}</p>
								</div>
								<ChevronRight class="w-5 h-5 text-gray-300 group-hover:text-app-primary transition-colors opacity-0 group-hover:opacity-100" />
							</div>
						{/each}
					</div>
				</section>

				<!-- Messages -->
				<section class="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
					<div class="flex items-center justify-between mb-2">
						<div class="flex items-center gap-3">
							<div class="p-2 bg-purple-50 rounded-xl text-purple-600">
								<Mail class="w-5 h-5" />
							</div>
							<h2 class="text-xl font-semibold tracking-tight">Messages</h2>
						</div>
					</div>

					<div class="space-y-4">
						{#each messages as message}
							<div class="group bg-white rounded-2xl p-6 border border-app-border/40 hover:border-app-primary/20 transition-all duration-300 hover:bg-gray-50/50 cursor-pointer">
								<div class="flex justify-between items-start mb-2">
									<div class="flex items-center gap-2">
										<h3 class="font-semibold text-app-text group-hover:text-app-primary transition-colors">{message.sender}</h3>
										{#if message.unread}
											<span class="w-2 h-2 bg-app-primary rounded-full animate-pulse"></span>
										{/if}
									</div>
									<span class="text-xs text-app-subtle-text font-medium">{message.time}</span>
								</div>
								<p class="text-app-subtle-text text-sm line-clamp-1 leading-relaxed group-hover:text-app-text transition-colors">{message.preview}</p>
							</div>
						{/each}
					</div>
				</section>
			</div>
		</div>
	</main>
</div>
