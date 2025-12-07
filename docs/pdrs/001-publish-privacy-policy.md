# 001 - Publish Privacy Policy

- Date: 2025-12-07

## Context

As a marriage matching platform, Niyyah handles sensitive personal information including contact details, preferences, and family connections. Users trust us with private information for the specific purpose of facilitating introductions. We need clear privacy principles to guide development, operations, and our relationship with users. These principles must comply with GDPR as we operate in Sweden/EU and must reflect our commitment to data minimization and user privacy.

## Decision

We will implement a privacy-first approach with the following principles:

### Data Collection

- Collect only the minimum necessary information for each user role:
  - **Candidates**: Basic profile information, contact details, preferences for matching
  - **Guardians**: Identity verification details, relationship to candidate, contact information
  - **Facilitators**: Identity details, contact information, qualifications
  - **Administrators**: Authentication credentials, audit logs
- No collection of browsing behavior, analytics, or tracking data for advertising purposes

### Data Usage

- Data will only be used to fulfill the platform's stated purpose: facilitating marriage introductions
- Specific access controls:
  - **Facilitators**: Can view candidate profiles and contact details necessary to arrange meetings
  - **Guardians**: Can view their connected candidate's activity and proposal details
  - **Administrators**: Can access all data for platform operation and user support
  - **Candidates**: Can view other candidates only when matched through proper process
- Data will never be sold to third parties
- Data will not be shared with AI agents or automated decision-making systems
- Data will not be used for advertising or marketing to third parties

### Data Storage and Transfer

- All data stored on Hetzner servers within the EU (Germany/Finland)
- No cross-border data transfers outside the EU
- Database and applications hosted on the same infrastructure to minimize data movement

### Data Retention

- User data automatically deleted after one year of account inactivity
- Immediate deletion when user requests account deletion
- Audit logs retained for legal compliance requirements only

### User Rights (GDPR)

- Right to access: Users can download their data
- Right to rectification: Users can update their information
- Right to erasure: Users can delete their accounts and all associated data
- Right to data portability: Users can export their data in standard formats
- Right to object: Users can opt out of specific data processing activities
- Right to be informed: Clear privacy policy at `/privacy` on marketing website

### Analytics and Monitoring

- No Google Analytics or similar third-party tracking tools
- No cookies except essential session management cookies
- No behavioral tracking or profiling

### Transparency

- Privacy policy published publicly at `www.niyyah.se/privacy`
- Privacy policy maintained in version control (this PDR and the policy document)
- Material changes to privacy practices will be communicated to users
- Users must explicitly consent to privacy policy during registration

## Consequences

### Positive

- Strong user trust through transparent, privacy-first practices
- GDPR compliance from the start, avoiding regulatory issues
- Reduced attack surface by minimizing data collection and third-party integrations
- Lower risk of data breaches affecting users
- Simplified infrastructure without complex analytics and tracking systems
- Clear guidelines for developers on handling user data

### Negative

- Limited analytics may make it harder to understand user behavior and optimize the platform
- Manual processes needed where automated systems (like AI) might be more efficient
- Competitive disadvantage against platforms that leverage user data more aggressively
- Additional development effort to implement proper access controls and data export features
- Ongoing maintenance required to ensure continued GDPR compliance

### Trade-offs

- We accept slower growth and less optimization in exchange for user privacy and trust
- We accept higher operational costs (self-hosted analytics, manual review) to avoid third-party data sharing
- We can revisit analytics and AI usage if safe, privacy-preserving alternatives become available
- The privacy policy may be refined based on user feedback and operational experience, but core principles will remain stable
