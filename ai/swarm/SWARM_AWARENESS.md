# SWARM_AWARENESS — betivi

> **READ ONLY for epic agents. Only `@meto-pm` and checkpoint protocol may write here.**
> Parsed by `npx meto-cli status` — keep section headers and format exact.

---

## [swarm:meta]
- **Project:** betivi
- **Mode:** swarm
- **Started:** *(date)*
- **Total epics:** 8
- **Total tasks:** *(n — populated at swarm init)*
- **Acceptance criteria:** 0 / 0 passed

---

## [swarm:epics]

| Epic ID | Name | Agent | Status | Tasks Done | Blocker |
|---|---|---|---|---|---|
| E1 | Project Foundation & Auth | @meto-epic-E1 | complete | 5 | none |
| E2 | Venue Map & Discovery | @meto-epic-E2 | complete | 5 | none |
| E3 | Reviews & Ratings | @meto-epic-E3 | complete | 3 | none |
| E4 | Drink Tracker | @meto-epic-E4 | testing-ready | 3 | none |
| E5 | Betiv Profile & ANBR Card | @meto-epic-E5 | testing-ready | 4 | none |
| E6 | Romanian Producers Directory | @meto-epic-E6 | on-track | 0 | none |
| E7 | Admin & Content Seeding | @meto-epic-E7 | on-track | 0 | none |
| E8 | Production Deployment & Observability | @meto-epic-E8 | not-started | 0 | E7 |

Status values: `not-started` · `on-track` · `blocked` · `testing-ready` · `complete`

---

## [swarm:domains]

See full ownership rules in `ai/swarm/domain-map.md`.

| Epic ID | Owns |
|---|---|
| E1 | `src/app/(auth)/`, `src/lib/supabase/`, `src/middleware.ts`, `supabase/migrations/` |
| E2 | `src/app/(venues)/`, `src/components/map/`, `src/lib/venues/` |
| E3 | `src/app/(reviews)/`, `src/components/reviews/`, `src/lib/reviews/` |
| E4 | `src/app/(tracker)/`, `src/components/tracker/`, `src/lib/tracker/` |
| E5 | `src/app/(profile)/`, `src/components/profile/`, `src/components/anbr-card/`, `src/lib/badges/` |
| E6 | `src/app/(producers)/`, `src/components/producers/`, `src/lib/producers/` |
| E7 | `src/app/(admin)/`, `src/lib/admin/`, `scripts/seed/` |
| E8 | `vercel.json`, `.env.production`, `sentry.*.config.*`, monitoring config |

---

## [swarm:checkpoints]

Append only. Never delete entries. One line per checkpoint.

```
[ISO date] | [EPIC_ID] | done:[n] | status:[on-track/blocked/testing-ready] | cycles:[n] | blocker:[none or description]
```

2026-05-30T22:47:00Z | E1 | done:4 | status:on-track | cycles:0 | blocker:none
2026-05-30T23:00:00Z | E1 | done:5 | status:testing-ready | cycles:0 | blocker:none
2026-05-30T23:50:00Z | E1 | done:5 | status:complete | cycles:1 | blocker:none
2026-05-30T23:20:00Z | E2 | done:3 | status:on-track | cycles:0 | blocker:none
2026-05-30T23:30:00Z | E2 | done:5 | status:testing-ready | cycles:0 | blocker:none
2026-05-30T23:58:00Z | E2 | done:3 | status:on-track | cycles:1 | blocker:slice-007 slice-010 failed validation
2026-05-30T00:00:00Z | E2 | done:5 | status:testing-ready | cycles:1 | blocker:none
2026-05-30T00:05:00Z | E2 | done:5 | status:complete | cycles:2 | blocker:none
2026-05-30T23:55:00Z | E3 | done:3 | status:testing-ready | cycles:0 | blocker:none
2026-05-30T00:10:00Z | E3 | done:3 | status:complete | cycles:1 | blocker:none
2026-05-30T23:05:00Z | E4 | done:3 | status:testing-ready | cycles:0 | blocker:none
2026-05-30T22:47:54Z | E5 | done:4 | status:testing-ready | cycles:0 | blocker:none

---

## [swarm:conflicts]

```
[ISO date] | CONFLICT | file:[path] | agents:[e1] vs [e2] | resolution:[pending/resolved]
```

---

## [swarm:log]

Free text. Epic agents append observations, decisions, or notes here.

```
[ISO date] | [EPIC_ID] | [note]
```

2026-05-30T22:47:00Z | E1 | Completed slice-001 (Next.js scaffold), slice-002 (Supabase setup), slice-003 (auth pages), slice-004 (migrations). Slice-005 (middleware) in progress. Note: Migration files created but require manual application via Supabase dashboard — db password not available.
2026-05-30T23:00:00Z | E1 | All 5 slices complete. npm run build passes with zero errors. E1 is testing-ready. Note: Next.js 16 uses proxy.ts instead of middleware.ts — slice-005 uses src/proxy.ts with export function proxy(). Migration files in supabase/migrations/ require manual application via Supabase SQL editor.
2026-05-30T23:10:00Z | E2 | Session started. Adding leaflet + @types/leaflet to package.json for interactive map (E2 owns map feature; no other epic is active). Flagging per shared-file protocol.
2026-05-30T23:30:00Z | E2 | All 5 E2 slices complete. npm run build passes zero errors. Routes: /venues, /venues/[id], /venues/new, /harta. Using vanilla Leaflet (not react-leaflet — peer dep conflict with React 19). Maps load client-side via VenueMapLoader wrapper (ssr:false in Client Component).
2026-05-30T23:55:00Z | E3 | All 3 E3 slices complete. Slice-011 (reviews data layer), slice-012 (ReviewList component), slice-013 (ReviewForm + ReviewSection). Venue detail page now shows live reviews and submission form. Migration 20240003000000 adds unique(venue_id,user_id) constraint for upsert. Slice-013 (M size) in tasks-in-testing; slices 011 and 012 (S size) self-validated to done. NOTE: src/app/(venues)/venues/[id]/page.tsx (E2 domain) was minimally modified to integrate ReviewSection — the placeholder div was replaced with <ReviewSection venueId={id} /> and one import added. E2 agent should be aware of this integration change.
2026-05-30T22:48:00Z | E4 | Session started. No E4 tasks existed in backlog — sliced 4 tasks (slice-014 through slice-017). All 4 moved to tasks-in-progress. Implementing drink tracker: DB schema, data layer, log form, and dashboard.
2026-05-30T23:05:00Z | E4 | slice-014 (drink_logs schema + types), slice-015 (queries + actions), slice-016 (log form + /tracker/log page) DONE self-validated. slice-017 (dashboard) in tasks-in-testing. All files within E4 domain. npm run build passes zero errors.
2026-05-30T22:47:54Z | E5 | Session started. No E5 tasks in backlog — sliced 4 tasks (slice-018 through slice-021). Implemented all 4 slices in single session. npm run build passes zero errors. All S-size slices self-validated to done.
2026-05-30T22:50:00Z | E6 | Session started. No E6 tasks in backlog — slicing 4 tasks (slice-022 through slice-025). Implementing Romanian Producers Directory: DB schema, data layer, listing page, detail page.
2026-05-30T22:47:54Z | E7 | Session started. Slicing E7 — 5 tasks (slice-026 through slice-030). Implementing Admin role system, dashboard, venue seed, producer seed, seed runner.
