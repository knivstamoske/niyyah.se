# @niyyah/db

Shared database library for the Niyyah.se monorepo, powered by [Drizzle ORM](https://orm.drizzle.team/) and [Postgres.js](https://github.com/porsager/postgres).

## Overview

This package contains:

- The Drizzle ORM schema definitions (`src/schema`).
- A factory function to create a typed database client (`src/client.ts`).
- Drizzle Kit configuration for migrations and code generation.

## Prerequisites

This library requires a PostgreSQL database connection string. Create a `.env` file in the root of this package (or ensure your consuming app provides it) with the following variable:

```bash
DATABASE_URL="postgres://user:password@host:port/database"
```

## Usage

### In Applications

Import the client factory and create a connection instance. For example, in SvelteKit:

```typescript
// apps/www-niyyah-se/src/lib/server/db/index.ts
import { env } from "$env/dynamic/private";
import { createClient } from "@niyyah/db";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export const { client, db } = createClient(env.DATABASE_URL);
```

### Defining Schema

Add new tables to `src/schema/` and export them in `src/schema/index.ts`.

```typescript
// src/schema/users.ts
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
});
```

## Development

Since this is a library, database management tasks are performed using `drizzle-kit` directly within this directory.

### Scripts

Run these commands from the `libs/db` directory:

```bash
# Generate SQL migrations based on schema changes
pnpm drizzle-kit generate

# Apply migrations to the database
pnpm drizzle-kit migrate

# Open Drizzle Studio to browse/edit data
pnpm drizzle-kit studio

# Check for schema consistency
pnpm drizzle-kit check
```