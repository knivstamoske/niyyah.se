<script lang="ts">
	import { resolve } from '$app/paths';
	import { ChevronLeft, Bell } from 'lucide-svelte';

	// Mock Data (Moved from profile page)
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
</script>

<svelte:head>
	<title>Notifications - Niyyah.se</title>
</svelte:head>

<div class="space-y-8">
    <!-- Sub-Header -->
    <div class="flex items-center gap-4">
        <a href={resolve('/profile')} class="p-2 -ml-2 hover:bg-app-primary/5 rounded-sm transition-colors text-app-subtle-text hover:text-app-primary">
            <ChevronLeft class="w-6 h-6" />
        </a>
        <h1 class="text-2xl font-bold tracking-tight text-app-primary">Notifications</h1>
    </div>

    <!-- List -->
    <div class="space-y-4">
        {#each notifications as notification}
            <div class="group bg-white rounded-sm p-6 border border-app-primary/20 hover:border-app-secondary/50 transition-all duration-300 cursor-pointer flex gap-4 items-start">
                <div class={`w-2 h-2 rounded-full mt-2.5 flex-shrink-0 ${notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <div class="flex-1">
                    <h3 class="font-semibold text-app-text group-hover:text-app-primary transition-colors">{notification.title}</h3>
                    <p class="text-app-subtle-text text-sm mt-1 leading-relaxed">{notification.message}</p>
                    <p class="text-xs text-app-subtle-text/70 mt-3 font-medium">{notification.time}</p>
                </div>
            </div>
        {/each}
        {#if notifications.length === 0}
            <div class="text-center py-12 text-app-subtle-text">
                <Bell class="w-12 h-12 mx-auto mb-4 opacity-20 text-app-primary" />
                <p>No new notifications</p>
            </div>
        {/if}
    </div>
</div>
