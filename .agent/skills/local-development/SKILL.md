---
name: Local Development
description: Guidelines for local development including Docker commands, pnpm scripts, environment setup, and development workflow.
---

# Local Development

This skill covers local development workflows, Docker usage, and pnpm commands.

## Prerequisites

### Required Software

- **Node.js**: Version 24 or higher
- **pnpm**: Version 10 or higher (enforced by `packageManager` field)
- **Docker**: For running PostgreSQL database and containerized apps

### Package Manager

This project uses **pnpm** as its package manager. The `packageManager` field in `package.json` enforces a specific version.

**Install dependencies:**

```bash
pnpm install
```

## Environment Setup

### 1. Create Environment File

Each application and the database library require a `.env` file:

```bash
# Copy example file
cp .env.example .env
```

### 2. Review and Update

Review the `.env` file and update values as needed for your local environment.

**Common variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `SMTP_*` - Email configuration (use Mailpit locally)
- Application-specific secrets

## Docker Commands

The project uses Docker Compose with service profiles:
- **Database**: Always available (no profile needed)
- **Apps**: Require `--profile apps` flag

### Database Only

Start just the PostgreSQL database:

```bash
# Start database
docker compose up -d

# Stop database
docker compose down

# View logs
docker compose logs -f postgres
```

The database runs on standard port **5432**.

### Specific App in Docker

Start a specific application with its dependencies:

```bash
# Start and rebuild specific app
docker compose --profile apps up -d --build www-niyyah-se

# Stop apps (keeps database running)
docker compose --profile apps down

# View app logs
docker compose logs -f www-niyyah-se
```

Replace `www-niyyah-se` with any app name from `docker-compose.yml`:
- `app-niyyah-se` (port 8020)
- `www-niyyah-se` (port 8050)

### All Apps in Docker

Start all applications and the database:

```bash
# Start all services
docker compose --profile apps up -d --build

# Stop all apps (keeps database running)
docker compose --profile apps down

# Stop everything including database
docker compose down
```

### Useful Docker Commands

```bash
# Rebuild without cache
docker compose --profile apps build --no-cache

# Remove all containers and volumes (DESTRUCTIVE)
docker compose down -v

# View all running containers
docker compose ps

# Execute command in running container
docker compose exec www-niyyah-se sh
```

## pnpm Scripts

### Root-Level Scripts

Run from the repository root:

```bash
# Start all apps in development mode (parallel)
pnpm start

# Build all apps
pnpm build

# Run checks (lint + type-check + tests) for all apps
pnpm check
```

### App-Level Scripts

Run from an app directory (e.g., `apps/app-niyyah-se/`):

```bash
# Start development server
pnpm start

# Build for production
pnpm build

# Run all checks (lint + type-check + tests)
pnpm check

# Linting
pnpm lint:eslint          # Run ESLint
pnpm lint:eslint:fix      # Fix ESLint issues
pnpm lint:svelte          # Run Svelte type checking

# Testing
pnpm test:vitest          # Run unit tests
pnpm test:e2e             # Run end-to-end tests
```

### Library Scripts

For shared libraries like `libs/db/`:

```bash
# Database migrations (from libs/db/)
pnpm drizzle-kit generate --name migration_name
pnpm drizzle-kit migrate
pnpm drizzle-kit check
pnpm drizzle-kit studio
```

## Development Workflow

### 1. Start Database

```bash
docker compose up -d
```

### 2. Run Migrations

```bash
cd libs/db
pnpm drizzle-kit migrate
```

### 3. Start Development Server

**Option A: Run locally**
```bash
cd apps/app-niyyah-se
pnpm start
```

**Option B: Run in Docker**
```bash
docker compose --profile apps up -d --build app-niyyah-se
```

### 4. Make Changes

Edit code, and the dev server will hot-reload automatically.

### 5. Run Checks Before Committing

```bash
# From app directory
pnpm check

# Or from root (checks all apps)
pnpm check
```

## Port Allocation

Each application has a dedicated port range (10 ports per app):

- `admin-niyyah-se` - 8010-8019
- `app-niyyah-se` - 8020-8029
- `match-niyyah-se` - 8030-8039
- `wali-niyyah-se` - 8040-8049
- `www-niyyah-se` - 8050-8059

The primary development server uses the first port in the range (e.g., 8020 for `app-niyyah-se`).

## Troubleshooting

### Port Already in Use

It is very likely the server is already up an running. Assume it is and try to access the app.

### Database Connection Issues

1. Ensure database is running: `docker compose ps`
2. Check `DATABASE_URL` in `.env`
3. Verify database is accessible: `docker compose logs postgres`

### pnpm Installation Issues

If pnpm commands fail:

```bash
# Enable Corepack (Node.js 16+)
corepack enable

# Install specific pnpm version
corepack prepare pnpm@10.26.2 --activate
```

## Summary

- **Docker**: Use `docker compose` with `--profile apps` for applications
- **pnpm**: Run `pnpm start` for dev, `pnpm build` for production, `pnpm check` for validation
- **Ports**: Each app has a dedicated 10-port range
- **Environment**: Always create `.env` from `.env.example`
