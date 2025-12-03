<script lang="ts">
	import { Heart, Facebook, Twitter, Instagram } from 'lucide-svelte';
	import { joinWaitlist } from './waitlist.remote';
</script>

<svelte:head>
	<title>Niyyah.se - Halal Matchmaking in Sweden</title>
	<meta
		name="description"
		content="A dedicated platform for Muslims in Sweden to find a compatible partner in accordance with Islamic values."
	/>
</svelte:head>

<div class="min-h-screen flex flex-col bg-background text-text">
	<!-- Main Content -->
	<main class="flex-1 flex flex-col">
		<!-- Hero Image -->
		<div class="px-4 py-3">
			<div class="w-full rounded-xl overflow-hidden">
				<img
					src="/hero-family.png"
					alt="Muslim couple with child"
					class="w-full h-auto object-cover"
				/>
			</div>
		</div>

		<!-- Headline -->
		<h1 class="text-3xl font-bold leading-tight px-4 text-center pb-3 pt-6">Halal Matchmaking</h1>

		<!-- Description -->
		<p
			class="text-subtle-text text-base leading-relaxed pb-3 pt-1 px-4 text-center max-w-md mx-auto"
		>
			A platform for Muslims in Sweden to find a compatible partner in accordance with Islamic
			values.
		</p>

		<div class="flex-grow"></div>

		<!-- Waitlist Section -->
		<div class="px-4 py-6 mt-6">
			<h2 class="text-lg font-bold leading-tight px-4 text-center pb-4 pt-4">
				Be the first to know when we launch.
			</h2>

			<!-- Form -->
			<form {...joinWaitlist} class="flex flex-col gap-4 max-w-sm mx-auto">
				<label class="flex flex-col w-full">
					<span class="sr-only">Email address</span>
					<input
						{...joinWaitlist.fields.email.as('email')}
						placeholder="Enter your email"
						class="w-full h-14 px-4 rounded-lg bg-white border-2 border-border text-text placeholder:text-subtle-text focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
					/>
					{#each joinWaitlist.fields.email.issues() as issue}
						<p class="text-sm text-red-600 mt-1">{issue.message}</p>
					{/each}
				</label>

				<button
					type="submit"
					class="h-14 px-6 rounded-lg w-full bg-primary text-white font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={!!joinWaitlist.pending}
				>
					{joinWaitlist.pending ? 'Joining...' : 'Join the Waitlist'}
				</button>
			</form>

			<!-- Success/Error Messages -->
			{#if joinWaitlist.result}
				<p
					class="text-center mt-4 text-sm {joinWaitlist.result.success
						? 'text-green-600'
						: 'text-red-600'}"
				>
					{joinWaitlist.result.message}
				</p>
			{/if}

			<!-- Social Proof -->
			<p class="text-subtle-text text-sm pt-4 px-4 text-center">
				Be among the first to join when we launch.
			</p>

			<!-- Privacy Notice -->
			<p class="text-subtle-text text-xs pt-2 px-4 text-center">
				We respect your privacy. No spam.
			</p>
		</div>
	</main>

	<!-- Footer -->
	<footer class="bg-footer-bg text-white py-10 px-6">
		<div class="max-w-md mx-auto">
			<!-- Brand Section -->
			<div class="flex flex-col items-center text-center">
				<div class="flex items-center gap-3">
					<Heart class="text-secondary" size={24} />
					<h3 class="text-xl font-bold">Niyyah.se</h3>
				</div>
				<p class="mt-2 text-sm text-gray-400">Connecting hearts, guided by Islamic principles</p>
			</div>

			<!-- Social Links -->
			<div class="flex justify-center gap-6 mt-6">
				<a href="#" class="text-gray-400 hover:text-secondary transition-colors">
					<Facebook size={24} />
					<span class="sr-only">Facebook</span>
				</a>
				<a href="#" class="text-gray-400 hover:text-secondary transition-colors">
					<Twitter size={24} />
					<span class="sr-only">Twitter</span>
				</a>
				<a href="#" class="text-gray-400 hover:text-secondary transition-colors">
					<Instagram size={24} />
					<span class="sr-only">Instagram</span>
				</a>
			</div>

			<!-- Copyright -->
			<div class="mt-8 text-center">
				<p class="text-xs text-gray-500">© 2024 Niyyah.se. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
