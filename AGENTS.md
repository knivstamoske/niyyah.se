# Developer Guidelines

This document provides guidance for AI agents and human developers on the conventions and structure within this repository. This is a TypeScript-first monorepo managed with `pnpm` workspaces. The repository is organized into three main directories at the root:

- `/apps`: Contains end-user applications, such as websites and mobile apps. Each subdirectory is a standalone project.
- `/libs`: Houses shared libraries and packages. This code is intended for reuse across different applications within the monorepo.
- `/docs`: Includes documentation for developers, covering specifications, architecture, and guidelines.

**Note:** This file provides essential quick-reference information. For deeper context about architectural decisions, rationales, and trade-offs, consult the Architecture Decision Records (ADRs) in `/docs/adrs/`.

## Project Structure

This is a SvelteKit-based platform with five separate applications serving different user roles:

- `admin-niyyah-se` - Administrator portal for platform operations (port 8010)
- `app-niyyah-se` - Candidate webapp for marriage seekers (port 8020)
- `match-niyyah-se` - Facilitator webapp for match coordination (port 8030)
- `wali-niyyah-se` - Guardian webapp for verification (port 8040)
- `www-niyyah-se` - Public marketing website (port 8050)

Each application has its own dedicated port range (10 ports per app) for local development to avoid conflicts.

## Database Architecture

The project uses a single PostgreSQL database with multiple schemas:

- **Application schemas** (`candidate`, `guardian`, `facilitator`, `administrator`) - Store authentication, sessions, and app-specific data
- **Shared domain schema** (`niyyah`) - Contains all shared business domain data (profiles, proposals, sittings, etc.)
- All applications (except the marketing site) have read/write access to the `niyyah` schema
- The administrator application has elevated write access to all schemas for user management

## Local Development

**Package Manager:**

This project uses **pnpm** as its package manager. The `packageManager` field in `package.json` enforces pnpm@10.25.0.

To install dependencies:

```bash
pnpm install
```

**Setup:**

1. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
2. Review and update the `.env` file with your local configuration if needed

**Docker Commands:**

The project uses Docker Compose with service profiles. The database is always available, while apps are in the "apps" profile.

**Database Only:**

- Start: `docker compose up -d`
- Stop: `docker compose down`
- Database runs on standard port 5432

**Specific App in Docker:**

- Start (rebuild): `docker compose --profile apps up -d --build www-niyyah-se`
- Stop: `docker compose --profile apps down`
- Replace `www-niyyah-se` with the app name (matches service name in docker-compose.yml)

**All Apps in Docker:**

- Start (rebuild): `docker compose --profile apps up -d --build`
- Stop: `docker compose --profile apps down`
- This starts the database and all applications defined in the docker-compose.yml

The database credentials are configured in the `.env` file and automatically loaded by Docker Compose.

## Development Workflow

Commit messages must follow the [Conventional Commits specification](https://www.conventionalcommits.org/). This ensures a consistent and machine-readable commit history.

```
<type>[optional scope]: <description>
```

Examples:

- `docs: add specification describing all project requirements`
- `docs: add an AGENTS.md file to support AI assisted coding`
- `chore: update dependencies to fix critical vulnerabilities`

All changes must be submitted via a GitHub Pull Request and reviewed by a human. Merges to the `main` branch are automatically deployed to the production environment.

## Coding Style

### Svelte Components

**Comments:**

- Use Go-style comments: start with the name of the thing being documented, followed by "is" or "are"
- Document interfaces, types, constants, and functions. Add inline comments sparingly for complex logic
- Since we use TypeScript, don't document parameter/return types (they're already in the type signature)
- Keep comments concise and focused on why the code does something, not what or how it does it

Example:

```ts
/**
 * LanguageOption is an option for the language picker.
 */
interface LanguageOption {
  code: string;
  label: string;
}
```

**Component Structure:**

- Place all TypeScript code in the `<script lang="ts">` block at the top
- Import statements first
- Then interfaces/types
- Then constants/variables
- Then functions
- Follow with the template markup

**Naming Conventions:**

- Use PascalCase for component filenames (e.g., `LanguagePicker.svelte`)
- Use PascalCase for interfaces and types
- Use camelCase for variables and functions
- Use UPPER_SNAKE_CASE for constants that represent fixed configuration values

**Helper Functions:**

- Extract complex logic into named helper functions rather than inline expressions
- Keep template expressions simple and readable
- Helper functions should have clear, descriptive names that indicate their purpose

**Loops and Conditionals:**

- Prefer loops over repeated markup when rendering lists
- Use `{#each}` with index when you need positional logic (e.g., adding separators between items)
