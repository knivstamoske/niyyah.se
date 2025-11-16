Here is the translation of your document into English:

---

**Developing the idea. Here is a complete, compressed foundation for an MVP – without chat, without images, with a requirement for a guardian (wali) and booking appointments at the mosque.**

### Vision & Principles

- **Purpose:** Facilitate serious marriage intentions according to orthodox Islamic rules, with the local mosque as a neutral, responsible party.
- **No “dating”:** No DMs, no pictures, no open profiles.
- **All contact** happens via a booked sitting on the mosque's premises, together with the woman's guardian.
- **Traceability, security, and GDPR compliance.**

### Roles

1.  **User** (Man/Woman)
2.  **Guardian (Wali)** – confirms their role for the woman.
3.  **Mosque Admin** (reviews applications, manages times/premises).
4.  **System Admin** (platform operation/compliance).

### Core Flows

**A. Onboarding (both genders)**

1.  **Registration:** Name, city, email, phone (SMS code), year of birth.
2.  **Purpose confirmation:** “I am using this app solely to seek marriage.”
3.  **Rule acceptance (mandatory):**
    - No private mixing (no _khalwa_).
    - Sitting takes place in the mosque with witnesses according to the mosque's protocol.
    - Respectful conduct, truthful information, alcohol/drug-free context.
    - _Mahr_, conditions, and expectations are discussed openly on-site.
    - The platform is not responsible for private communication outside the sitting.

**B. Extra step for woman** 4. **Guardian is mandatory:** Checkbox + form: guardian's name, relation, phone, email. 5. **Wali verification:**
_ SMS/email to the guardian with a unique link: “I confirm that I am the guardian and will participate in the sitting.”
_ Without confirmation, one cannot proceed or book.

**C. Expressing interest & matching method**

- **Discreet application:** The user fills out a serious profile (text fields, no images):
  - Brief info about oneself (occupation, education), family situation, religious practice, smoking/alcohol (no), intention and timeframe, housing situation, financial framework, what one is seeking (age/range, city and surroundings), consent for the mosque to read.
- **Visibility:** Profiles are only visible to the mosque admin in the chosen city (not to other users).
- **Proposal:** Mosque admin can suggest a potential match between two applications in the same city/region.
- **Elimination of “swipe”:** Users do not see others; they only receive a notification: “Mosque X suggests a sitting between A and B.”

**D. Book sitting**

1.  Choose the city's official mosque in the app (predefined list).
2.  Mosque admin posts time slots and rooms.
3.  The system checks:
    - Wali confirmed (requirement for the woman).
    - Both parties have accepted the rules.
4.  Confirmation is sent to the man, woman, and wali (location, time, what to bring: ID, any documents for _mahr_ discussion, etc.).
5.  **Follow-up after the sitting:** “Do you wish to proceed?” Yes/No. Only the mosque admin sees the answer.

### Screen list (MVP)

- Start/Info → Registration → Confirm email/SMS
- Rule acceptance → (Woman) Add guardian → Wali confirmation
- Application: Personal details (text fields)
- Select Mosque/City → Submit application
- Notifications: “Mosque suggests sitting” → Book time → Confirmation
- My bookings (calendar) → Post-sitting form
- Mosque admin: Dashboard, filter, suggestions, scheduling, log

### Data model (simplified)

- `users(id, role[man/woman/wali/admin], name, birth_year, city, email, phone, verified_bool, created_at)`
- `guardian_links(id, woman_user_id, wali_user_id, status[pending/verified], verified_at)`
- `applications(id, user_id, city, profile_text, preferences_json, active_bool, created_at)`
- `mosques(id, name, city, address, admin_user_id, verified_bool)`
- `slots(id, mosque_id, start_time, end_time, room, status[open/closed])`
- `proposals(id, mosque_id, man_application_id, woman_application_id, created_at, status[pending/accepted/declined])`
- `bookings(id, proposal_id, slot_id, status[confirmed/cancelled/completed], created_at)`
- `consents(id, user_id, version, accepted_at, ip_hash)`
- `audit_logs(id, actor_user_id, action, target_id, meta_json, created_at)`

### Verifications & security

- SMS code + email link at registration.
- Wali link with OTP for confirmation.
- **Mosque verification:** only official mosques with a signed agreement get admin access.
- **Age limit 18+.** Special box: “I am unmarried/have the legal capacity to marry.”
- **Anti-fraud:** rate limits, logging, simple KYC at booking (ID check on-site is handled by the mosque).
- **Users can be blocked** globally by system admin and locally by the mosque.

### GDPR & legal (Sweden/EU)

- **Legal basis:** Consent + legitimate interest (for the booking and matching function via the mosque).
- **Data minimization:** Only text fields, no images, no chat.
- **Storage:** EU-based servers, encryption at rest and in transit.
- **Retention:** E.g., delete inactive applications after 12 months, booking logs after 24 months (or according to the mosque's needs).
- **Data extract & deletion:** Self-service in the app.
- **Policies:** Privacy Policy, Terms of Service, Code of Conduct, Complaint handling.

### UX details to keep it strict & respectful

- No profile pictures, no emojis, no DM buttons.
- Clear text fields with max length and prompt questions (serious tone).
- “Rules in brief” displayed at every critical step.
- “Tips for the first sitting” (what to cover: intention, _mahr_, housing, timeline, expectations).

### Admin tools for mosque

- Filter applications by city/age/range.
- Propose pairings (man-application ↔ woman-application).
- Publish/manage time slots and rooms.
- Export participant list for the sitting day.
- Mark outcome (proceeded/did not), internal comment (not visible to users).
- Log & incident reporting.

### Short-tone text templates (you can paste into the app)

**Rule acceptance (short):**
“I confirm that I am seeking marriage according to Islamic rules. I accept: no private chat or meetings; sittings take place in the mosque with a guardian for the woman; I will provide truthful information and follow the mosque's instructions. I understand that the platform only facilitates the booking and that the mosque is responsible for the execution.”

**GDPR Consent:**
“I consent to my data being processed to enable matching proposals and booking at the selected mosque. I can withdraw my consent, request a data extract, or request deletion at any time.”

**SMS to guardian:**
“[Name] has listed you as a guardian for a marriage sitting at [Mosque, City]. Please confirm your role and participation: [one-time-link]. Without your confirmation, the booking cannot be completed.”

### Technical MVP stack (suggestion)

- **Frontend:** React/Next.js (Web + PWA), simple, text-based UI.
- **Backend:** Node.js (NestJS) or Django REST.
- **DB:** Postgres.
- **Auth:** Magic-link + SMS OTP (e.g., Twilio/MessageBird).
- **Infra:** Vercel/Render + managed Postgres.
- **Monitoring:** Audit logs, SIEM-friendly export.

### Edge cases & policy

- **No guardian:** the app requires a confirmed wali before proposal/booking. (If the user lacks an available guardian, the mosque can in some cases appoint a representative – this is handled by the mosque admin offline and marked in the booking.)
- **Repeated rejections:** mosque can set a cool-down (e.g., 30 days) before new proposals.
- **Wrong city/no official mosque:** show an interest queue until the mosque is onboarded.
- **Reporting:** “Report” button on the booking (goes to mosque admin + system admin).

### Next steps

- Select target cities and confirm which official mosques will participate.
- Finalize the text for Rule Acceptance and Privacy Policy (version it).
- Build the screens above and run a closed pilot with 1–2 mosques.
