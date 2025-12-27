<script lang="ts">
	import { authClient } from '$lib/client/auth';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Profile - Niyyah.se</title>
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
						<a href="/dashboard" class="text-app-text hover:text-app-primary"> Dashboard </a>
						<button on:click={() => authClient.signOut()} class="btn btn-sm border-app-border">
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</nav>

		<!-- Main Content -->
		<main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="mb-8">
				<h1 class="text-3xl font-bold mb-2">Your Profile</h1>
				<p class="text-app-subtle-text">Manage your account information</p>
			</div>

			<!-- Profile Information -->
			<div class="bg-white rounded-lg shadow-sm border border-app-border">
				<!-- Account Details Section -->
				<div class="p-6 border-b border-app-border">
					<h2 class="text-xl font-semibold mb-4">Account Details</h2>
					<div class="space-y-4">
						<div>
							<label class="block text-sm font-medium text-app-subtle-text mb-1"> Full Name </label>
							<p class="text-app-text font-medium">{data.user.name || 'Not set'}</p>
						</div>
						<div>
							<label class="block text-sm font-medium text-app-subtle-text mb-1">
								Email Address
							</label>
							<p class="text-app-text font-medium">{data.user.email}</p>
						</div>
						<div>
							<label class="block text-sm font-medium text-app-subtle-text mb-1">
								Email Verified
							</label>
							<p class="text-app-text font-medium">
								{data.user.emailVerified ? '✓ Verified' : '✗ Not verified'}
							</p>
						</div>
					</div>
				</div>

				<!-- Profile Completion Section -->
				<div class="p-6 border-b border-app-border">
					<h2 class="text-xl font-semibold mb-4">Profile Completion</h2>
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<span class="text-sm">Account Created</span>
							<span class="text-sm text-green-600 font-medium">✓ Complete</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm">Email Verified</span>
							<span
								class="text-sm {$user.emailVerified
									? 'text-green-600'
									: 'text-yellow-600'} font-medium"
							>
								{data.user.emailVerified ? '✓ Complete' : '⚠ Pending'}
							</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm">Personal Information</span>
							<span class="text-sm text-gray-400 font-medium">Coming Soon</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm">Profile Details</span>
							<span class="text-sm text-gray-400 font-medium">Coming Soon</span>
						</div>
					</div>
				</div>

				<!-- Coming Soon Sections -->
				<div class="p-6 bg-gray-50">
					<div class="text-center py-8">
						<h3 class="text-lg font-semibold mb-2">More Features Coming Soon</h3>
						<p class="text-app-subtle-text text-sm mb-4">
							We're working on adding profile editing, preferences, and more.
						</p>
						<div class="flex flex-wrap gap-2 justify-center">
							<span class="px-3 py-1 bg-white border border-app-border rounded-full text-xs">
								Personal Info
							</span>
							<span class="px-3 py-1 bg-white border border-app-border rounded-full text-xs">
								Preferences
							</span>
							<span class="px-3 py-1 bg-white border border-app-border rounded-full text-xs">
								Guardian Assignment
							</span>
							<span class="px-3 py-1 bg-white border border-app-border rounded-full text-xs">
								Privacy Settings
							</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Actions -->
			<div class="mt-6">
				<a href="/dashboard" class="btn btn-outline border-app-border"> ← Back to Dashboard </a>
			</div>
		</main>
	</div>
