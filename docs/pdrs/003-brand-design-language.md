# 003 - Brand Design Language

- Date: 2026-02-01

## Context

To ensure a cohesive and premium user experience across all Niyyah applications, we need to establish a unified brand design language. This language must communicate our core values of intention, sincerity, and reliability while maintaining a modern, accessible aesthetic. The design needs to be mobile-first, reflecting the primary usage pattern of our users.

## Decision

We are adopting a design language centered on "Organic Minimalism". This approach prioritizes content, readability, and a relaxed viewing experience.

### Color Palette

We use a curated set of earth tones to evoke warmth and stability. These colors are selected to work harmoniously in various combinations. Note that we use specific lowercase names for these brand colors.

**Primary Palette:**
- **taupe** (`#8D7B6C`): A warm, earthy neutral used for grounding elements, secondary backgrounds, or subtle borders.
- **cream** (`#F9EFDA`): A soft, off-white color used for **secondary backgrounds**, highlighted sections, or "paper" surfaces on top of the white canvas.
- **slate** (`#7C8C9A`): A cool, balanced grey-blue used for secondary text, metadata, and neutral UI elements.
- **midnyt** (`#36495B`): A deep, rich blue-grey. This is our primary ink color for text and strong definitions, replacing standard black.
- **bronze** (`#B58D54`): A metallic, warm accent used for highlights, call-to-actions, and key focal points.

**Semantic Colors:**
- **success** (`#10B981`): For positive states and confirmations.
- **warning** (`#F59E0B`): For attention-grabbing alerts.
- **error** (`#EF4444`): For critical errors and destructive actions.

### Layout & Spacing

- **Columns**: We strictly utilize a **single-column layout** for main content areas. This enforces a mobile-first discipline, ensures content is easily consumable on focused screens, and creates a "relaxed" reading pace without visual clutter.
- **Whitespace**: Generous usage of whitespace to separate sections, reinforcing the relaxed and contemplative nature of the brand.

### Shapes & Borders

- **Borders**: Sharp, defined borders to convey precision.
- **Corners**: Slightly rounded corners (approx. 2px - 4px radius) to soften the harshness of sharp squares while avoiding the overly bubbly look of fully pill-shaped elements. This strikes a balance between professional and friendly.
- **Depth**: **Do not use shadows** (`box-shadow`, `drop-shadow`). Depth should be communicated through layout, borders, and color contrast, not artificial shading.

### Iconography & Graphics

Graphics should be generative and illustrative, following a specific "Flat Organic" style. This description serves as the specification for creating or generating new assets (e.g., via AI or illustration tools).

**Style Specification:**
- **Flat aesthetic**: No gradients, shadows, or 3D effects. Use solid blocks of color.
- **Clean lines**: Shapes should be simple and geometric but arranged organically to look natural.
- **Limited Palette**: Strictly use the Brand Color Palette defined above (`taupe`, `cream`, `slate`, `midnyt`, `bronze`). Do not introduce outside colors.
- **Composition**: Scenes should be minimal and uncluttered. Use negative space effectively (often using `cream` as the background negative space).
- **Subjects**: Focus on themes of family, contemplation, community, and peace. Characters should be depicted in a modern, flat vector style without facial features (faceless), focusing on posture and interaction to convey emotion.
- **Stroke**: Avoid heavy outlines. Let the contrast between color blocks define the shapes. If lines are needed, use `midnyt` or `taupe` with a consistent, thin weight.

**Example Generative Prompts:**
- *"A flat vector illustration of a diverse group of people standing together in a circle, viewed from slightly above, using earth tones like taupe, cream, and deep blue-grey. Minimalist style, no facial features, solid colors, cream background."*
- *"A simple flat icon of a lantern, using bronze and midnight blue colors, clean geometric shapes, no shading, cream background."*

## Consequences

- **Consistency**: Designers and AI tools have a clear reference for creating new interfaces and assets.
- **Constraint**: The single-column constraint may require more scrolling on desktop but ensures perfect mobile experiences and simpler responsive logic.
- **Identity**: The specific color palette and "midnyt" definition establishes a unique visual identity distinct from generic SaaS blues and greys.
