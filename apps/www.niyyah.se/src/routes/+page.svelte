<script lang="ts">
	import { Heart, Facebook, Twitter, Instagram } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Niyyah - The Future of Halal Matchmaking in Sweden</title>
	<meta
		name="description"
		content="A dedicated platform for Swedish Muslims to find a compatible partner in accordance with Islamic values."
	/>
</svelte:head>

<div class="min-h-screen flex flex-col bg-background-dark text-text-dark">
	<!-- Main Content -->
	<main class="flex-1 flex flex-col">
		<!-- Hero Image -->
		<div class="px-4 py-3">
			<div
				class="w-full bg-gradient-to-br from-[#004B87] to-[#003366] min-h-60 rounded-xl relative overflow-hidden"
			>
				<!-- Decorative pattern placeholders -->
				<div class="absolute top-0 right-0 w-1/2 h-1/2 opacity-30">
					<div class="absolute inset-0 bg-gradient-radial from-[#FFD700]/20 to-transparent"></div>
				</div>
				<div class="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-30">
					<div class="absolute inset-0 bg-gradient-radial from-[#FFD700]/20 to-transparent"></div>
				</div>
			</div>
		</div>

		<!-- Headline -->
		<h1 class="text-3xl font-bold leading-tight px-4 text-center pb-3 pt-6">
			The Future of Halal Matchmaking in Sweden is Coming.
		</h1>

		<!-- Description -->
		<p
			class="text-subtle-text-dark text-base leading-relaxed pb-3 pt-1 px-4 text-center max-w-md mx-auto"
		>
			We are building a dedicated platform for Swedish Muslims to find a compatible partner in
			accordance with Islamic values. Our app is currently in development.
		</p>

		<div class="flex-grow"></div>

		<!-- Waitlist Section -->
		<div class="px-4 py-6 mt-6">
			<h2 class="text-lg font-bold leading-tight px-4 text-center pb-4 pt-4">
				Be the first to know when we launch.
			</h2>

			<!-- Form -->
			<form class="flex flex-col gap-4 max-w-sm mx-auto">
				<label class="flex flex-col w-full">
					<span class="sr-only">Email address</span>
					<input
						type="email"
						placeholder="Enter your email"
						class="w-full h-14 px-4 rounded-lg bg-gray-800/50 border border-gray-700 text-text-dark placeholder:text-subtle-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
					/>
				</label>

				<button
					type="submit"
					class="h-14 px-6 rounded-lg w-full bg-primary text-white font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-dark transition-colors"
				>
					Join the Waitlist
				</button>
			</form>

			<!-- Social Proof -->
			<p class="text-subtle-text-dark text-sm pt-4 px-4 text-center">
				Join hundreds of others on the waitlist.
			</p>

			<!-- Privacy Notice -->
			<p class="text-subtle-text-dark text-xs pt-2 px-4 text-center">
				We respect your privacy. No spam.
			</p>
		</div>
	</main>

	<!-- Footer -->
	<footer class="bg-[#1A2B34] text-text-dark py-10 px-6">
		<div class="max-w-md mx-auto">
			<!-- Brand Section -->
			<div class="flex flex-col items-center text-center">
				<div class="flex items-center gap-3">
					<Heart class="text-accent-green" size={32} />
					<h3 class="text-xl font-bold">Muslim Matchmaking</h3>
				</div>
				<p class="mt-2 text-sm text-gray-400">
					Connecting hearts in Sweden, guided by Islamic principles.
				</p>
			</div>

			<!-- Links Grid -->
			<div class="grid grid-cols-2 gap-8 mt-10 text-center">
				<!-- Company Column -->
				<div>
					<h4 class="font-bold text-white mb-4">Company</h4>
					<ul class="space-y-3">
						<li>
							<a href="#" class="text-text-dark hover:text-accent-green text-sm transition-colors">
								About Us
							</a>
						</li>
						<li>
							<a href="#" class="text-text-dark hover:text-accent-green text-sm transition-colors">
								Our Values
							</a>
						</li>
						<li>
							<a href="#" class="text-text-dark hover:text-accent-green text-sm transition-colors">
								Contact Us
							</a>
						</li>
					</ul>
				</div>

				<!-- Legal Column -->
				<div>
					<h4 class="font-bold text-white mb-4">Legal</h4>
					<ul class="space-y-3">
						<li>
							<a href="#" class="text-text-dark hover:text-accent-green text-sm transition-colors">
								Terms of Service
							</a>
						</li>
						<li>
							<a href="#" class="text-text-dark hover:text-accent-green text-sm transition-colors">
								Privacy Policy
							</a>
						</li>
						<li>
							<a href="#" class="text-text-dark hover:text-accent-green text-sm transition-colors">
								Cookie Policy
							</a>
						</li>
					</ul>
				</div>
			</div>

			<!-- GDPR Notice -->
			<div class="mt-10 pt-6 border-t border-gray-700 text-center">
				<p class="text-xs text-gray-400">
					We are fully compliant with GDPR. Your data privacy is our priority. For more information,
					please see our
					<a href="#" class="underline hover:text-accent-green transition-colors">Privacy Policy</a
					>.
				</p>
			</div>

			<!-- Social Links -->
			<div class="flex justify-center gap-6 mt-6">
				<a href="#" class="text-gray-400 hover:text-accent-green transition-colors">
					<Facebook size={24} />
					<span class="sr-only">Facebook</span>
				</a>
				<a href="#" class="text-gray-400 hover:text-accent-green transition-colors">
					<Twitter size={24} />
					<span class="sr-only">Twitter</span>
				</a>
				<a href="#" class="text-gray-400 hover:text-accent-green transition-colors">
					<Instagram size={24} />
					<span class="sr-only">Instagram</span>
				</a>
			</div>

			<!-- Copyright -->
			<div class="mt-8 text-center">
				<p class="text-xs text-gray-500">© 2024 Muslim Matchmaking Sweden. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
