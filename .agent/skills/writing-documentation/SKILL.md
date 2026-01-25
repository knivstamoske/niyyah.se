---
name: Writing Documentation
description: Guidelines for writing Architecture Decision Records (ADRs), Product Decision Records (PDRs), and other technical documentation.
---

# Writing Documentation

This skill covers how to write technical documentation in this project.

## Architecture Decision Records (ADRs)

ADRs document significant architectural and cross-cutting technical decisions.

### When to Create an ADR

Create an ADR when making decisions that:
- Affect multiple apps or shared libraries in the monorepo
- Have long-term architectural implications
- Involve trade-offs between different approaches
- Future contributors need to understand the reasoning behind

### ADR Location and Naming

- **Directory**: `docs/adrs/`
- **Filename format**: `NNN-descriptive-name.md` (e.g., `009-frontend-file-structure.md`)
- Use sequential numbering with zero-padding (000, 001, 002, etc.)

### ADR Template

```markdown
# NNN - Title of Decision

- Date: YYYY-MM-DD

## Context

Describe the problem or situation that requires a decision. Explain:
- What challenge are we facing?
- What constraints exist?
- Why does this decision matter?

## Decision

State the decision clearly and concisely. Include:
- What we will do
- Key implementation details
- Any specific rules or constraints

## Consequences

Describe the outcomes of this decision:
- Positive consequences (benefits)
- Negative consequences (trade-offs, costs)
- Future implications
```

### Example ADR

See `docs/adrs/000-record-architecture-decisions.md` for the foundational ADR that established this practice.

## Product Decision Records (PDRs)

PDRs document significant product, policy, and user-facing decisions.

### When to Create a PDR

Create a PDR when making decisions about:
- User experience and features
- Privacy policies
- Business model choices
- Service offerings
- User-facing policies

### PDR Location and Naming

- **Directory**: `docs/pdrs/`
- **Filename format**: `NNN-descriptive-name.md` (e.g., `001-publish-privacy-policy.md`)
- Use sequential numbering with zero-padding (000, 001, 002, etc.)

### PDR Template

PDRs follow the same template as ADRs:

```markdown
# NNN - Title of Decision

- Date: YYYY-MM-DD

## Context

Describe the product or policy situation requiring a decision.

## Decision

State the product or policy decision clearly.

## Consequences

Describe the impact on users, the business, and the platform.
```

### Example PDR

See `docs/pdrs/000-record-product-decisions.md` for the foundational PDR.

## General Documentation Guidelines

### Writing Style

- **Be concise**: Keep documents focused on a single decision
- **Be clear**: Use simple language, avoid jargon when possible
- **Be specific**: Include concrete examples and implementation details
- **Be honest**: Document trade-offs and negative consequences

### Review Process

- Create ADRs/PDRs via pull requests
- Review them like any other code change
- Ensure they're approved before merging

### Updating Decisions

- Don't modify existing ADRs/PDRs (they're historical records)
- Create a new ADR/PDR that references the original
- Explain what changed and why

## Summary

- **ADRs**: For architectural and technical decisions (`docs/adrs/`)
- **PDRs**: For product and policy decisions (`docs/pdrs/`)
- **Format**: Sequential numbering, lightweight template (Date, Context, Decision, Consequences)
- **Process**: Create via PR, review, and merge
