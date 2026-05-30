# Tasks In Testing

---

## [slice-013] — Review Submission Form
**Epic:** E3 | **Size:** M | **Depends on:** slice-011, slice-012
Started: 2026-05-30 | Agent: meto-epic-E3
Completed: 2026-05-30 | Files changed: src/components/reviews/ReviewForm.tsx, src/components/reviews/ReviewSection.tsx, src/app/(venues)/venues/[id]/page.tsx

**User Story**
As an authenticated user, I want to submit, update, or delete my review for a venue so that I can share my opinion with the community.

**Acceptance Criteria**
- [x] `src/components/reviews/ReviewForm.tsx` renders an interactive star picker (1–5) and optional text area
- [x] Form is shown on the venue detail page below the review list, only for authenticated users
- [x] If the user already has a review, the form pre-fills with their existing rating and body
- [x] On submit, calls `submitReviewAction` — shows success feedback and revalidates the venue page
- [x] Delete button shown when user has an existing review — calls `deleteReviewAction`
- [x] Error messages shown in Romanian
- [x] Unauthenticated users see a "Conectează-te pentru a scrie o recenzie" prompt linking to `/auth/login`
- [x] `npm run build` passes with zero errors

**Out of Scope**
Image upload, review moderation, and review pagination.

---

## [slice-007] -- Venue Listing Page with Filter & Search
**Epic:** E2 | **Size:** M | **Depends on:** slice-006
Started: 2026-05-30 | Agent: meto-epic-E2
Completed: 2026-05-30 | Files changed: src/components/map/VenueFiltersBar.tsx
FIXED — Re-submitted after tester validation failure 2026-05-30

**Required fixes applied:**
1. Extracted SearchInput, CitySelect, CategorySelect as standalone components outside VenueFiltersBar — function body now 26 lines (was 65)
2. Added basePath prop (default "/venues") — navigation URL uses basePath instead of hardcoded "/venues"

**User Story**
As a visitor, I want to browse all venues and filter by city and category so that I can discover drinking spots relevant to me.

**Acceptance Criteria**
- [x] `/venues` page lists all venues from Supabase ordered by rating
- [x] Filter by city (dropdown of distinct cities from DB)
- [x] Filter by category (bar, berarie, cramă, terasă, club, restaurant)
- [x] Search by name/address (free text)
- [x] Each venue shows: name, city, address, category badge, star rating, review count
- [x] Link to add new venue visible on the page
- [x] Empty state shown when no venues match filters
- [x] `npm run build` passes with zero errors
- [x] `VenueFiltersBar` function body under 50 lines

**Out of Scope**
Pagination, venue images, and map view on this page.

---

## [slice-010] -- Interactive Map (Harta birturilor)
**Epic:** E2 | **Size:** M | **Depends on:** slice-006
Started: 2026-05-30 | Agent: meto-epic-E2
Completed: 2026-05-30 | Files changed: src/components/map/VenueFiltersBar.tsx, src/components/map/VenueMap.tsx, src/app/(venues)/harta/page.tsx
FIXED — Re-submitted after tester validation failure 2026-05-30

**Required fixes applied:**
1. VenueFiltersBar now uses basePath prop — /harta/page.tsx passes basePath="/harta" so filters stay on /harta
2. initMap extracted to standalone async function outside VenueMap component — VenueMap function body now 43 lines (was 72)
3. initMap().catch now sets mapError state — user sees "Harta nu a putut fi încărcată. Reîncarcă pagina." error message in Romanian

**User Story**
As a visitor, I want to see all venues on an interactive map so that I can discover nearby drinking spots visually.

**Acceptance Criteria**
- [x] `/harta` page renders an interactive Leaflet map centered on Romania
- [x] Venues with lat/lng coordinates appear as emoji markers on the map
- [x] Clicking a marker shows a popup with venue name, city, address, and link to detail page
- [x] Filter bar (city, category, search) navigates within `/harta` — does NOT redirect to `/venues`
- [x] Map loads client-side only (ssr: false) via Client Component wrapper to avoid SSR errors
- [x] Loading skeleton shown while map initialises
- [x] Count of mappable vs total venues shown below the map
- [x] Map init errors show a user-visible error message instead of silently failing
- [x] `npm run build` passes with zero errors
- [x] `VenueMap` function body under 50 lines

**Out of Scope**
Geolocation, marker clustering, and map-based radius search.

---
