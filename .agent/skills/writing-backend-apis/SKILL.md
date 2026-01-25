---
name: Writing Backend APIs
description: Guidelines for using Svelte 5 remote functions (form, query, command) for backend APIs. Strictly prohibits SvelteKit actions and /api routes.
---

# Writing Backend APIs

This skill covers how to write backend APIs using Svelte 5 remote functions.

## Critical Rules

- ✅ **USE**: Svelte 5 remote functions (`form`, `query`, `command`)
- ❌ **NEVER USE**: SvelteKit actions (STRICTLY PROHIBITED)
- ❌ **NEVER USE**: `src/routes/api` routes (STRICTLY PROHIBITED, exception: third-party auth library routes)

## Co-location and File Structure

- Remote functions must be **co-located** with the page that calls them (in `src/routes/...`)
- Remote functions must **NOT** be placed inside `src/lib`
- **One file per remote function**: Each `.remote.ts` file must export exactly ONE remote function, named exactly the same as the file
  - ✅ Correct: `joinWaitlist.remote.ts` exports `joinWaitlist`
  - ❌ Wrong: `likes.remote.ts` exports both `getLikes` and `addLike`

## Form Functions

Use `form()` for form handling and data mutations tied to form submissions.

**Define the remote function** (e.g., `src/routes/waitlist/joinWaitlist.remote.ts`):

```ts
import { z } from 'zod';
import { form } from '$app/server';
import { db } from '$lib/server/db';
import { marketing } from '@niyyah/db';

export const joinWaitlist = form(
  z.object({
    email: z.string().email().min(1, 'Email is required')
  }),
  async ({ email }) => {
    // Perform server-side logic
    await db.insert(marketing.waitlist).values({
      email: email.toLowerCase().trim()
    });
    return { success: true, message: 'Successfully joined the waitlist!' };
  }
);
```

**Use it in your component** (e.g., `src/routes/waitlist/+page.svelte`):

```svelte
<script lang="ts">
  import { joinWaitlist } from './joinWaitlist.remote';
</script>

<form {...joinWaitlist}>
  <label>
    Email
    <input {...joinWaitlist.fields.email.as('email')} />
    {#each joinWaitlist.fields.email.issues() as issue}
      <p class="error">{issue.message}</p>
    {/each}
  </label>

  <button disabled={!!joinWaitlist.pending}>
    {joinWaitlist.pending ? 'Joining...' : 'Join Waitlist'}
  </button>
</form>

{#if joinWaitlist.result}
  <p>{joinWaitlist.result.message}</p>
{/if}
```

## Query Functions - Reading Data

Use `query()` for fetching data from the server. They work like Promises and can be used with `await` in templates.

**Define a query function** (e.g., `src/routes/blog/getPosts.remote.ts`):

```ts
import { query } from '$app/server';
import { db } from '$lib/server/db';
import { blog } from '@niyyah/db';

export const getPosts = query(async () => {
  const posts = await db
    .select()
    .from(blog.posts)
    .orderBy(blog.posts.publishedAt, 'desc');
  return posts;
});
```

**Use it in your component** (e.g., `src/routes/blog/+page.svelte`):

```svelte
<script lang="ts">
  import { getPosts } from './getPosts.remote';
</script>

<h1>Recent Posts</h1>
<ul>
  {#each await getPosts() as post}
    <li><a href="/blog/{post.slug}">{post.title}</a></li>
  {/each}
</ul>
```

### Query Functions with Arguments

Always validate arguments using Zod or another Standard Schema library.

**Define a query with validation** (e.g., `src/routes/blog/[slug]/getPost.remote.ts`):

```ts
import { z } from 'zod';
import { query } from '$app/server';
import { db } from '$lib/server/db';
import { blog } from '@niyyah/db';
import { eq } from 'drizzle-orm';

export const getPost = query(
  z.string().min(1),
  async (slug) => {
    const [post] = await db
      .select()
      .from(blog.posts)
      .where(eq(blog.posts.slug, slug));
    return post;
  }
);
```

**Use it with parameters** (e.g., `src/routes/blog/[slug]/+page.svelte`):

```svelte
<script lang="ts">
  import { getPost } from './getPost.remote';

  let { params } = $props();
  const post = $derived(await getPost(params.slug));
</script>

<h1>{post.title}</h1>
<div>{@html post.content}</div>
```

### Handling Loading States

Instead of using `await`, you can access `loading`, `error`, and `current` properties:

```svelte
<script lang="ts">
  import { getPosts } from './getPosts.remote';

  const query = getPosts();
</script>

<h1>Recent Posts</h1>

{#if query.error}
  <p>Failed to load posts</p>
{:else if query.loading}
  <p>Loading...</p>
{:else}
  <ul>
    {#each query.current as post}
      <li><a href="/blog/{post.slug}">{post.title}</a></li>
    {/each}
  </ul>
{/if}
```

## Command Functions - Mutations Without Forms

Use `command()` for server-side mutations that aren't tied to a form element (e.g., button clicks, event handlers).

**Define a query function** (e.g., `src/routes/items/[id]/getLikes.remote.ts`):

```ts
import { z } from 'zod';
import { query } from '$app/server';
import { db } from '$lib/server/db';
import { items } from '@niyyah/db';
import { eq } from 'drizzle-orm';

export const getLikes = query(
  z.string().uuid(),
  async (id) => {
    const [item] = await db
      .select({ likes: items.likes })
      .from(items)
      .where(eq(items.id, id));
    return item.likes;
  }
);
```

**Define a command function in a separate file** (e.g., `src/routes/items/[id]/addLike.remote.ts`):

```ts
import { z } from 'zod';
import { command } from '$app/server';
import { db } from '$lib/server/db';
import { items } from '@niyyah/db';
import { eq } from 'drizzle-orm';

export const addLike = command(
  z.string().uuid(),
  async (id) => {
    await db
      .update(items)
      .set({ likes: db.raw('likes + 1') })
      .where(eq(items.id, id));
  }
);
```

**Use the command in an event handler** (e.g., `src/routes/items/[id]/+page.svelte`):

```svelte
<script lang="ts">
  import { getLikes } from './getLikes.remote';
  import { addLike } from './addLike.remote';

  let { params } = $props();

  async function handleLike() {
    try {
      await addLike(params.id);
    } catch (error) {
      console.error('Failed to add like:', error);
    }
  }
</script>

<button onclick={handleLike}>
  Add Like
</button>

<p>Likes: {await getLikes(params.id)}</p>
```

## Summary

- **Forms**: Use `form()` with Zod validation
- **Reading data**: Use `query()` with optional arguments and validation
- **Mutations (non-form)**: Use `command()` with validation
- **Always**: One remote function per file, co-located with the page
- **Never**: Use SvelteKit actions or `/api` routes
- Refer https://svelte.dev/docs/kit/remote-functions for more details
