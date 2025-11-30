# Developer Guidelines

This document provides guidance for AI agents and human developers on the conventions and structure within this repository. This is a TypeScript-first monorepo managed with `pnpm` workspaces. The repository is organized into three main directories at the root:

- `/apps`: Contains end-user applications, such as websites and mobile apps. Each subdirectory is a standalone project.
- `/libs`: Houses shared libraries and packages. This code is intended for reuse across different applications within the monorepo.
- `/docs`: Includes documentation for developers, covering specifications, architecture, and guidelines.

**Note:** This file provides essential quick-reference information. For deeper context about architectural decisions, rationales, and trade-offs, consult the Architecture Decision Records (ADRs) in `/docs/adrs/`.

## Project Structure

This is a SvelteKit-based platform with five separate applications serving different user roles:

- `admin.niyyah.se` - Administrator portal for platform operations (port 8010)
- `app.niyyah.se` - Candidate webapp for marriage seekers (port 8020)
- `match.niyyah.se` - Facilitator webapp for match coordination (port 8030)
- `wali.niyyah.se` - Guardian webapp for verification (port 8040)
- `www.niyyah.se` - Public marketing website (port 8050)

Each application has its own dedicated port range (10 ports per app) for local development to avoid conflicts.

## Database Architecture

The project uses a single PostgreSQL database with multiple schemas:

- **Application schemas** (`candidate`, `guardian`, `facilitator`, `administrator`) - Store authentication, sessions, and app-specific data
- **Shared domain schema** (`niyyah`) - Contains all shared business domain data (profiles, proposals, sittings, etc.)
- All applications (except the marketing site) have read/write access to the `niyyah` schema
- The administrator application has elevated write access to all schemas for user management

## Local Development

Run PostgreSQL 18 locally using Docker Compose:
- Start: `docker compose up -d`
- Stop: `docker compose down`
- Database runs on standard port 5432

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
