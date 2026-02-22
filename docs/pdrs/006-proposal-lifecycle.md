# 006 - Proposal Lifecycle

- Date: 2026-02-22

## Context

In PDR 004 (Candidate User Journey), we identified a "Matching" state where a facilitator proposes a match, pending candidate decisions. However, this process lacks a formal entity and lifecycle. Currently, facilitators manage this through messages or external coordination. To improve platform transparency, facilitate automated transitions (like moving to a meeting), and enforce exclusivity rules, we need a dedicated "Proposal" concept.

A proposal acts as the bridge between a candidate being **Active** (ready for matching) and a **Meeting** being scheduled.

## Decision

We will implement a `Proposal` entity with the following lifecycle and rules:

### Proposal States

1.  **Pending**: The facilitator has sent the proposal to both candidates. Both must review the limited profile information provided.
2.  **Accepted**: Both candidates have expressed interest in meeting.
    - **Trigger**: Reaching this state automatically creates a **Meeting** in the `Scheduling` state (PDR 005).
    - **Trigger**: Reaching this state transitions the candidates' journey status to `Matched`.
3.  **Declined**: One or both candidates have declined the match.
    - **Consequence**: The proposal is closed. Candidates return to the `Active` state if they have no other active proposals/meetings.
4.  **Withdrawn**: The facilitator has canceled the proposal before it was resolved (e.g., if a candidate's status changed or a mistake was made).

### Candidate Status Transitions

- When a proposal is created, both candidates' statuses change from **Active** to **Matching**.
- If a proposal is **Accepted**, both candidates' statuses change to **Matched**.
- If a proposal is **Declined** or **Withdrawn**, and the candidate has no other pending proposals (though usually they only have one), they return to **Active**.

### Exclusivity Rules

To maintain the platform's focus on sincerity and "one-at-a-time" matching:
- A candidate can only be part of **one active Proposal** at a time.
- A candidate cannot receive a new Proposal if they are already in the **Matching**, **Matched**, or **Meeting** (Scheduling, Scheduled, Pending Feedback) states.

### Lifecycle Diagram

```text
       ┌────────────┐
       │  Pending   │─────────────┐
       └─────┬──────┘             │
             │                    │
      (Both Accept)        (Either Declines /
             │              Facilitator Withdraws)
             ▼                    │
       ┌────────────┐             ▼
       │  Accepted  │      ┌────────────┐
       └─────┬──────┘      │  Declined  │
             │             │     /      │
      (Auto-Creates        │  Withdrawn │
        Meeting)           └────────────┘
             ▼
       (Meeting: Scheduling)
```

## Consequences

### Positive

- **Process Automation**: Automatically transitioning to the `Matched` state and creating a `Meeting` reduces manual work for facilitators.
- **Improved Tracking**: Facilitators can easily see which matches are pending response and how long they have been open.
- **Enforced Exclusivity**: The system can programmatically prevent a candidate from being "double-matched," ensuring each match gets full serious consideration.
- **Clear UI**: Candidates get a dedicated "Match Proposal" view instead of just a generic message.

### Negative

- **Rigidity**: If a facilitator wants to "soft-propose" someone without a formal lock, they can't do it through this system. (However, this is a desired architectural constraint).
- **Complexity**: Adds another table and status enum to the database and backend logic.

### Trade-offs

- We continue to prioritize **sincerity over volume**. Locking candidates at the proposal stage prevents the "shopping" behavior common on dating apps, even if it might slow down the total number of connections made.
