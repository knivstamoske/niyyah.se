# Developer Guidelines

This document provides guidance for AI agents and human developers on the conventions and structure within this repository. This is a TypeScript-first monorepo managed with `pnpm` workspaces. The repository is organized into three main directories at the root:

- `/apps`: Contains end-user applications, such as websites and mobile apps. Each subdirectory is a standalone project.
- `/libs`: Houses shared libraries and packages. This code is intended for reuse across different applications within the monorepo.
- `/docs`: Includes documentation for developers, covering specifications, architecture, and guidelines.

## Development Workflow

Commit messages must follow the [Conventional Commits specification](https://www.conventionalcommits.org/). This ensures a consistent and machine-readable commit history.

```
<type>[optional scope]: <description>
```

Examples:

- `docs: add specification describing all project requirements`
- `docs: add an AGENTS.md file to support AI assisted coding`
- `chore: update dependencies to fix critical vulnerabilities`

All changes must be submitted via a GitHub Pull Request and reviewed by a human. Merges to the `main` branch are automatically deployed to the production environment.
