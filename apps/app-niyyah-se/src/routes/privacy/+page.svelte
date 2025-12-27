<script lang="ts">
	import { DefaultFooter, LanguagePicker } from '$lib/client/ui';
</script>

<svelte:head>
	<title>Privacy Policy - Niyyah</title>
	<meta
		name="description"
		content="Niyyah's privacy policy outlines how we collect, use, and protect your personal information."
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
			<h1>Privacy Policy</h1>
			<p class="text-sm text-gray-600">Last updated: December 7, 2025</p>

			<h2>Introduction</h2>
			<p>
				As a marriage matching platform, Niyyah handles sensitive personal information including
				contact details, preferences, and family connections. Users trust us with private
				information for the specific purpose of facilitating introductions. This privacy policy
				outlines our commitment to data minimization and user privacy, and how we comply with GDPR
				as we operate in Sweden/EU.
			</p>

			<h2>Data Collection</h2>
			<p>We collect only the minimum necessary information for each user role:</p>
			<ul>
				<li>
					<strong>Candidates:</strong> Basic profile information, contact details, preferences for matching
				</li>
				<li>
					<strong>Guardians:</strong> Identity verification details, relationship to candidate, contact
					information
				</li>
				<li>
					<strong>Facilitators:</strong> Identity details, contact information, qualifications
				</li>
				<li><strong>Administrators:</strong> Authentication credentials, audit logs</li>
			</ul>
			<p>
				We do not collect browsing behavior, analytics, or tracking data for advertising purposes.
			</p>

			<h2>Data Usage</h2>
			<p>
				Data will only be used to fulfill the platform's stated purpose: facilitating marriage
				introductions.
			</p>

			<h3>Access Controls</h3>
			<ul>
				<li>
					<strong>Facilitators:</strong> Can view candidate profiles and contact details necessary to
					arrange meetings
				</li>
				<li>
					<strong>Guardians:</strong> Can view their connected candidate's activity and proposal details
				</li>
				<li>
					<strong>Administrators:</strong> Can access all data for platform operation and user support
				</li>
				<li>
					<strong>Candidates:</strong> Can view other candidates only when matched through proper process
				</li>
			</ul>

			<h3>What We Don't Do</h3>
			<ul>
				<li>We will never sell your data to third parties</li>
				<li>We will not share data with AI agents or automated decision-making systems</li>
				<li>We will not use your data for advertising or marketing to third parties</li>
			</ul>

			<h2>Data Storage and Transfer</h2>
			<ul>
				<li>All data is stored on Hetzner servers within the EU (Germany/Finland)</li>
				<li>No cross-border data transfers outside the EU</li>
				<li>
					Database and applications are hosted on the same infrastructure to minimize data movement
				</li>
			</ul>

			<h2>Data Retention</h2>
			<ul>
				<li>User data is automatically deleted after one year of account inactivity</li>
				<li>Immediate deletion when user requests account deletion</li>
				<li>Audit logs are retained only for legal compliance requirements</li>
			</ul>

			<h2>Your Rights Under GDPR</h2>
			<p>You have the following rights regarding your personal data:</p>
			<ul>
				<li><strong>Right to access:</strong> You can download your data</li>
				<li><strong>Right to rectification:</strong> You can update your information</li>
				<li>
					<strong>Right to erasure:</strong> You can delete your account and all associated data
				</li>
				<li>
					<strong>Right to data portability:</strong> You can export your data in standard formats
				</li>
				<li>
					<strong>Right to object:</strong> You can opt out of specific data processing activities
				</li>
				<li>
					<strong>Right to be informed:</strong> This privacy policy provides clear information about
					our practices
				</li>
			</ul>

			<h2>Analytics and Monitoring</h2>
			<ul>
				<li>No Google Analytics or similar third-party tracking tools</li>
				<li>No cookies except essential session management cookies</li>
				<li>No behavioral tracking or profiling</li>
			</ul>

			<h2>Transparency and Consent</h2>
			<ul>
				<li>Material changes to privacy practices will be communicated to users</li>
				<li>Users must explicitly consent to this privacy policy during registration</li>
				<li>This privacy policy is maintained in version control for transparency</li>
			</ul>

			<h2>Contact</h2>
			<p>
				If you have questions about this privacy policy or how we handle your data, please contact
				us through the platform's support system.
			</p>
		</article>
	</main>

	<DefaultFooter />
</div>
