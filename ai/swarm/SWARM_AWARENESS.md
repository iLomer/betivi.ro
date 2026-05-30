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
| E1 | Project Foundation & Auth | @meto-epic-E1 | testing-ready | 5 | none |
| E2 | Venue Map & Discovery | @meto-epic-E2 | testing-ready | 5 | none |
| E3 | Reviews & Ratings | @meto-epic-E3 | not-started | 0 | E1 |
| E4 | Drink Tracker | @meto-epic-E4 | not-started | 0 | E1 |
| E5 | Betiv Profile & ANBR Card | @meto-epic-E5 | not-started | 0 | E1, E4 |
| E6 | Romanian Producers Directory | @meto-epic-E6 | not-started | 0 | E1 |
| E7 | Admin & Content Seeding | @meto-epic-E7 | not-started | 0 | E2, E3 |
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
2026-05-30T23:20:00Z | E2 | done:3 | status:on-track | cycles:0 | blocker:none
2026-05-30T23:30:00Z | E2 | done:5 | status:testing-ready | cycles:0 | blocker:none

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
