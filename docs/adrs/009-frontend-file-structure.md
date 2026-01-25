# 9. Frontend File Structure

Date: 2026-01-25

## Context

As the frontend applications grow, we need a strict and consistent file structure to maintain organization, separation of concerns, and predictability in our codebase. Mixing client and server code or having loose files in the library root leads to confusion and potential security risks (e.g., leaking server secrets to the client).

## Decision

We will adopt a strict file structure for all frontend applications.

### 1. Lib Directory Structure

The `src/lib` directory is the root of our application logic. It must strictly contain **only** the following four directories:

*   **`assets/`**: Static assets like images, fonts, and global styles.
*   **`client/`**: Client-side logic, UI components, Svelte stores, and browser-specific utilities.
*   **`server/`**: Server-side logic, database interactions, authentication handlers, and secrets.
*   **`shared/`**: Code shared between client and server, such as TypeScript interfaces/types, Zod schemas, helper functions, and constants.

**Strict Constraint**:
*   **No files** are allowed directly in the root of `src/lib`.
*   **No other directories** are allowed in the root of `src/lib`.
*   All application code must reside within one of these four directories.
*   Any existing files (e.g., `src/lib/config.ts`, `src/lib/index.ts`) must be moved to their appropriate subdirectory.

### 2. Remote Functions

We will use **Remote Functions** for all server-side logic that needs to be invoked by the client. This replaces traditional API routes for application logic.

*   **Pattern**: Use a "Remote Function" pattern (logic encapsulated in a function, server-only).
*   **Location**: Remote functions must be **co-located** with the page (in `src/routes/...`) that calls that function.
*   **Constraint**: Remote functions must **NOT** be placed inside `src/lib`.
*   **File Naming**: One file per remote function.
    *   Name the file exactly after the function name.
    *   Suffix: `.remote.ts`
    *   Example: `joinWaitlist.remote.ts`
*   **Content**: Each file should export the remote function.

### 3. Prohibition of API Directory

*   **Rule**: The usage of `src/routes/api` (or `src/api`) is **STRICTLY PROHIBITED** for defining application logic.
*   **Rationale**: We want to enforce the Remote Function pattern and avoid scattered API endpoints.
*   **Exception**: The **only** permitted exception is the existing authentication route required to support the third-party authentication library (e.g., Better Auth). No other exceptions are allowed.

## Consequences

### Positive
*   **Organization**: Complete clarity on where code belongs based on its environment (client vs. server vs. shared).
*   **Security**: Reduces the risk of accidentally importing server code (with secrets) into client bundles.
*   **Maintainability**: enforcing "one file per function" for remote logic prevents "God objects" or massive controller files.

### Negative
*   **Rigidity**: Developers must stick to the structure; quick "script" files in `lib` are not allowed.
*   **Migration**: Existing codebases need to be refactored to fit this structure (moving files from `lib/` to `lib/shared/` or `lib/server/`).
