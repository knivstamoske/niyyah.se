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

## Coding Style

All changes must be submitted via a GitHub Pull Request and reviewed by a human. Merges to the `main` branch are automatically deployed to the production environment.

Detailed coding guidelines have been extracted into specialized skills for better organization and discoverability. When working on specific areas, the agent will automatically reference the relevant skill:

- **Commit Messages**: See `.agent/skills/writing-commits/SKILL.md`
- **UI Components**: See `.agent/skills/writing-components/SKILL.md`
- **Backend APIs**: See `.agent/skills/writing-backend-apis/SKILL.md`
- **Shared Code**: See `.agent/skills/writing-shared-code/SKILL.md`
- **Documentation**: See `.agent/skills/writing-documentation/SKILL.md`
- **Database Schema**: See `.agent/skills/designing-db-schema/SKILL.md`

### Quick Reference

**Commit Messages:**
- Follow the [Conventional Commits specification](https://www.conventionalcommits.org/).
- The commit description must be in all lower case (except for proper nouns, acronyms, etc.).
- Good: `docs: add specification describing all project requirements`
- Bad: `docs: Add an AGENTS.md file to support AI assisted coding` ( start with capital letter )

**Lib Directory Structure:**
- `src/lib/assets/` - Static assets (images, fonts, global styles)
- `src/lib/client/` - Client-side code (components, stores, browser utilities)
- `src/lib/server/` - Server-side code (database, auth, secrets)
- `src/lib/shared/` - Shared code (types, schemas, pure utilities)

**Remote Functions:**
- ✅ Use Svelte 5 remote functions (`form`, `query`, `command`)
- ❌ Never use SvelteKit actions or `/api` routes
- One remote function per file, co-located with the page
