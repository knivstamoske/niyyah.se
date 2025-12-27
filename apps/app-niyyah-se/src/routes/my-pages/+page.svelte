<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/client/auth';
	import { Bell } from 'lucide-svelte';

	const notifications = [
		{
			id: 1,
			title: 'Welcome to Niyyah.se',
			description: 'Thanks for joining! We are glad to have you here.',
			date: 'Just now',
			read: false
		},
		{
			id: 2,
			title: 'Complete your profile',
			description: 'Please add more details to your profile to get better matches.',
			date: '1 day ago',
			read: true
		}
	];
</script>

<svelte:head>
	<title>My Pages - Niyyah.se</title>
</svelte:head>

<div class="min-h-screen bg-app-background text-app-text">
	<!-- Navigation -->
	<nav class="bg-white border-b border-app-border">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<a href={resolve('/')} class="text-xl font-bold text-app-primary tracking-tight">
						Niyyah.se
					</a>
				</div>
				<div class="flex items-center gap-4">
					<button
						onclick={() =>
							authClient.signOut({ fetchOptions: { onSuccess: () => goto(resolve('/')) } })}
						class="text-sm font-medium text-app-subtle-text hover:text-app-primary transition-colors"
					>
						Sign Out
					</button>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
		<div class="mb-10">
			<h1 class="text-3xl font-bold mb-2">My Pages</h1>
			<p class="text-app-subtle-text">Manage your account and view notifications</p>
		</div>

		<!-- Content Grid -->
		<div class="space-y-6">
			<!-- Notifications Section -->
			<div class="bg-white rounded-xl shadow-sm border border-app-border overflow-hidden">
				<div class="p-6 border-b border-app-border flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="p-2 bg-blue-50 rounded-lg">
							<Bell class="w-5 h-5 text-app-primary" />
						</div>
						<h2 class="text-lg font-semibold">Notifications</h2>
					</div>
					<span class="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-app-subtle-text">
						{notifications.filter((n) => !n.read).length} New
					</span>
				</div>

				<div class="divide-y divide-app-border">
					{#each notifications as notification (notification.id)}
						<div
							class="p-6 hover:bg-gray-50 transition-colors {notification.read ? 'opacity-70' : ''}"
						>
							<div class="flex items-start gap-4">
								<div class="flex-1">
									<h3 class="font-medium text-app-text mb-1">{notification.title}</h3>
									<p class="text-sm text-app-subtle-text mb-2">{notification.description}</p>
									<span class="text-xs text-app-subtle-text">{notification.date}</span>
								</div>
								{#if !notification.read}
									<div class="w-2 h-2 rounded-full bg-app-primary mt-2"></div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</main>
</div>
