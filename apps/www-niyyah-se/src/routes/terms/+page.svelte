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

<div class="min-h-screen bg-app-background text-app-text">
	<!-- Language Picker -->
	<div class="flex justify-end px-4 py-4">
		<LanguagePicker />
	</div>

	<!-- Content -->
	<main class="px-4 py-8 max-w-4xl mx-auto mb-16">
		<article class="prose prose-slate max-w-none">
			<h1>Terms of Service</h1>
			<p class="text-sm text-gray-600">Last updated: December 7, 2025</p>

			<h2>Introduction</h2>
			<p>
				Welcome to Niyyah, a platform facilitating marriage introductions. These terms of service
				define user rights, responsibilities, and limitations. By using Niyyah, you agree to these
				terms and our Privacy Policy.
			</p>

			<h2>Eligibility and Account Requirements</h2>
			<ul>
				<li>
					Users must be legally eligible to marry according to both Swedish law (minimum 18 years)
					and Islamic principles
				</li>
				<li>One account per person - multiple accounts are prohibited</li>
				<li>
					Service only available to individuals who are currently unmarried (single, divorced, or
					widowed)
				</li>
				<li>Married individuals must immediately deactivate or delete their accounts</li>
				<li>Users must provide accurate information about themselves and their guardians</li>
				<li>Guardians must have legitimate authority according to Islamic principles</li>
				<li>Users must be acting in good faith to seek marriage</li>
			</ul>

			<h2>User Conduct</h2>
			<p>
				We enforce strict conduct policies to ensure user safety. Prohibited activities include:
			</p>
			<ul>
				<li>Harassment, abuse, or threatening behavior toward any user</li>
				<li>Providing false, misleading, or fraudulent information</li>
				<li>Impersonating another person</li>
				<li>Using the platform for commercial purposes or solicitation</li>
				<li>Sharing inappropriate content (explicit, offensive, or irrelevant material)</li>
				<li>Attempting to contact users outside the approved matching process</li>
				<li>Bypassing guardian involvement when required</li>
				<li>Creating accounts for others without authorization</li>
				<li>Collecting or storing other users' personal information</li>
				<li>Using automated tools or bots to access the platform</li>
			</ul>
			<p>
				Users must respect the privacy and dignity of others and maintain appropriate Islamic
				etiquette (adab) in all interactions.
			</p>

			<h2>Service Nature and Limitations</h2>
			<p>
				Niyyah is a facilitator only - we connect users but do not guarantee outcomes. The platform
				does not verify user information beyond basic checks. Guardian relationships are verified
				through user-provided information only. Facilitators are volunteers who assist in arranging
				meetings.
			</p>
			<p>
				The service is provided "as is" without warranties of any kind. We are not responsible for:
			</p>
			<ul>
				<li>The accuracy of user-provided information</li>
				<li>The outcome of any introductions or marriages</li>
				<li>User interactions outside the platform</li>
				<li>Actions or conduct of facilitators, guardians, or other users</li>
				<li>Compatibility assessments or match quality</li>
			</ul>

			<h2>Service Availability and Changes</h2>
			<ul>
				<li>Service is currently free of charge with no fees</li>
				<li>We reserve the right to modify, suspend, or discontinue the service at any time</li>
				<li>We reserve the right to change these terms with notice to users</li>
				<li>Material changes will be communicated through the platform and email</li>
				<li>Continued use after changes constitutes acceptance of new terms</li>
			</ul>

			<h2>Account Termination</h2>
			<p>Users can delete their accounts at any time through the platform.</p>
			<p>We may suspend or terminate accounts for:</p>
			<ul>
				<li>Violation of these terms of service</li>
				<li>Violation of privacy policy</li>
				<li>Providing false information</li>
				<li>Inappropriate conduct</li>
				<li>Legal or regulatory requirements</li>
				<li>Extended inactivity (per privacy policy)</li>
			</ul>
			<p>
				Terminated users may not create new accounts without permission. Upon termination, user data
				is handled according to the privacy policy.
			</p>

			<h2>Intellectual Property</h2>
			<p>
				Users retain ownership of content they submit (profiles, photos, messages). By submitting
				content, users grant Niyyah a non-exclusive, worldwide, royalty-free license to:
			</p>
			<ul>
				<li>Store, display, and transmit content as necessary to provide the service</li>
				<li>Show content to matched users, facilitators, and guardians as appropriate</li>
				<li>Make technical copies for backup and service operation</li>
			</ul>
			<p>
				Users must have rights to all content they submit and must not submit copyrighted material
				without authorization. Platform name, logo, and design are property of Niyyah. Users may not
				use platform branding without written permission.
			</p>

			<h2>User Responsibilities</h2>
			<ul>
				<li>Provide accurate, current, and complete information</li>
				<li>Maintain confidentiality of account credentials</li>
				<li>Notify us immediately of unauthorized account access</li>
				<li>Comply with all applicable laws and regulations</li>
				<li>Respect Islamic values and principles</li>
				<li>Participate in good faith with genuine intention to marry</li>
				<li>Involve appropriate guardians according to Islamic requirements</li>
			</ul>

			<h2>Communications</h2>
			<ul>
				<li>Users agree to receive service-related communications via email</li>
				<li>Essential notifications about account, matches, and policy changes</li>
				<li>No marketing or promotional communications (platform is non-commercial)</li>
				<li>Users can manage communication preferences in account settings</li>
			</ul>

			<h2>Governing Law</h2>
			<p>
				These terms are governed by Swedish law. The service operates according to Swedish legal
				framework while adhering to Islamic principles in design and operation.
			</p>

			<h2>Contact</h2>
			<p>
				If you have questions about these terms, please contact us through the platform's support
				system.
			</p>
		</article>
	</main>

	<DefaultFooter />
</div>
