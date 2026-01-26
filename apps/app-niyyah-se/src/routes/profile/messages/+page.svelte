<script lang="ts">
	import { resolve } from '$app/paths';
	import { ChevronLeft, Mail } from 'lucide-svelte';

	// Mock Data
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
</script>

<svelte:head>
	<title>Messages - Niyyah.se</title>
</svelte:head>

<div class="space-y-8">
    <!-- Sub-Header -->
    <div class="flex items-center gap-4">
        <a href={resolve('/profile')} class="p-2 -ml-2 hover:bg-app-primary/5 rounded-sm transition-colors text-app-subtle-text hover:text-app-primary">
            <ChevronLeft class="w-6 h-6" />
        </a>
        <h1 class="text-2xl font-bold tracking-tight text-app-primary">Messages</h1>
    </div>

    <!-- List -->
    <div class="space-y-4">
        {#each messages as message}
            <div class="group bg-white rounded-sm p-6 border border-app-primary/20 hover:border-app-secondary/50 transition-all duration-300 cursor-pointer">
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
        {#if messages.length === 0}
            <div class="text-center py-12 text-app-subtle-text">
                <Mail class="w-12 h-12 mx-auto mb-4 opacity-20 text-app-primary" />
                <p>No messages yet</p>
            </div>
        {/if}
    </div>
</div>
