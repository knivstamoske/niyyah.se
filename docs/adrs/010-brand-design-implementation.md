# 010 - Brand Design Implementation

- Date: 2026-02-01

## Context

Following the product decision to establish a unified Brand Design Language (see PDR-003), we need a technical strategy to implement these design tokens and constraints across our frontend applications. Hardcoding colors or style values leads to inconsistency and high maintenance costs.

## Decision

We will centralize all design tokens in a shared library `@niyyah/ui`.

### Shared Library `@niyyah/ui`

We created a new library at `libs/ui` that acts as the single source of truth for UI constants, design tokens, and shared components.

- **Import Path**: `@niyyah/ui`
- **Subpaths**:
    - `@niyyah/ui/color`: Exports color constants.

### Color Implementation

Colors are exported as named JavaScript constants to be used in CSS-in-JS, inline styles, or configuration files (like Tailwind config).

```typescript
import { taupe, cream, midnyt } from '@niyyah/ui/color';
```

We deliberately defined specific named colors (`taupe`, `cream`, etc.) rather than generic functional names (Primary, Secondary) to decouple the value from its usage context, though functional mappings can be created within apps if needed. Note that color names are **lowercase**.

### Styling Constraints

- **Borders**: Implement borders using a consistent width (e.g., `1px`) and slightly rounded corners (`rounded-sm` or `2px-4px`). Avoid `rounded-full` or large radii for containers.
- **Layouts**:
    - Default to **single-column** layouts for content flows.
    - Max-width containers should be used to maintain readablity on large screens, centering the single column.
    - Avoid multi-column grids for text-heavy content.

### Graphics

- Use SVG exports where possible for logos and icons to ensure crisp rendering on all devices.
- Reference shared assets from central locations rather than duplicating them.
- Ensure all generated or created graphics strictly adhere to the specs in PDR-003.

## Consequences

- **Positive**:
    - Changing a brand color requires updating only one file in `libs/ui`.
    - Type-safety for colors when using TypeScript.
    - Enforced consistency across all apps in the monorepo.

- **Negative**:
    - Engineers must remember to import from `@niyyah/ui` rather than hardcoding values.
    - Adding new colors requires a library update and potentially a version bump (if published) or rebuild.
