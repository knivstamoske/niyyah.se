# 7. Standardize README Structure

Date: 2025-12-25

## Status

Accepted

## Context

As the monorepo grows with multiple applications and shared libraries, inconsistent documentation makes it difficult for developers to context-switch and understand the purpose, usage, and setup of each package.

Currently:
- Some packages might lack clear instructions on how to run or test them.
- New libraries might be created without adequate documentation.
- There is no unified standard for where to look for specific information (e.g., port numbers, environment variables).

## Decision

We will standardize the `README.md` structure for all projects within the monorepo. We define two distinct templates: one for **Applications** (`apps/*`) and one for **Libraries** (`libs/*`).

### 1. Application Template (`apps/*`)

Applications are runnable artifacts. Their documentation must focus on how to start, configure, and deploy them.

**Required Sections:**
1.  **Title & Description:** Clear name and a one-sentence summary of the app's purpose.
2.  **Application Details:** Production URL, local development port, and other high-level metadata.
3.  **Technology Stack:** Brief list of key frameworks and tools used (e.g., SvelteKit, Tailwind, specific adapters).
4.  **Prerequisites:** Dependencies required before running (e.g., Node version, Docker, specific env vars).
5.  **Getting Started:** Step-by-step instructions to install dependencies and start the dev server.
6.  **Testing:** How to run unit and E2E tests.
7.  **Deployment:** (Optional) Brief overview of how the app is built and deployed.
8.  **Project Structure:** (Optional) Key directories if non-standard.

### 2. Library Template (`libs/*`)

Libraries are consumed by other code. Their documentation must focus on API surface, installation, and internal development.

**Required Sections:**
1.  **Title & Description:** Package name (scope) and purpose.
2.  **Overview:** What problem does this library solve?
3.  **Prerequisites/Setup:** Environment variables or peer dependencies required by consumers.
4.  **Usage:** Code examples showing how to import and use the library's main features.
5.  **Development:** Instructions for maintaining the library itself (e.g., running internal scripts, migrations, or tests).

## Consequences

### Positive
- **Faster Onboarding:** Developers know exactly where to look for setup instructions.
- **Consistency:** All packages look and feel part of the same ecosystem.
- **Quality:** Enforcing a "Usage" section in libraries encourages better API design and documentation.

### Negative
- **Maintenance:** `README.md` files must be kept up-to-date as the project evolves.
- **Overhead:** Creating a new package requires a bit more initial boilerplate documentation.

## Compliance

All new packages must follow this standard. Existing packages should be retroactively updated to match this format when they are next touched.
