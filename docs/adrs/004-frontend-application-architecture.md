# 4. Frontend Application Architecture

Date: 2025-11-16

## Context

The platform facilitates Islamic marriage matchmaking through a mosque-based system with multiple distinct user roles: candidates (men and women seeking marriage), guardians (wali), facilitators (who propose matches and manage sittings), and administrators (platform staff). Each role has different responsibilities, access levels, and security requirements.

Traditional monolithic applications with role-based access control (RBAC) within a single frontend can lead to:

- Security vulnerabilities through privilege escalation
- Complex authorization logic that's difficult to audit
- Larger bundle sizes as code for all roles is shipped to all users
- Difficulty in maintaining clear boundaries between user types
- Challenges in deploying role-specific updates independently

## Decision

We will build **five separate frontend applications**, each serving a specific purpose with isolated user bases and independent deployment:

### 1. MarketingWebsite (`niyyah.se`)

- **Purpose:** Public-facing static website for information and onboarding
- **Technology:** SvelteKit with static site generation (SSG)
- **Characteristics:**
  - No authentication required
  - Fully static, pre-rendered at build time
  - SEO-optimized landing pages
  - Information about the service, Islamic principles, and how it works
  - Links to the appropriate subdomain applications

### 2. CandidateWebapp (`app.niyyah.se`)

- **Purpose:** Used by men and women seeking marriage partners
- **Technology:** SvelteKit with full-stack capabilities (SSR/CSR), deployed as PWA
- **Authentication:** Magic link and SMS OTP
- **Features:**
  - User registration and authentication
  - Profile creation (text-based, no images)
  - Guardian assignment (for women)
  - Rule acceptance and consent management
  - Mosque/city selection
  - Application submission
  - Notifications about proposed sittings
  - Booking management
  - Post-sitting feedback

### 3. GuardianWebapp (`wali.niyyah.se`)

- **Purpose:** Verification portal for guardians (wali) of women candidates
- **Technology:** SvelteKit with full-stack capabilities, deployed as PWA
- **Authentication:** Magic link/OTP-based, no traditional signup
- **Features:**
  - One-time link verification from SMS/email
  - View sitting details for their ward
  - Confirm or decline guardian role
  - Minimal profile (name, relation, contact info)
  - Notifications about upcoming sittings
- **Note:** Guardians don't create accounts themselves; they're invited by women candidates

### 4. FacilitatorWebapp (`match.niyyah.se`)

- **Purpose:** Used by verified individuals who propose matches and coordinate sittings
- **Technology:** SvelteKit with full-stack capabilities, deployed as PWA
- **Authentication:** Manual verification and account creation via AdministratorPortal
- **Features:**
  - View candidate applications in their region
  - Propose matches between compatible candidates
  - Manage time slots and sitting rooms
  - Schedule bookings
  - Mark sitting outcomes
  - Internal notes and logs
  - Profile with mosque affiliation metadata (simplified, no organization structure)

### 5. AdministratorPortal (`admin.niyyah.se`)

- **Purpose:** Internal staff portal for platform operations and moderation
- **Technology:** SvelteKit with full-stack capabilities, deployed as PWA
- **Authentication:** Internal staff accounts with elevated privileges
- **Features:**
  - Dashboard with platform-wide metrics
  - Facilitator management (add, remove, verify)
  - Complaint handling and moderation
  - User blocking/suspension across all apps
  - Audit log viewing
  - System configuration
  - GDPR compliance tools (data exports, deletions)

## Consequences

### Positive

- **Enhanced security:** Physical separation of user databases prevents unauthorized access
- **Simpler codebase:** Each application has a clear, focused purpose
- **Better performance:** Smaller bundle sizes as each app only includes relevant code
- **Independent scaling:** High-traffic applications (e.g., CandidateWebapp) can scale independently
- **Easier testing:** Each application can be tested in isolation
- **Clear ownership:** Teams can own specific applications
- **Flexible deployment:** Bug fixes or features for one role don't require redeploying all apps
- **Compliance:** Easier to demonstrate data isolation for GDPR and security audits

### Negative

- **Code duplication:** Some authentication and UI patterns will be repeated across apps
  - _Mitigation:_ Shared libraries in `/libs` for common components
- **Infrastructure complexity:** Five separate deployments instead of one
  - _Mitigation:_ Use consistent deployment pipelines and infrastructure-as-code
- **Cross-application features:** Harder to implement features that span multiple user types
  - _Mitigation:_ Well-defined APIs for inter-application communication
- **Development overhead:** More initial setup and configuration
  - _Mitigation:_ Investment pays off in long-term maintainability and security

### Neutral

- **Shared dependencies:** All apps use SvelteKit, ensuring consistent developer experience
- **User experience:** Users may need to remember different URLs for different roles, but this reinforces the security boundaries

## Implementation Notes

1. All applications (except MarketingWebsite) share the same authentication patterns (magic links, SMS OTP via Twilio/MessageBird)
2. Each application should have its own `package.json` and live in `/apps/<app-name>`
3. Shared TypeScript types and utilities should live in `/libs` for consistency
4. Environment variables and secrets are managed per-application
5. GuardianWebapp should implement short-lived tokens since guardians only need access for verification

## Alternatives Considered

### Single Fullstack Application with RBAC

A monolithic application with role-based access control managing all user types.

**Rejected because:**

- Increases security risk through potential privilege escalation
- Larger bundle sizes shipping code for all roles to all users
- Complex authorization logic throughout the application
- Harder to audit and maintain clear security boundaries

### Microservices with a Shared Frontend app

Backend microservices with a single frontend application routing to different services.

**Rejected because:**

- Frontend still needs to handle all user types and ship all code
- Doesn't address the security and bundle size concerns
- Backend separation alone doesn't provide the isolation benefits we need
