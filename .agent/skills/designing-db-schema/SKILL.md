---
name: Designing Database Schema
description: Guidelines for writing database schema definitions and migrations using Drizzle ORM.
---

# Designing Database Schema

This skill covers how to write database schema definitions and manage migrations using Drizzle ORM.

## Database Organization

The project uses a single PostgreSQL database with multiple schemas:

- **Application schemas**: `candidate`, `guardian`, `facilitator`, `administrator`
  - Store authentication, sessions, and app-specific data
- **Shared domain schema**: `niyyah`
  - Contains all shared business domain data (profiles, proposals, sittings, etc.)
- **Marketing schema**: `marketing`
  - Contains marketing-related data (waitlist, etc.)

## Schema Definition Location

All schema definitions are in the shared database library:

```
libs/db/src/schema/
├── candidate.ts      # Candidate app schema
├── guardian.ts       # Guardian app schema
├── facilitator.ts    # Facilitator app schema
├── administrator.ts  # Administrator app schema
├── niyyah.ts        # Shared domain schema
├── marketing.ts     # Marketing schema
└── index.ts         # Exports all schemas
```

## Defining Schemas

Use `pgSchema()` to create namespaced schemas:

```ts
import { pgSchema } from 'drizzle-orm/pg-core';

/**
 * Candidate schema used by the candidate website
 */
export const schema = pgSchema('candidate');
```

## Defining Tables

Use the schema instance to define tables:

```ts
import {
  boolean,
  integer,
  pgSchema,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const schema = pgSchema('candidate');

export const user = schema.table('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
```

## Naming Conventions

- **SQL column names**: Use snake_case (e.g., `birth_year`, `created_at`)
- **TypeScript property names**: Use camelCase (e.g., `birthYear`, `createdAt`)
- **Table names**: Use singular form (e.g., `user`, not `users`)

**Example:**

```ts
export const profile = schema.table('profile', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')  // SQL: user_id, TS: userId
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  birthYear: integer('birth_year').notNull(),  // SQL: birth_year, TS: birthYear
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

## Foreign Keys

Always specify the `onDelete` behavior for foreign keys:

```ts
userId: text('user_id')
  .notNull()
  .references(() => user.id, { onDelete: 'cascade' }),
```

Common options:
- `cascade`: Delete related records when parent is deleted
- `set null`: Set to null when parent is deleted
- `restrict`: Prevent deletion if related records exist

## Enums

Define enums using the schema instance:

```ts
/**
 * Marital status enum for candidate profiles
 */
export const maritalStatus = schema.enum('marital_status', [
  'single',
  'divorced',
  'widowed',
]);

export const profile = schema.table('profile', {
  // ... other fields
  maritalStatus: maritalStatus('marital_status').notNull(),
});
```

## Migration Workflow

Run these commands from the `libs/db` directory:

### 1. Generate Migrations

After modifying schema files, generate SQL migration files:

```bash
cd libs/db
pnpm drizzle-kit generate --name add_profiles_table
```

This creates a new SQL file in `libs/db/drizzle/` with a sequential number (e.g., `0004_add_profiles_table.sql`).

### 2. Review the Migration

Always review the generated SQL before applying:

```bash
cat drizzle/0004_add_profiles_table.sql
```

### 3. Apply Migrations

Apply migrations to the database:

```bash
pnpm drizzle-kit migrate
```

### 4. Verify Schema

Check for schema consistency:

```bash
pnpm drizzle-kit check
```

## Using the Database in Applications

Import the client factory and create a connection:

```ts
// apps/app-niyyah-se/src/lib/server/db/index.ts
import { env } from '$env/dynamic/private';
import { createClient } from '@niyyah/db';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const { client, db } = createClient(env.DATABASE_URL);
```

Import schema tables for queries:

```ts
import { db } from '$lib/server/db';
import { candidate } from '@niyyah/db';
import { eq } from 'drizzle-orm';

// Query example
const user = await db
  .select()
  .from(candidate.user)
  .where(eq(candidate.user.email, 'user@example.com'));
```

## Summary

- **Schemas**: Use `pgSchema()` for namespaced schemas
- **Tables**: Define with proper types, constraints, and foreign keys
- **Naming**: snake_case for SQL, camelCase for TypeScript
- **Enums**: Define using schema.enum()
- **Migrations**: Generate → Review → Apply → Verify
- **Location**: All schemas in `libs/db/src/schema/`
