# Epic Agent Memory -- Venue Listings & Discovery (E2)

*Read at session start. Update at session end. Keep it concise.*

---

## Current State
- **Status:** testing-ready
- **Tasks completed:** 5
- **Checkpoint count:** 3 (at 3 done, at 5 done, at 5 done after fix cycle)
- **Validation cycles:** 1 (slice-007 and slice-010 failed first validation and were re-fixed)

## Session Log

### Session 1 — 2026-05-30
Implemented all 5 E2 slices in one session. Build passes with zero errors.

**Slices completed:**
- slice-006: Venue schema extension (supabase/migrations/20240002000000_extend_venues_map.sql, src/types/database.ts)
- slice-007: Venue listing page (/venues) with filter/search
- slice-008: Venue detail page (/venues/[id])
- slice-009: Add venue form (/venues/new) with server action
- slice-010: Interactive map (/harta) using vanilla Leaflet

### Session 2 — 2026-05-30 (fix cycle)
slice-007 and slice-010 returned from tester with failures. Fixed both.

**Fixes applied:**

**VenueFiltersBar.tsx (slice-007 + slice-010):**
- Extracted SearchInput, CitySelect, CategorySelect as standalone React components outside VenueFiltersBar
- VenueFiltersBar function body reduced from 65 to 26 lines
- Added `basePath` prop (default "/venues") — navigation URL uses basePath instead of hardcoded "/venues"
- All handler logic extracted to named useCallback hooks (onSearch, onCity, onCategory)

**VenueMap.tsx (slice-010):**
- Extracted `initMap` to a standalone async function defined outside VenueMap component
- VenueMap function body reduced from 72 to 43 lines
- initMap standalone function body: 36 lines
- Replaced `initMap().catch(() => {})` with `.catch(() => setMapError(...))` — user sees Romanian error message

**harta/page.tsx (slice-010):**
- Added `basePath="/harta"` prop to VenueFiltersBar — filters on /harta now navigate within /harta

**Key decisions / gotchas:**
- react-leaflet v4 has a peer dep conflict with React 19 — use vanilla Leaflet with dynamic import in a "use client" wrapper (VenueMapLoader)
- Next.js 16 Turbopack: `dynamic()` with `ssr: false` cannot be used in Server Components — must wrap in a Client Component (VenueMapLoader.tsx)
- `searchParams` in Next.js 16 app router is a Promise — must await it
- Function line count rule counts lines from `{` after signature to closing `}` inclusive — be precise when extracting
- basePath approach is more testable than usePathname() for filter navigation

**Domain files modified in fix cycle:**
- src/components/map/VenueFiltersBar.tsx
- src/components/map/VenueMap.tsx
- src/app/(venues)/harta/page.tsx

**All domain files:**
- src/app/(venues)/venues/page.tsx
- src/app/(venues)/venues/[id]/page.tsx
- src/app/(venues)/venues/new/page.tsx
- src/app/(venues)/harta/page.tsx
- src/components/map/VenueCard.tsx
- src/components/map/VenueCategoryBadge.tsx
- src/components/map/StarRating.tsx
- src/components/map/VenueFiltersBar.tsx
- src/components/map/AddVenueForm.tsx
- src/components/map/VenueMap.tsx
- src/components/map/VenueMapLoader.tsx
- src/lib/venues/queries.ts
- src/lib/venues/actions.ts
- supabase/migrations/20240002000000_extend_venues_map.sql

**Shared files touched (flagged in SWARM_AWARENESS):**
- package.json: added leaflet + @types/leaflet
- src/types/database.ts: added lat, lng, rating_avg, review_count to Venue interface

## Next Session
- E2 is testing-ready (cycles: 1). Wait for @meto-tester to validate slice-007 and slice-010.
- If failed tasks return again, cycles will increment to 2 — flag as potential structural issue.
