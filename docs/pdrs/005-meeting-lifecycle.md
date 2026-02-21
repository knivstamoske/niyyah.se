# 005 - Meeting Lifecycle

- Date: 2026-02-21

## Context

Following the candidate user journey established in PDR 004, candidates who are matched by facilitators will proceed to meet in person to determine their compatibility for marriage. Given the strict Islamic guidelines of the platform (involvement of a Wali for female candidates, neutral public locations, and no private chat), the lifecycle of these physical meetings must be formalized. We need to define the exact states a meeting goes through from proposition to conclusion, and how exceptions (like cancellations or no-shows) are handled.

## Decision

We define the lifecycle of a meeting as follows to streamline coordination and strictly enforce platform rules:

### Meeting States

1. **Scheduling**: The facilitator suggests potential time slots and venues to both candidates via the platform. Candidates review and accept a suitable option.
2. **Scheduled**: Both candidates have agreed on a time and venue. The meeting is confirmed.
3. **Pending Feedback**: The scheduled meeting time has passed. Candidates are now required to provide feedback on the meeting.
4. **Completed**: Both candidates have provided feedback and the outcome of the meeting is resolved.
5. **Cancelled**: The meeting was cancelled before it occurred (due to candidate decline during scheduling, cancellation request, etc).

### Candidate Exclusivity (The "Lock")

To ensure focus and sincerity, candidates operate under strict exclusivity during a meeting's lifecycle. From the moment a meeting enters the **Scheduling** state until the meeting is either **Cancelled** or feedback is resolved and it reaches **Completed**, both candidates are considered "locked". During this time, they cannot be proposed to, or matched with, any other potential candidates.

### Feedback Mechanism & No-Shows

Once a meeting reaches the **Pending Feedback** state, both candidates have a strict **1-week deadline** to provide feedback through the platform.

When submitting feedback, candidates will indicate the outcome, which may include:

- **Proceed**: Interest in continuing with the match (e.g., another meeting or proceeding to marriage).
- **Decline**: Not interested in moving forward.
- **No-Show**: Reporting that the other candidate failed to attend the meeting. If a No-Show is reported, the facilitator will review and, as established in PDR 004, issue a warning or a ban.

### Lifecycle Diagram

```text
       ┌────────────┐        (Decline / Timeout)
       │ Scheduling │─────────────────────────────┐
       └──────┬─────┘                             │
              │ (Time/Location agreed)            ▼
              ▼                            ┌────────────┐
       ┌────────────┐      (Cancellation)  │ Cancelled  │
       │ Scheduled  │─────────────────────►└────────────┘
       └──────┬─────┘
              │ (Meeting time passes)
              ▼
       ┌────────────┐
       │  Pending   │
       │  Feedback  │
       └──────┬─────┘
    (1-Week Feedback Window:
     Proceed, Decline, No-Show)
              │ (Feedback resolved)
              ▼
       ┌────────────┐
       │ Completed  │
       └────────────┘
```

## Consequences

### Positive

- **Clarity and Simplicity**: Removing unnecessary states (like "Proposed" or distinct "No-Show" states) simplifies the mental model for facilitators and the platform architecture.
- **Exclusivity**: Locking candidates from the "Scheduling" state forwards ensures that candidates are seriously considering one match at a time, reinforcing the platform's anti-dating app philosophy.
- **Accountability**: The 1-week feedback deadline and clear mechanism to report No-Shows during feedback ensures issues are flagged promptly.

### Negative

- **Gridlock Risks**: If candidates take too long to respond during the 1-week window or during the Scheduling state, their profiles remain locked, potentially extending the time they are unavailable to other promising matches.

### Trade-offs

- We prioritize **sincerity and exclusivity** over **velocity**. While candidate locks might artificially slow down the overall matching volume, it enforces the "one-at-a-time" respect expected in Islamic courtship.
