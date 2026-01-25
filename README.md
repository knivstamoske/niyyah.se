# Niyyah

This repository contains the source code for the Niyyah project, a platform to facilitate serious marriage intentions according to orthodox Islamic rules, with the local mosque as a neutral, responsible party. The platform is designed to be discreet, secure, and respectful of Islamic principles. For a detailed understanding of the project's features, and technical specifications, please refer to the [project specification document](./docs/specification.md).

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

## Contributing

This project is built open source for transparency. This is a TypeScript monorepo using `pnpm` workspaces. Developers and AI agents contributing to this project should follow the guidelines outlined in the [developer guidelines document](./AGENTS.md). This document covers repository structure, commit conventions, and the development workflow.
