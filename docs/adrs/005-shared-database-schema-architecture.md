# 5. Shared Database Schema Architecture

Date: 2025-11-16

## Context

Following ADR-004, we have five separate frontend applications serving different user roles. These applications need to:

- Store user authentication data and application-specific state
- Share core domain data (user profiles, proposals, sittings, etc.) across applications
- Maintain data isolation for better security and compliance
- Enable the admin application to manage users across all systems
- Avoid building complex system-to-system APIs for simple data sharing

## Decision

We will use a **single PostgreSQL database with multiple schemas** to balance data isolation with practical data sharing needs:

### Schema Structure

#### 1. Application-Specific Schemas

Each application gets its own dedicated schema for authentication and application-specific data:

- `candidate` - CandidateWebapp authentication and session data
- `guardian` - GuardianWebapp authentication and session data
- `facilitator` - FacilitatorWebapp authentication and session data
- `administrator` - AdministratorPortal authentication and session data
- `marketing` - MarketingWebsite waitlist and marketing data

**Contents (for user-facing apps):**

- User authentication records (credentials, tokens, sessions)
- Application-specific preferences and settings
- GDPR compliance records (eg: consents)
- Application logs and audit trails

**Contents (for marketing schema):**

- Waitlist signups and contact information
- Marketing campaign data
- Newsletter subscriptions
- Contact form submissions
- Analytics and tracking data

#### 2. Shared Domain Schema (`niyyah`)

A central schema containing all shared business domain data:

- User profiles (candidates, guardians, facilitators)
- Proposals and matches
- Sittings and bookings
- Feedback and outcomes
- Mosque and location data
- Notifications and messages

**Access pattern:**

- All authenticated applications (candidate, guardian, facilitator, administrator) have read/write access to `niyyah`
- The marketing website does NOT have access to `niyyah` (it only stores pre-registration data)
- Business logic and constraints are enforced at the application layer and database level.

#### 3. Admin Application Special Access

The AdministratorPortal has elevated privileges:

- Full read/write access to `niyyah` (like other apps)
- **Write access to ALL application-specific schemas** for user management

**Use cases:**

- View all user accounts across applications
- Suspend/block users in any application
- Reset authentication credentials
- Generate cross-application audit reports
- GDPR compliance operations (view all data, trigger deletions)

## Consequences

### Positive

- **Simplified data sharing:** No need for system-to-system APIs to access shared domain data
- **Clear boundaries:** Application schemas isolate authentication and app-specific concerns
- **Transactional consistency:** Operations spanning multiple domain entities use native database transactions
- **Performance:** No network overhead for cross-application data access
- **Easier migrations:** Schema changes in `niyyah` can be deployed once and affect all apps
- **Admin capabilities:** Platform administrators can manage users across all systems from a single interface
- **Simpler backup/restore:** Single database backup includes all application and domain data

### Negative

- **Tight coupling at database level:** All applications depend on the same database instance
  - _Mitigation:_ Connection pooling and read replicas for scaling
- **Schema migration coordination:** Changes to `niyyah` require careful coordination
  - _Mitigation:_ Use migration tools (e.g., Prisma, Knex) with versioning and rollback support
- **Single point of failure:** Database downtime affects all applications
  - _Mitigation:_ Database replication, automated failover, regular backups
- **Testing complexity:** Integration tests need to manage multiple schemas
  - _Mitigation:_ Use database transactions for test isolation, Docker for consistent test environments
- **Authorization at application layer:** Apps must enforce business rules; database only enforces schema boundaries
  - _Mitigation:_ Thorough authorization logic in each application, shared authorization libraries in `/libs`

### Neutral

- **PostgreSQL schema features:** Leverages native database capabilities for namespace isolation
- **Development workflow:** Developers need to be aware of which schema they're working in
- **Monitoring:** Database monitoring tools can track per-schema metrics
