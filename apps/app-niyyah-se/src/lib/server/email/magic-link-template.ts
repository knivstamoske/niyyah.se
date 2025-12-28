/**
 * Magic Link Email Template
 * Generates HTML and text email for magic link authentication
 */

export const MAGIC_LINK_EXPIRY_MINUTES = 10;
export const MAGIC_LINK_EXPIRY_SECONDS = MAGIC_LINK_EXPIRY_MINUTES * 60;

export async function createMagicLinkEmail({ url }: { email: string; url: string }) {
	const html = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
	<table role="presentation" style="width: 100%; border-collapse: collapse;">
		<tr>
			<td align="center" style="padding: 40px 0;">
				<table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
					<!-- Header -->
					<tr>
						<td style="padding: 40px 40px 20px; text-align: center;">
							<h1 style="margin: 0; font-size: 28px; color: #1a202c; font-weight: 600;">Sign in to Niyyah</h1>
						</td>
					</tr>
					<!-- Content -->
					<tr>
						<td style="padding: 0 40px 30px;">
							<p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #4a5568;">
								Click the button below to sign in to your Niyyah account. This link will expire in ${MAGIC_LINK_EXPIRY_MINUTES} minutes.
							</p>
							<table role="presentation" style="width: 100%; border-collapse: collapse;">
								<tr>
									<td align="center" style="padding: 20px 0;">
										<a href="${url}" style="display: inline-block; padding: 14px 32px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 500;">Sign In</a>
									</td>
								</tr>
							</table>
							<p style="margin: 20px 0 0; font-size: 14px; line-height: 20px; color: #718096;">
								If you didn't request this email, you can safely ignore it.
							</p>
						</td>
					</tr>
					<!-- Footer -->
					<tr>
						<td style="padding: 20px 40px; background-color: #f7fafc; border-top: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
							<p style="margin: 0; font-size: 12px; line-height: 18px; color: #a0aec0; text-align: center;">
								Niyyah.se - Islamic Marriage Matchmaking
							</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>
	`.trim();

	const text = `Sign in to Niyyah

Click this link to sign in to your account:
${url}

This link will expire in ${MAGIC_LINK_EXPIRY_MINUTES} minutes.

If you didn't request this email, you can safely ignore it.`;

	return {
		html,
		text,
		subject: 'Sign in to Niyyah'
	};
}
