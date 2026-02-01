---
name: Designing UI
description: Guidelines for designing user interfaces and enforcing the brand language using Tailwind CSS v4.
---

# Designing UI with Tailwind CSS v4

This skill covers how to implement the Niyyah Brand Design Language using Tailwind CSS v4.

## Core Principle: No Config Files

**IMPORTANT:** We use Tailwind CSS v4, which is "CSS-first".
- ❌ **DO NOT** create or use `tailwind.config.js` or `tailwind.config.ts`.
- ❌ **DO NOT** use `@config` directive unless absolutely necessary (rare).
- ✅ **DO** configure the theme directly in CSS using the `@theme` directive.

## Brand Colors

The brand colors are globally defined in `@niyyah/ui/src/styles.css` using the `@theme` directive. They are available as standard utility classes.

| Concept  | Name      | Hex       | Variable         | Utility Class Examples         |
| :------- | :-------- | :-------- | :--------------- | :----------------------------- |
| Primary  | `midnyt`  | `#36495B` | `--color-midnyt` | `text-midnyt`, `bg-midnyt`     |
| Ground   | `taupe`   | `#8D7B6C` | `--color-taupe`  | `border-taupe`, `text-taupe`   |
| Surface  | `cream`   | `#F9EFDA` | `--color-cream`  | `bg-cream`                     |
| Neutral  | `slate`   | `#7C8C9A` | `--color-slate`  | `text-slate`, `ring-slate`     |
| Accent   | `bronze`  | `#B58D54` | `--color-bronze` | `text-bronze`, `bg-bronze`     |
| Success  | `success` | `#10B981` | `--color-success`| `text-success`, `bg-success`   |
| Warning  | `warning` | `#F59E0B` | `--color-warning`| `text-warning`, `bg-warning`   |
| Error    | `error`   | `#EF4444` | `--color-error`  | `text-error`, `bg-error`       |

**Usage Rule:**
- **Always** use these utility classes for colors.
- **Never** hardcode hex values (e.g., `text-[#36495B]`) in components.

## Implementation Guidelines

### 1. Setup in Apps

Apps must import the shared UI styles in their main CSS entry point (e.g., `src/app.css`):

```css
@import "@niyyah/ui/styles.css";

/* App specific custom styles */
```

### 2. Layouts

- **Mobile-First**: Design for mobile first. Use utility classes without prefixes for mobile, and add `sm:`, `md:`, `lg:` prefixes for larger screens.
- **Single Column**: As per PDR-003, typically use a single centered column for content.

```html
<main class="mx-auto max-w-lg px-4 py-8">
  <!-- Content flows here -->
</main>
```

### 3. Borders & Shapes

- Use `rounded-sm` (2px) or `rounded-md` (4px) for interactive elements.
- Avoid `rounded-full` for large containers.
- Use Sharp/Defined borders (`border`, `border-taupe/20`).
- **NO SHADOWS**: Do not use `shadow-*` classes. Use borders and spacing to define separation.

### 4. Customizing Theme Locally

If an app needs specific one-off overrides or additions, add them to the local CSS file using `@theme`.

```css
/* src/app.css */
@import "@niyyah/ui/styles.css";

@theme {
  --font-display: "My Custom Font", sans-serif;
  --animate-fade-in: fade-in 0.5s ease-out;
}
```

### 5. Arbitrary Values

Use strict Tailwind v4 arbitrary value syntax if you *must* break the system (do this sparingly).

```html
/* Good: Using theme variable */
<div class="top-[--spacing-4]"></div>

/* OK: Pixel perfect alignment if needed */
<div class="top-[13px]"></div>
```

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [PDR-003: Brand Design Language](../docs/pdrs/003-brand-design-language.md)
- [ADR-010: Brand Design Implementation](../docs/adrs/010-brand-design-implementation.md)
