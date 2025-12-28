# app-niyyah-se

Candidate web application for Niyyah.se - where marriage seekers can register, manage their profiles, and track their progress.

## Application Details

- **Production URL:** `https://app.niyyah.se`
- **Development Port:** `8020`
- **Port Range:** `8020-8029` (Reserved to avoid conflicts)

## Technology Stack

This is a SvelteKit-based application with the following technologies:

- **Framework:** SvelteKit (TypeScript)
- **Database:** PostgreSQL 18 with Drizzle ORM
  - **Auth Schema:** `candidate` (authentication and session data)
  - **Domain Schema:** `niyyah` (shared business data)
- **Styling:** TailwindCSS v4
- **Translation:** Paraglide.js (supports English, Swedish, Arabic)
- **Authentication:** better-auth (magic link + SMS OTP)
- **Testing:** Vitest (unit/component), Playwright (E2E)
- **Deployment:** Cloudflare (using @sveltejs/adapter-cloudflare)

## Prerequisites

- Node.js 24+ and the pnpm package manager
- Docker and Docker Compose (for local database)

## Getting Started

### 1. Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### 2. Start the Database

Start PostgreSQL 18 locally (from the monorepo root):

```bash
docker compose up -d
```

### 3. Setup Database Schema

Push the database schema:

```bash
cd apps/www-niyyah-se
pnpm drizzle-kit push
```

### 4. Start Development Server

```bash
pnpm start
```

The application will be available at `http://localhost:8020`

## Testing

### Unit and Component Tests

Run unit tests with Vitest:

```bash
pnpm test:vitest
```

Test files are co-located with source files using the `.spec.ts` or `.test.ts` suffix.

### End-to-End Tests

Run E2E tests with Playwright:

```bash
pnpm test:e2e
```

E2E tests are located in the `e2e/` directory.

## Internationalization

The application supports three languages:

- English (en) - Default
- Swedish (sv) - Supported
- Arabic (ar) - Supported

Translation files are located in `i18n/` directory. Use Paraglide.js for accessing translations in components.

## Authentication

The application uses better-auth for authentication with magic link (email) and SMS OTP support.

> **Development Mode:** In local development, OTP codes and magic links are logged to the console instead of being sent via email/SMS. This allows rapid iteration on the UX without external dependencies. Check the terminal output for authentication links and codes.

## Development Guidelines

Follow the guidelines in `/AGENTS.md` and commit using [Conventional Commits](https://www.conventionalcommits.org/).

## Related Documentation

- [Architecture Decision Records](/docs/adrs/)
- [Developer Guidelines](/AGENTS.md)
- [Monorepo Root README](/README.md)
