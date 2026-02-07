# 004 - Candidate User Journey

- Date: 2026-02-07

## Context

Niyyah is a marriage matching platform for young unmarried Muslims in Sweden, focusing on Islamic traditions and values. Unlike typical dating apps, the platform strictly adheres to Sharia principles, which necessitates a unique user journey involving guardians (Walis), prohibiting private chat, and facilitating physical meetings in neutral locations. We need to formalize this journey to ensure all product features and legal documents align with these core values.

## Decision

We will implement a candidate user journey based on the following strict principles:

### Target Audience & Eligibility

- **Demographic**: Young unmarried Muslims living in Sweden.
- **Intent**: Must be seeking marriage seriously.
- **Constraint**: Must strictly adhere to Islamic traditions (no dating).

### Onboarding & Verification

- **Data Minimization**: Collect only absolutely necessary information to protect privacy (e.g., name, age, location, gender, contact).
- **Guardian (Wali)**:
    - **Mandatory** for female candidates.
    - Contact information for the guardian must be provided during onboarding.
    - Guardian accompanies the candidate to meetings.
- **Verification**:
    - **Manual Vetting**: Every candidate is manually vetted by a facilitator before becoming "Active".
    - **Status Check**: Candidates cannot interact or be matched until verified.

### Matching & Discovery System

- **No Browsing**: Candidates **cannot** search, browse, or view other candidate profiles.
- **Facilitator-Led**: Matching is entirely driven by facilitators.
- **Blind Matching**: Facilitators reach out with potential matches, sharing limited info to protect privacy until interest is confirmed.
- **Initiation**: Only facilitators can initiate the matching process for candidates in the "Ready for Matching" state.

### Communication & Meetings

- **No In-App Chat**: There is **no** chat or video call feature on the platform.
- **Physical Meetings**:
    - All interactions happen via physical meetings.
    - **Location**: Neutral public locations.
    - **Chaperone**: Female candidates must be accompanied by their guardian.

### Candidate Lifecycle & States

The candidate moves through the following states:
1.  **Onboarding**: Filling out profile and guardian details.
2.  **Pending Verification**: Awaiting manual vetting by a facilitator.
3.  **Active / Ready for Matching**: Vetted and available for facilitators to match.
4.  **Paused**: Candidate voluntarily pauses matching (available only after full onboarding + verification).
5.  **Matched / In Progress**: Engaging with a potential partner.
6.  **Archived**: Successfully married or decided to leave. Profile is stored briefly, then deleted.
7.  **Banned**: Permanently removed for policy violations.

### Monetization

- **Model**: Non-profit, but charges a **Fee** to prevent abuse and filter for seriousness.
- **Waiver**: Fee can be waived for those unable to pay (requires contacting support).

### Strict Conduct Policy

- **Zero Tolerance**:
    - **No-Show**: Candidates who agree to a meeting and fail to attend are banned after a single warning.
    - **Bad Behavior**: Any misconduct during meetings results in an immediate ban.

## Consequences

### Positive

- **Differentiation**: Clearly distinguishes Niyyah as a serious, Sharia-compliant alternative to dating apps.
- **Safety**: Strict verification, guardian involvement, and no private chat significantly reduce risk of harassment and un-Islamic behavior.
- **Privacy**: No searching/browsing protects candidate identity until a match is proposed.
- **Quality**: Fees and manual vetting ensure a high-quality pool of serious candidates.

### Negative

- **Friction**: High barrier to entry (verification, fees, no browsing) may reduce user growth compared to typical apps.
- **Operational Load**: Manual vetting and facilitator-led matching require significant human effort and can be a bottleneck.
- **User Agency**: Candidates have less control over the process compared to self-serve apps, which may frustrate some users.

### Trade-offs

- **Growth vs. Quality**: We prioritize the seriousness and religious adherence of candidates over rapid user acquisition.
- **Automation vs. Human Touch**: We accept the high operational cost of facilitators to ensure the process remains dignified and private.
- **Convenience vs. Tradition**: We remove "features" like chat and search to enforce traditional Islamic courtship values.
