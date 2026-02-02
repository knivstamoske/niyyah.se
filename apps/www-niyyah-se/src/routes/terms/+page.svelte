<script lang="ts">
	import { DefaultFooter, LanguagePicker } from '$lib/client/ui';
</script>

<svelte:head>
	<title>Terms of Service - Niyyah</title>
	<meta
		name="description"
		content="Niyyah's terms of service define user rights, responsibilities, and limitations."
	/>
</svelte:head>

<div class="min-h-screen bg-white text-midnyt">
	<!-- Language Picker -->
	<div class="flex justify-end px-4 py-4">
		<LanguagePicker />
	</div>

	<!-- Content -->
	<main class="px-4 py-8 max-w-4xl mx-auto mb-16">
		<article class="space-y-8">
			<div class="space-y-2">
				<h1 class="text-4xl font-bold text-midnyt">Terms of Service</h1>
				<p class="text-sm text-slate">Last updated: December 7, 2025</p>
			</div>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-midnyt border-b border-taupe/20 pb-2">
					Introduction
				</h2>
				<p class="leading-relaxed text-midnyt">
					Welcome to Niyyah, a platform facilitating marriage introductions. These terms of service
					define user rights, responsibilities, and limitations. By using Niyyah, you agree to these
					terms and our Privacy Policy.
				</p>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-midnyt border-b border-taupe/20 pb-2">
					Eligibility and Account Requirements
				</h2>
				<ul class="space-y-2 pl-6">
					<li class="leading-relaxed text-midnyt list-disc">
						Users must be legally eligible to marry according to both Swedish law (minimum 18 years)
						and Islamic principles
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						One account per person - multiple accounts are prohibited
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Service only available to individuals who are currently unmarried (single, divorced, or
						widowed)
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Married individuals must immediately deactivate or delete their accounts
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Users must provide accurate information about themselves and their guardians
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Guardians must have legitimate authority according to Islamic principles
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Users must be acting in good faith to seek marriage
					</li>
				</ul>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-midnyt border-b border-taupe/20 pb-2">
					User Conduct
				</h2>
				<p class="leading-relaxed text-midnyt">
					We enforce strict conduct policies to ensure user safety. Prohibited activities include:
				</p>
				<ul class="space-y-2 pl-6">
					<li class="leading-relaxed text-midnyt list-disc">
						Harassment, abuse, or threatening behavior toward any user
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Providing false, misleading, or fraudulent information
					</li>
					<li class="leading-relaxed text-midnyt list-disc">Impersonating another person</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Using the platform for commercial purposes or solicitation
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Sharing inappropriate content (explicit, offensive, or irrelevant material)
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Attempting to contact users outside the approved matching process
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Bypassing guardian involvement when required
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Creating accounts for others without authorization
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Collecting or storing other users' personal information
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Using automated tools or bots to access the platform
					</li>
				</ul>
				<p class="leading-relaxed text-midnyt">
					Users must respect the privacy and dignity of others and maintain appropriate Islamic
					etiquette (adab) in all interactions.
				</p>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-midnyt border-b border-taupe/20 pb-2">
					Service Nature and Limitations
				</h2>
				<p class="leading-relaxed text-midnyt">
					Niyyah is a facilitator only - we connect users but do not guarantee outcomes. The
					platform does not verify user information beyond basic checks. Guardian relationships are
					verified through user-provided information only. Facilitators are volunteers who assist in
					arranging meetings.
				</p>
				<p class="leading-relaxed text-midnyt">
					The service is provided "as is" without warranties of any kind. We are not responsible
					for:
				</p>
				<ul class="space-y-2 pl-6">
					<li class="leading-relaxed text-midnyt list-disc">
						The accuracy of user-provided information
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						The outcome of any introductions or marriages
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						User interactions outside the platform
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Actions or conduct of facilitators, guardians, or other users
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Compatibility assessments or match quality
					</li>
				</ul>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-midnyt border-b border-taupe/20 pb-2">
					Service Availability and Changes
				</h2>
				<ul class="space-y-2 pl-6">
					<li class="leading-relaxed text-midnyt list-disc">
						Service is currently free of charge with no fees
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						We reserve the right to modify, suspend, or discontinue the service at any time
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						We reserve the right to change these terms with notice to users
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Material changes will be communicated through the platform and email
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Continued use after changes constitutes acceptance of new terms
					</li>
				</ul>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-midnyt border-b border-taupe/20 pb-2">
					Account Termination
				</h2>
				<p class="leading-relaxed text-midnyt">
					Users can delete their accounts at any time through the platform.
				</p>
				<p class="leading-relaxed text-midnyt">We may suspend or terminate accounts for:</p>
				<ul class="space-y-2 pl-6">
					<li class="leading-relaxed text-midnyt list-disc">Violation of these terms of service</li>
					<li class="leading-relaxed text-midnyt list-disc">Violation of privacy policy</li>
					<li class="leading-relaxed text-midnyt list-disc">Providing false information</li>
					<li class="leading-relaxed text-midnyt list-disc">Inappropriate conduct</li>
					<li class="leading-relaxed text-midnyt list-disc">Legal or regulatory requirements</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Extended inactivity (per privacy policy)
					</li>
				</ul>
				<p class="leading-relaxed text-midnyt">
					Terminated users may not create new accounts without permission. Upon termination, user
					data is handled according to the privacy policy.
				</p>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-midnyt border-b border-taupe/20 pb-2">
					Intellectual Property
				</h2>
				<p class="leading-relaxed text-midnyt">
					Users retain ownership of content they submit (profiles, photos, messages). By submitting
					content, users grant Niyyah a non-exclusive, worldwide, royalty-free license to:
				</p>
				<ul class="space-y-2 pl-6">
					<li class="leading-relaxed text-midnyt list-disc">
						Store, display, and transmit content as necessary to provide the service
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Show content to matched users, facilitators, and guardians as appropriate
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Make technical copies for backup and service operation
					</li>
				</ul>
				<p class="leading-relaxed text-midnyt">
					Users must have rights to all content they submit and must not submit copyrighted material
					without authorization. Platform name, logo, and design are property of Niyyah. Users may
					not use platform branding without written permission.
				</p>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-midnyt border-b border-taupe/20 pb-2">
					User Responsibilities
				</h2>
				<ul class="space-y-2 pl-6">
					<li class="leading-relaxed text-midnyt list-disc">
						Provide accurate, current, and complete information
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Maintain confidentiality of account credentials
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Notify us immediately of unauthorized account access
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Comply with all applicable laws and regulations
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Respect Islamic values and principles
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Participate in good faith with genuine intention to marry
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Involve appropriate guardians according to Islamic requirements
					</li>
				</ul>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-midnyt border-b border-taupe/20 pb-2">
					Communications
				</h2>
				<ul class="space-y-2 pl-6">
					<li class="leading-relaxed text-midnyt list-disc">
						Users agree to receive service-related communications via email
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Essential notifications about account, matches, and policy changes
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						No marketing or promotional communications (platform is non-commercial)
					</li>
					<li class="leading-relaxed text-midnyt list-disc">
						Users can manage communication preferences in account settings
					</li>
				</ul>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-midnyt border-b border-taupe/20 pb-2">
					Governing Law
				</h2>
				<p class="leading-relaxed text-midnyt">
					These terms are governed by Swedish law. The service operates according to Swedish legal
					framework while adhering to Islamic principles in design and operation.
				</p>
			</section>

			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-midnyt border-b border-taupe/20 pb-2">Contact</h2>
				<p class="leading-relaxed text-midnyt">
					If you have questions about these terms, please contact us through the platform's support
					system.
				</p>
			</section>
		</article>
	</main>

	<DefaultFooter />
</div>
