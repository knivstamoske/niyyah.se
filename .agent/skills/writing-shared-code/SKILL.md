---
name: Writing Shared Code
description: Guidelines for organizing and sharing code within an app and across the monorepo using the lib directory structure.
---

# Writing Shared Code

This skill covers how to organize and share code within applications and across the monorepo.

## Lib Directory Structure

The `src/lib` directory must strictly contain **only** the following four directories:

- **`assets/`**: Static assets like images, fonts, and global styles
- **`client/`**: Client-side logic, UI components, Svelte stores, and browser-specific utilities
- **`server/`**: Server-side logic, database interactions, authentication handlers, and secrets
- **`shared/`**: Code shared between client and server (TypeScript interfaces/types, Zod schemas, helper functions, constants)

## Strict Constraints

- ❌ No files are allowed directly in the root of `src/lib`
- ❌ No other directories are allowed in the root of `src/lib`
- ✅ All application code must reside within one of these four directories

## When to Use Each Directory

### `assets/`
Use for static files that don't contain logic:
- Images (logos, icons, illustrations)
- Fonts
- Global CSS/SCSS files
- Other static resources

### `client/`
Use for code that runs **only in the browser**:
- Svelte components (UI elements)
- Svelte stores (client-side state management)
- Browser APIs (localStorage, sessionStorage, etc.)
- Client-side utilities (formatting, validation helpers used in UI)

**Example:**
```ts
// src/lib/client/stores/theme.ts
import { writable } from 'svelte/store';

export const theme = writable<'light' | 'dark'>('light');
```

### `server/`
Use for code that runs **only on the server**:
- Database clients and queries
- Authentication logic
- API integrations
- Environment variable access
- Secrets and sensitive configuration
- Server-side utilities

**Example:**
```ts
// src/lib/server/db/index.ts
import { env } from '$env/dynamic/private';
import { createClient } from '@niyyah/db';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const { client, db } = createClient(env.DATABASE_URL);
```

### `shared/`
Use for code that can run **both on client and server**:
- TypeScript interfaces and types
- Zod schemas (for validation)
- Pure utility functions (no browser or server dependencies)
- Constants and enums
- Business logic that doesn't depend on environment

**Example:**
```ts
// src/lib/shared/schemas/user.ts
import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;
```

## Sharing Code Across the Monorepo

For code that needs to be shared across multiple applications:

1. Create a package in `/libs` directory
2. Add it to the workspace in the root `package.json`
3. Import it using the package name (e.g., `@niyyah/db`)

**Example:**
```ts
// In any app: apps/app-niyyah-se/src/lib/server/db/index.ts
import { createClient } from '@niyyah/db'; // Shared library
```

## Summary

- **Within an app**: Use `src/lib/{assets,client,server,shared}`
- **Across apps**: Create a package in `/libs` and import by package name
- **Never**: Put files directly in `src/lib` root or create other directories
