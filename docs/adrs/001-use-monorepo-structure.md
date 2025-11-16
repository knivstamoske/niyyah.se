# 001 - Use Monorepo with Apps/Libs/Docs Structure

- Date: 2025-11-16

## Context

This project aims to support multiple end-user applications (such as web and potentially mobile clients) that share common domain logic, UI components, and infrastructure code. We also expect the platform to evolve over time, with new apps and shared services being added.

Managing each application as a separate repository would make it harder to share code, enforce consistent tooling, and coordinate cross-cutting changes. We already have an initial structure with `apps`, `libs`, and `docs`, and the developer guidelines assume a TypeScript-first monorepo managed with `pnpm` workspaces.

## Decision

We will use a single monorepo for the Niyyah project, organized into three primary top-level directories:

- `apps`: End-user applications (e.g., the public website, admin interfaces, possible future mobile/web clients).
- `libs`: Shared libraries and packages used across one or more apps (e.g., domain models, UI libraries).
- `docs`: Documentation for developers, including ADRs, specifications, and architectural overviews.

The monorepo will be managed using `pnpm` workspaces and will be TypeScript-first.

## Consequences

- Shared logic and components can be implemented once in `libs` and reused by multiple applications, reducing duplication and drift.
- Cross-cutting changes (for example, updating a domain model) can be applied in a single pull request across all affected apps and libraries.
- Tooling, linting, and formatting can be centralized and enforced consistently across the project.
- Onboarding new contributors is simplified because there is a single repository and consistent structure to learn.
- The monorepo may grow large and require attention to build performance, dependency boundaries, and CI configuration as the project scales, but these trade-offs are acceptable for the expected scope of the project at this stage.
