<script lang="ts">
	import { authClient } from '$lib/client/auth';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Dashboard - Niyyah.se</title>
</svelte:head>


	<div class="min-h-screen bg-app-background text-app-text">
		<!-- Navigation -->
		<nav class="bg-white border-b border-app-border">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex items-center">
						<a href="/" class="text-xl font-bold text-app-primary"> Niyyah.se </a>
					</div>
					<div class="flex items-center gap-4">
						<a href="/profile" class="text-app-text hover:text-app-primary"> Profile </a>
						<button
							on:click={() => authClient.signOut({ fetchOptions: { onSuccess: () => goto('/') } })}
							class="btn btn-sm border-app-border"
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</nav>

		<!-- Main Content -->
		<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="mb-8">
				<h1 class="text-3xl font-bold mb-2">
					Welcome, {data.user.name || 'User'}
				</h1>
				<p class="text-app-subtle-text">Manage your profile and track your progress</p>
			</div>

			<!-- Dashboard Cards -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<!-- Profile Status Card -->
				<div class="bg-white rounded-lg shadow-sm border border-app-border p-6">
					<h2 class="text-lg font-semibold mb-2">Profile Status</h2>
					<p class="text-app-subtle-text text-sm mb-4">Complete your profile to get started</p>
					<div class="flex items-center gap-2 mb-4">
						<div class="flex-1 bg-gray-200 rounded-full h-2">
							<div class="bg-app-primary h-2 rounded-full" style="width: 25%"></div>
						</div>
						<span class="text-sm font-medium">25%</span>
					</div>
					<a href="/profile" class="btn btn-sm bg-app-primary text-app-background border-0 w-full">
						Complete Profile
					</a>
				</div>

				<!-- Applications Card -->
				<div class="bg-white rounded-lg shadow-sm border border-app-border p-6">
					<h2 class="text-lg font-semibold mb-2">Applications</h2>
					<p class="text-app-subtle-text text-sm mb-4">No applications yet</p>
					<div class="text-center py-4">
						<p class="text-4xl font-bold text-app-primary">0</p>
						<p class="text-sm text-app-subtle-text mt-1">Active Applications</p>
					</div>
				</div>

				<!-- Notifications Card -->
				<div class="bg-white rounded-lg shadow-sm border border-app-border p-6">
					<h2 class="text-lg font-semibold mb-2">Notifications</h2>
					<p class="text-app-subtle-text text-sm mb-4">Stay updated on your matches</p>
					<div class="text-center py-4">
						<p class="text-4xl font-bold text-app-subtle-text">0</p>
						<p class="text-sm text-app-subtle-text mt-1">New Notifications</p>
					</div>
				</div>
			</div>

			<!-- Quick Actions -->
			<div class="mt-8 bg-white rounded-lg shadow-sm border border-app-border p-6">
				<h2 class="text-lg font-semibold mb-4">Quick Actions</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<a href="/profile" class="btn btn-outline border-app-border hover:border-app-primary">
						Edit Profile
					</a>
					<button class="btn btn-outline border-app-border" disabled> Submit Application </button>
					<button class="btn btn-outline border-app-border" disabled> View Matches </button>
				</div>
			</div>
		</main>
	</div>
