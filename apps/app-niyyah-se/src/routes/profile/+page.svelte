<script lang="ts">
	import { resolve } from '$app/paths';
	import { MapPin, Calendar, User, ArrowRight, Pencil, Heart } from 'lucide-svelte';
	import { STATUS_CONFIG } from '$lib/client/domain/user-status';
	import { getAge, capitalize } from '$lib/shared/utils/formatters';
	import { ACTION_ITEM_MAP } from '$lib/client/domain/action-items';
	import { getActions } from './getActions.remote';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const status = $derived(STATUS_CONFIG[data.userStatus]);
	const actionItemKeys = $derived(await getActions());
	const actionItems = $derived(actionItemKeys.map((key) => ACTION_ITEM_MAP[key]));
</script>

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
			<status.icon class="w-6 h-6 {status.color} flex-shrink-0 mt-1" />
			<div class="flex-1">
				<h3 class="text-xl font-semibold text-app-text mb-1">{status.label}</h3>
				<p class="text-app-subtle-text leading-relaxed">{status.description}</p>
			</div>
		</div>
	</section>

	<!-- Action Items -->
	<section class="space-y-4">
		<h2 class="text-sm uppercase tracking-widest text-app-subtle-text font-medium">
			Action Items
		</h2>
		{#if actionItems.length > 0}
			<div class="space-y-3">
				{#each actionItems as item}
					<a
						href={resolve(item.href)}
						class="block group bg-white border border-app-primary/20 p-6 hover:border-app-secondary transition-all duration-300"
					>
						<div class="flex items-center justify-between">
							<div class="flex-1">
								<h3
									class="text-lg font-semibold text-app-text group-hover:text-app-primary transition-colors mb-1"
								>
									{item.title}
								</h3>
								<p class="text-app-subtle-text">{item.description}</p>
							</div>
							<ArrowRight
								class="w-5 h-5 text-app-subtle-text group-hover:text-app-secondary group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"
							/>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div
				class="bg-white border border-app-primary/20 p-12 text-center hover:border-app-secondary/50 transition-colors duration-300"
			>
				<p class="text-app-subtle-text">
					We'll notify you when there's something to do!
				</p>
			</div>
		{/if}
	</section>

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
							{capitalize(data.profile.kommun)}
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
							{capitalize(data.profile.gender)}
						</p>
					</div>

					<!-- Marital Status -->
					<div class="space-y-2">
						<div class="flex items-center gap-2 text-app-subtle-text">
							<Heart class="w-4 h-4 text-app-secondary" />
							<p class="text-xs uppercase tracking-widest font-medium">Marital Status</p>
						</div>
						<p class="text-lg font-medium text-app-text pl-6">
							{capitalize(data.profile.maritalStatus)}
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
</div>
