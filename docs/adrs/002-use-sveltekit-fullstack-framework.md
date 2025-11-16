# 002 - Use SvelteKit as Full-Stack TypeScript Framework

- Date: 2025-11-16

## Context

Niyyah requires a modern, responsive web experience with a strong focus on privacy, security, and a discreet user journey. The platform must handle both client-side interactions (forms, profile flows, messaging or requests) and server-side concerns (authentication, authorization, server-rendered views, form actions, and API endpoints).

We want a framework that:

- Supports TypeScript natively and integrates well with the existing TypeScript-first monorepo.
- Provides server-side rendering (SSR) and progressive enhancement out of the box.
- Allows building both frontend UI and backend endpoints in a cohesive way.
- Has a relatively small runtime footprint and is performant by default.

Alternatives such as Next.js (React-based), Nuxt (Vue-based), or a custom Express/Fastify backend paired with a separate SPA were considered. However, these either add more complexity (separate frontend/backend stacks) or do not align as strongly with the preference for Svelte's simplicity and performance characteristics.

## Decision

We will use SvelteKit as the primary full-stack TypeScript framework for Niyyah.

Specifically:

- New web applications under `apps` that serve end-users will be implemented using SvelteKit.
- SvelteKit will be configured for TypeScript from the start.
- Server routes, form actions, and APIs that are tightly coupled to the web UI will be implemented using SvelteKit's routing and server-side modules.
- Shared logic (e.g., domain models, validation, configuration) will live in `libs` and be consumed by SvelteKit apps.

## Consequences

- The same framework and language (TypeScript + Svelte) are used across client and server code in the main web app, reducing cognitive overhead and context switching.
- SvelteKit's SSR and routing model enable fast, accessible pages with good defaults for SEO and performance.
- SvelteKit's file-based routing and load functions simplify building flows that combine server-side and client-side logic, which suits the privacy-sensitive onboarding and matching flows.
- Contributors need to be comfortable with Svelte and SvelteKit conventions; this is an explicit bet on that ecosystem.
- If in the future a different frontend or backend stack is required (for example, a separate mobile API or microservices), these can be added as additional apps or services in the monorepo, reusing shared logic from `libs`, but they will not replace SvelteKit for the main web app in the short term.
