---
name: Writing UI Components
description: Guidelines for writing Svelte components including structure, naming conventions, comments, and best practices for templates and helper functions.
---

# Writing UI Components

This skill provides guidelines for writing Svelte components in this project.

## Component Structure

Place all TypeScript code in the `<script lang="ts">` block at the top, organized in this order:

1. Import statements first
2. Then interfaces/types
3. Then constants/variables
4. Then functions
5. Follow with the template markup

## Naming Conventions

- **Component filenames**: Use PascalCase (e.g., `LanguagePicker.svelte`)
- **Interfaces and types**: Use PascalCase
- **Variables and functions**: Use camelCase
- **Constants**: Use UPPER_SNAKE_CASE for fixed configuration values

## Comments

Use Go-style comments: start with the name of the thing being documented, followed by "is" or "are".

**What to document:**
- Document interfaces, types, constants, and functions
- Add inline comments sparingly for complex logic only

**What NOT to document:**
- Don't document parameter/return types (they're already in the TypeScript signature)

**Focus on WHY, not WHAT or HOW:**
- Keep comments concise and focused on why the code does something
- Don't explain what the code does (the code itself should be clear)
- Don't explain how it does it (the implementation is self-evident)

**Example:**

```ts
/**
 * LanguageOption is an option for the language picker.
 */
interface LanguageOption {
  code: string;
  label: string;
}
```

## Helper Functions

- Extract complex logic into named helper functions rather than inline expressions
- Keep template expressions simple and readable
- Helper functions should have clear, descriptive names that indicate their purpose

## Loops and Conditionals

- Prefer loops over repeated markup when rendering lists
- Use `{#each}` with index when you need positional logic (e.g., adding separators between items)

## Example Component

```svelte
<script lang="ts">
  import { someStore } from '$lib/client/stores';

  /**
   * LanguageOption is an option for the language picker.
   */
  interface LanguageOption {
    code: string;
    label: string;
  }

  const AVAILABLE_LANGUAGES: LanguageOption[] = [
    { code: 'en', label: 'English' },
    { code: 'sv', label: 'Svenska' }
  ];

  let selectedLanguage = $state('en');

  function handleLanguageChange(code: string) {
    selectedLanguage = code;
  }
</script>

<div class="language-picker">
  {#each AVAILABLE_LANGUAGES as lang, i}
    {#if i > 0}<span class="separator">|</span>{/if}
    <button
      onclick={() => handleLanguageChange(lang.code)}
      class:active={selectedLanguage === lang.code}
    >
      {lang.label}
    </button>
  {/each}
</div>
```
