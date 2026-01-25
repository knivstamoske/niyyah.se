---
name: Writing Commit Messages
description: Guidelines for writing commit messages following the Conventional Commits specification with lowercase descriptions.
---

# Writing Commit Messages

This skill provides guidelines for writing commit messages in this project.

## Conventional Commits Format

All commit messages must follow the [Conventional Commits specification](https://www.conventionalcommits.org/). This ensures a consistent and machine-readable commit history.

```
<type>[optional scope]: <description>
```

## Rules

- **Type**: Use standard conventional commit types (`feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `perf`, `ci`, `build`, etc.)
- **Scope**: Optional, indicates the area of the codebase affected
- **Description**: Must be in all lowercase (except for proper nouns, acronyms, etc.)

## Examples

Good commit messages:

```
docs: add specification describing all project requirements
docs: add an AGENTS.md file to support AI assisted coding
chore: update dependencies to fix critical vulnerabilities
feat(auth): add email verification flow
fix(profile): resolve validation error on date of birth field
refactor: extract common validation logic to shared utilities
```

Bad commit messages:

```
docs: Add specification describing all project requirements  ❌ (uppercase)
Update dependencies  ❌ (missing type)
feat: Added new feature  ❌ (uppercase description)
```

## Workflow

All changes must be submitted via a GitHub Pull Request and reviewed by a human. Merges to the `main` branch are automatically deployed to the production environment.
