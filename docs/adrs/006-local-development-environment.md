# 006 - Local Development Environment

- Date: 2025-11-29

## Context

This monorepo contains multiple SvelteKit applications that developers need to run simultaneously during local development. Without coordinated port assignments, developers would face port conflicts and configuration overhead when working across multiple apps.

Additionally, all applications share a PostgreSQL database. Running PostgreSQL locally requires consistent configuration across developer machines, and managing database state during development needs to be simple and reproducible.

## Decision

We will standardize the local development environment with the following conventions:

### Port Allocation

Each application is assigned a dedicated port range of 10 ports, with the development server using the first port in each range:

- `admin.niyyah.se`: 8010-8019 (dev server on 8010)
- `app.niyyah.se`: 8020-8029 (dev server on 8020)
- `match.niyyah.se`: 8030-8039 (dev server on 8030)
- `wali.niyyah.se`: 8040-8049 (dev server on 8040)
- `www.niyyah.se`: 8050-8059 (dev server on 8050)

The remaining 9 ports in each range are reserved for future services related to that application (e.g., API servers, WebSocket servers, development proxies).

### Database

PostgreSQL 18 will be run locally using Docker Compose. The database configuration is:

- Service: PostgreSQL 18
- Port: 5432 (standard PostgreSQL port)

Developers start the database with `docker compose up -d` and stop it with `docker compose down`.

## Consequences

- Developers can run all applications simultaneously without port conflicts.
- The port allocation scheme is clear and leaves room for future expansion per application.
- Database setup is consistent across all developer machines, reducing "works on my machine" issues.
- Docker Compose provides easy database lifecycle management (start, stop, reset).
- Developers must have Docker installed to run the database locally.
