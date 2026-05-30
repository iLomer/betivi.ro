# Decisions Log — betivi

Settled decisions. Never re-debate these.

---

## Format
```
## D[NNN] — [Decision Title]
**Date:** [date]
**Decision:** [What was decided]
**Alternatives considered:** [What else was evaluated]
**Reason:** [Why this choice]
**Consequences:** [What this means going forward]
```

---

## D001 — Romanian-only for v1
**Date:** May 2025
**Decision:** The platform launches in Romanian only. No multi-language support in v1.
**Alternatives considered:** Bilingual (RO + EN) from day one
**Reason:** betivi.ro is a Romanian app from the ground up, not a global app with a Romanian filter. Romanian context (local slang, regional drink names, cultural references) is a core differentiator. Adding English introduces translation overhead and dilutes the cultural identity.
**Consequences:** All copy, UI labels, validation messages, and content are in Romanian. No i18n infrastructure needed for v1.

---

## D002 — Web-only for v1, no native apps
**Date:** May 2025
**Decision:** v1 is a mobile-responsive web app only. No native iOS or Android apps.
**Alternatives considered:** React Native / Expo alongside web
**Reason:** Faster to ship, one codebase to maintain, and a well-built mobile web experience is sufficient to validate the core product before investing in native apps.
**Consequences:** Must pass mobile UX bar (iOS Safari + Android Chrome, no horizontal scroll, fast load on 4G). Native app is a Phase 2+ decision.

---

## D003 — No events/calendar feature
**Date:** May 2025
**Decision:** No event creation, RSVP, or calendar integration in any planned version.
**Alternatives considered:** Event listings for beer festivals, winery visits
**Reason:** Event data expires, requires continuous maintenance, and becomes garbage quickly. No one owns the editorial burden. Each festival is structurally different.
**Consequences:** If users ask for events, direct them to Facebook Events. Not a roadmap item.

---

## D004 — No chat or direct messaging
**Date:** May 2025
**Decision:** No in-app messaging, chat rooms, or DMs between users.
**Alternatives considered:** Simple DM system, group pub chat
**Reason:** WhatsApp already exists. Building chat introduces moderation complexity, spam vectors, and ongoing infrastructure cost without proportional user value.
**Consequences:** Social interaction happens through public reviews, activity feed, and profile follows. No private communication channel.

---

## D005 — No marketplace or delivery
**Date:** May 2025
**Decision:** No e-commerce, product purchasing, delivery integration, or reservations.
**Alternatives considered:** Linking to online beer shops, table booking via integrations
**Reason:** A completely different business with different complexity, different legal requirements, and a different team. Not our core product.
**Consequences:** Venue pages and producer pages are informational only. No transactional layer.

---

## D006 — No display ads or data sales
**Date:** May 2025
**Decision:** No display advertising, no selling user data to third parties, no aggressive freemium that blocks core features.
**Alternatives considered:** Google AdSense, sponsored feed posts
**Reason:** Community credibility is worth more than early ad revenue. The trust of the drinking community is the platform's primary asset.
**Consequences:** Monetization path is verified producer pages, Betiv Premium subscriptions, and clearly-labeled sponsored circuits — all opt-in and transparent.

---

## D007 — Grades and badges replace points systems
**Date:** May 2025
**Decision:** User progression uses named grades (Stagiar / Autorizat / Emerit / Academician) and earned badges. No numeric points, no virtual currency, no leaderboard scores.
**Alternatives considered:** XP points system, numeric score, purchasable badges
**Reason:** Points systems complicate UX and create expectations around redemption that cannot be managed. Named grades carry identity and humor without a redemption problem.
**Consequences:** Badge logic and grade thresholds are defined by platform rules, not user-visible points. No currency conversion path.

---

## D008 — ANBR card is the primary virality mechanism
**Date:** May 2025
**Decision:** The downloadable ANBR membership card PNG is the platform's primary organic growth channel. Every product decision should protect its shareability and desirability.
**Alternatives considered:** Referral links, invite codes, social share buttons
**Reason:** An image that looks like a real membership card is inherently shareable on WhatsApp Status and Instagram Story without any incentive. It converts viewers into signups through curiosity.
**Consequences:** The card design and download flow are high-priority features. Card rendering quality and the uniqueness of each card number must be maintained.
