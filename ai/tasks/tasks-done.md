# Tasks Done

## [slice-031] -- Vercel Config
**Epic:** E8 | **Size:** S | **Depends on:** none
Started: 2026-05-30 | Agent: meto-epic-E8
Completed: 2026-05-30 | Files changed: vercel.json
Self-validated: PASS

---

## [slice-032] -- Health Check Endpoint
**Epic:** E8 | **Size:** S | **Depends on:** none
Started: 2026-05-30 | Agent: meto-epic-E8
Completed: 2026-05-30 | Files changed: src/app/api/health/route.ts
Self-validated: PASS

---

## [slice-033] -- Environment Variable Documentation
**Epic:** E8 | **Size:** S | **Depends on:** none
Started: 2026-05-30 | Agent: meto-epic-E8
Completed: 2026-05-30 | Files changed: .env.production.example
Self-validated: PASS

---

## [slice-034] -- Error Boundary & 404 Page
**Epic:** E8 | **Size:** S | **Depends on:** none
Started: 2026-05-30 | Agent: meto-epic-E8
Completed: 2026-05-30 | Files changed: src/app/error.tsx, src/app/not-found.tsx
Self-validated: PASS

---

## [slice-026] -- Admin Role System
**Epic:** E7 | **Size:** S | **Depends on:** slice-004
Started: 2026-05-30 | Agent: lead
Completed: 2026-05-30 | Files changed: supabase/migrations/20240007000000_add_admin_role.sql, src/lib/admin/auth.ts
Self-validated: PASS

---

## [slice-027] -- Admin Dashboard
**Epic:** E7 | **Size:** S | **Depends on:** slice-026
Started: 2026-05-30 | Agent: lead
Completed: 2026-05-30 | Files changed: src/app/(admin)/admin/page.tsx, src/lib/admin/queries.ts
Self-validated: PASS

---

## [slice-028] -- Venue Seed Script
**Epic:** E7 | **Size:** S | **Depends on:** slice-004
Started: 2026-05-30 | Agent: lead
Completed: 2026-05-30 | Files changed: scripts/seed/venues.ts
Self-validated: PASS

---

## [slice-029] -- Producer Seed Script
**Epic:** E7 | **Size:** S | **Depends on:** slice-022
Started: 2026-05-30 | Agent: lead
Completed: 2026-05-30 | Files changed: scripts/seed/producers.ts
Self-validated: PASS

---

## [slice-030] -- Seed Runner
**Epic:** E7 | **Size:** S | **Depends on:** slice-028, slice-029
Started: 2026-05-30 | Agent: lead
Completed: 2026-05-30 | Files changed: scripts/seed/run.ts, package.json
Self-validated: PASS

---

## [slice-022] -- Producers DB Schema
**Epic:** E6 | **Size:** S | **Depends on:** slice-004
Started: 2026-05-30 | Agent: meto-epic-E6
Completed: 2026-05-30 | Files changed: supabase/migrations/20240006000000_create_producers.sql, src/types/database.ts
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 10/10

**User Story**
As a developer, I want a `producers` table with RLS policies so that producers can be stored and read publicly.

**Acceptance Criteria**
- [x] Migration creates `producers` table: id (uuid pk default gen_random_uuid()), name (text not null), category (text: brewery/winery/distillery), region (text not null), description (text nullable), website (text nullable), created_at (timestamptz default now())
- [x] RLS: public read enabled, authenticated insert enabled
- [x] `Producer` TypeScript type added to `src/types/database.ts`
- [x] `ProducerCategory` type exported from `src/types/database.ts`
- [x] Migration file committed to `supabase/migrations/` following E1 naming convention
- [x] `npm run build` passes with zero errors

**Out of Scope**
UI components, data fetching, producer images.

---

## [slice-025] -- Producer Detail Page
**Epic:** E6 | **Size:** S | **Depends on:** slice-023
Started: 2026-05-30 | Agent: meto-epic-E6
Completed: 2026-05-30 | Files changed: src/app/(producers)/producatori/[id]/page.tsx
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 10/10

**User Story**
As a visitor, I want to view a producer's full details so that I can learn about them and visit their website.

**Acceptance Criteria**
- [x] `/producatori/[id]` page shows producer name, category badge, region badge, full description, and link to website (if set)
- [x] 404 returned if producer id does not exist (`notFound()`)
- [x] Page metadata (title, description) set from producer data
- [x] Back link to `/producatori` list
- [x] `npm run build` passes with zero errors

**Out of Scope**
Producer reviews, venue associations, producer editing.

---

## [slice-024] -- Producers Listing Page
**Epic:** E6 | **Size:** S | **Depends on:** slice-023
Started: 2026-05-30 | Agent: meto-epic-E6
Completed: 2026-05-30 | Files changed: src/app/(producers)/producatori/page.tsx, src/components/producers/ProducerCard.tsx, src/components/producers/ProducerFiltersBar.tsx
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 10/10

**User Story**
As a visitor, I want to browse all Romanian producers and filter by category and region so that I can discover craft breweries, wineries, and distilleries.

**Acceptance Criteria**
- [x] `/producatori` page lists all producers from Supabase ordered by name
- [x] Filter by category (berarie artizanală, cramă, distilerie)
- [x] Filter by region (dropdown of distinct regions from DB)
- [x] Each producer shows: name, category badge, region, description excerpt (max 120 chars)
- [x] Link to producer detail page from each card
- [x] Empty state shown when no producers match filters
- [x] `ProducerCard` component at `src/components/producers/ProducerCard.tsx`
- [x] `ProducerFiltersBar` component at `src/components/producers/ProducerFiltersBar.tsx`
- [x] `npm run build` passes with zero errors

**Out of Scope**
Pagination, producer images, add producer form on this page.

---

## [slice-023] -- Producers Data Layer
**Epic:** E6 | **Size:** S | **Depends on:** slice-022
Started: 2026-05-30 | Agent: meto-epic-E6
Completed: 2026-05-30 | Files changed: src/lib/producers/queries.ts, src/lib/producers/actions.ts
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 10/10

**User Story**
As a developer, I want typed query and action functions for the producers directory so that the UI can read and write producers consistently.

**Acceptance Criteria**
- [x] `src/lib/producers/queries.ts` exports `getProducers(filters)` returning `Producer[]` ordered by name asc
- [x] Filters support: category (brewery/winery/distillery), region (string ilike), search (name ilike)
- [x] `src/lib/producers/queries.ts` exports `getProducerById(id)` returning `Producer | null`
- [x] `src/lib/producers/queries.ts` exports `getDistinctRegions()` returning `string[]`
- [x] `src/lib/producers/actions.ts` exports `createProducerAction(formData)` server action that inserts a producer and redirects unauthenticated users to `/auth/login`
- [x] `createProducerAction` validates: name required, category required and one of brewery/winery/distillery, region required
- [x] Error messages are in Romanian
- [x] `npm run build` passes with zero errors

**Out of Scope**
UI components and page routing.

---

## [slice-014] -- Drink Tracker DB Schema

**Epic:** E4 | **Size:** S | **Depends on:** slice-004
Started: 2026-05-30 | Agent: meto-epic-E4
Completed: 2026-05-30 | Files changed: supabase/migrations/20240004000000_create_drink_logs.sql, src/types/database.ts
Self-validated: PASS

**User Story**
As a developer, I want a `drink_logs` table with RLS policies so that authenticated users can record personal drink entries.

**Acceptance Criteria**

- [x] Migration creates `drink_logs` table: id (uuid pk), user_id (uuid fk auth.users), name (text not null), category (enum: beer/wine/spirit), producer (text nullable), venue_id (uuid nullable fk venues), rating (int 1-5 nullable), notes (text nullable), logged_at (timestamptz default now()), created_at (timestamptz default now())
- [x] RLS: authenticated users can insert/select/update/delete their own rows only (user_id = auth.uid())
- [x] `DrinkLog` TypeScript type added to `src/types/database.ts`
- [x] `DrinkCategory` type exported from `src/types/database.ts`
- [x] Migration file committed to `supabase/migrations/` following E1 naming convention
- [x] `npm run build` passes with zero errors

**Out of Scope**
UI components, data fetching, and category-level statistics.

---

## [slice-015] -- Drink Tracker Data Layer

**Epic:** E4 | **Size:** S | **Depends on:** slice-014
Started: 2026-05-30 | Agent: meto-epic-E4
Completed: 2026-05-30 | Files changed: src/lib/tracker/queries.ts, src/lib/tracker/actions.ts
Self-validated: PASS

**User Story**
As a developer, I want typed query and action functions for the drink tracker so that the UI can read and write drink logs consistently.

**Acceptance Criteria**

- [x] `src/lib/tracker/queries.ts` exports `getDrinkLogsByUserId(userId)` returning `DrinkLog[]` ordered by logged_at desc
- [x] `src/lib/tracker/queries.ts` exports `getDrinkStats(userId)` returning `{ total: number; beer: number; wine: number; spirit: number }`
- [x] `src/lib/tracker/actions.ts` exports `logDrinkAction(formData)` server action that inserts a drink log and redirects unauthenticated users to `/auth/login`
- [x] `src/lib/tracker/actions.ts` exports `deleteDrinkLogAction(id)` server action that deletes only the calling user's own log entry
- [x] `logDrinkAction` validates: name required, category required and one of beer/wine/spirit, rating 1-5 if provided
- [x] Error messages are in Romanian
- [x] `npm run build` passes with zero errors

**Out of Scope**
UI components and page routing.

---

## [slice-016] -- Log a Drink Page & Form

**Epic:** E4 | **Size:** S | **Depends on:** slice-015
Started: 2026-05-30 | Agent: meto-epic-E4
Completed: 2026-05-30 | Files changed: src/app/(tracker)/tracker/log/page.tsx, src/components/tracker/LogDrinkForm.tsx
Self-validated: PASS

**User Story**
As an authenticated user, I want to log a drink with its name, category, optional producer, rating, and notes so that I can track what I've consumed.

**Acceptance Criteria**

- [x] `/tracker/log` page requires authentication — redirects to `/auth/login` if not logged in
- [x] `src/components/tracker/LogDrinkForm.tsx` renders fields: drink name (required), category select (Beer/Vin/Spirit), producer (optional), rating star picker 1-5 (optional), notes textarea (optional)
- [x] Form submits via `logDrinkAction` server action
- [x] On success, redirects to `/tracker`
- [x] Validation errors shown in Romanian below each field
- [x] Submit button shows pending state
- [x] `npm run build` passes with zero errors

**Out of Scope**
Venue linking, photo upload, and editing existing entries.

---

## [slice-001] -- Initialize Next.js Project with TypeScript and Tailwind

**Epic:** E1 | **Size:** S | **Depends on:** none
Started: 2026-05-30 | Agent: meto-epic-E1
Completed: 2026-05-30 | Files changed: package.json, tsconfig.json, tailwind.config.ts, eslint.config.mjs, src/app/globals.css, next.config.ts, postcss.config.mjs, src/app/layout.tsx, src/app/page.tsx
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 13/13

**User Story**
As a developer, I want a properly configured Next.js 14 project with TypeScript strict mode and Tailwind CSS so that all future development starts from a consistent, typed foundation.

**Acceptance Criteria**

- [x] `npx create-next-app` scaffolded with TypeScript, Tailwind CSS, ESLint, and App Router enabled
- [x] `tsconfig.json` has `"strict": true` and path aliases configured (`@/` pointing to `src/`)
- [x] `tailwind.config.ts` includes a custom color palette with at least a primary brand color for Betivi
- [x] `npm run build` completes with zero errors and zero TypeScript errors
- [x] `.eslintrc` enforces no-unused-vars and no-explicit-any rules

**Out of Scope**
Database connection, authentication, deployment configuration, and any UI components beyond the default layout.

---

## [slice-002] -- Connect Supabase and Configure Environment

**Epic:** E1 | **Size:** S | **Depends on:** slice-001
Started: 2026-05-30 | Agent: meto-epic-E1
Completed: 2026-05-30 | Files changed: src/lib/supabase/client.ts, src/lib/supabase/server.ts, .env.local, .env.example, src/app/page.tsx
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 13/13

**User Story**
As a developer, I want Supabase connected to the Next.js app with environment variables and a typed client so that all database and auth operations are available from day one.

**Acceptance Criteria**

- [x] Supabase project created and `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` added to `.env.local`
- [x] `@supabase/supabase-js` and `@supabase/ssr` installed and a typed client helper created at `src/lib/supabase/client.ts`
- [x] Server-side Supabase client created at `src/lib/supabase/server.ts` using cookies for SSR compatibility
- [x] `.env.example` file committed with placeholder values and no real secrets
- [x] A smoke-test page or route confirms the Supabase connection returns a non-error response

**Out of Scope**
Database schema creation, RLS policies, and any auth UI.

---

## [slice-003] -- Implement Email/Password Authentication

**Epic:** E1 | **Size:** S | **Depends on:** slice-002
Started: 2026-05-30 | Agent: meto-epic-E1
Completed: 2026-05-30 | Files changed: src/app/auth/signup/page.tsx, src/app/auth/login/page.tsx, src/app/auth/logout/route.ts, src/app/auth/callback/route.ts, src/app/layout.tsx
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 13/13

**User Story**
As a visitor, I want to register with my email and password and log in so that I can participate in the Betivi community.

**Acceptance Criteria**

- [x] `/auth/signup` page with email, password, and confirm-password fields that calls Supabase Auth `signUp`
- [x] `/auth/login` page with email and password fields that calls Supabase Auth `signInWithPassword`
- [x] Successful signup triggers a Supabase confirmation email and shows a "check your email" message
- [x] Successful login redirects user to `/` and displays their email in the navbar
- [x] Invalid credentials on login display a visible, user-friendly error message in Romanian
- [x] `/auth/logout` route clears the session and redirects to `/`

**Out of Scope**
OAuth (Google/Facebook) login, password reset flow, and user profile creation beyond the auth record.

---

## [slice-004] -- Define Database Schema and RLS Policies

**Epic:** E1 | **Size:** S | **Depends on:** slice-002
Started: 2026-05-30 | Agent: meto-epic-E1
Completed: 2026-05-30 | Files changed: supabase/migrations/20240001000000_create_profiles.sql, supabase/migrations/20240001000001_create_venues.sql, supabase/migrations/20240001000002_create_reviews.sql, src/types/database.ts
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 12/13 (manual RLS verification deferred — requires DB password)
NOTE: Migration files are created. Apply via Supabase dashboard SQL editor (Project > SQL Editor) — run each .sql file in order. The `db push` command requires the database password which was not provided.

**User Story**
As a developer, I want the core database tables and row-level security policies in place so that the app's data model is secure and ready for feature development.

**Acceptance Criteria**

- [x] `profiles` table created (id references auth.users, username, avatar_url, created_at) with RLS: users can read all profiles, update only their own
- [x] `venues` table created (id, name, city, address, description, category, created_at) with RLS: public read, insert restricted to authenticated users
- [x] `reviews` table created (id, venue_id, user_id, rating int 1-5, body text, created_at) with RLS: public read, insert/update/delete restricted to the owning user
- [x] All migrations committed as `.sql` files in `supabase/migrations/`
- [ ] RLS policies verified manually in the Supabase dashboard with both authenticated and anonymous roles — requires user to apply migrations manually

**Out of Scope**
Seed data, admin roles, venue images, and any application-layer code that reads from these tables.

---

## [slice-005] -- Protected Routes and Auth Middleware

**Epic:** E1 | **Size:** S | **Depends on:** slice-003, slice-004
Started: 2026-05-30 | Agent: meto-epic-E1
Completed: 2026-05-30 | Files changed: src/proxy.ts
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 13/13

**User Story**
As a developer, I want middleware that protects authenticated-only routes so that unauthenticated users are redirected to login before accessing protected pages.

**Acceptance Criteria**

- [x] Next.js proxy file created at `src/proxy.ts` using Supabase SSR session validation (Next.js 16 uses proxy.ts instead of middleware.ts)
- [x] Routes under `/profile` and `/review/new` redirect unauthenticated users to `/auth/login` with a `redirectTo` query param
- [x] After login, users are redirected back to the originally requested URL via the `redirectTo` param
- [x] Public routes (`/`, `/venues`, `/auth/*`) are accessible without authentication
- [x] Middleware does not break static asset serving (`/_next/`, `/favicon.ico`)

**Out of Scope**
Role-based access control, admin-only routes, and rate limiting.

---

## [slice-006] -- Venue Schema Extension (lat/lng for map)

**Epic:** E2 | **Size:** S | **Depends on:** slice-004
Started: 2026-05-30 | Agent: meto-epic-E2
Completed: 2026-05-30 | Files changed: supabase/migrations/20240002000000_extend_venues_map.sql, src/types/database.ts
Self-validated: PASS

**User Story**
As a developer, I want venues to have latitude and longitude columns so that venue locations can be displayed on an interactive map.

**Acceptance Criteria**

- [x] Migration adds `lat` (float8) and `lng` (float8) nullable columns to the `venues` table
- [x] Migration adds `rating_avg` (float4, default 0) and `review_count` (int4, default 0) columns to `venues`
- [x] TypeScript `Venue` type in `src/types/database.ts` updated to include lat, lng, rating_avg, review_count
- [x] Migration file committed to `supabase/migrations/` following E1's naming convention
- [x] `npm run build` passes with zero errors

**Out of Scope**
Actual map rendering, venue CRUD UI, and seeding data.

---

## [slice-008] -- Venue Detail Page

**Epic:** E2 | **Size:** S | **Depends on:** slice-006
Started: 2026-05-30 | Agent: meto-epic-E2
Completed: 2026-05-30 | Files changed: src/app/(venues)/venues/[id]/page.tsx, src/lib/venues/queries.ts
Self-validated: PASS

**User Story**
As a visitor, I want to view a venue's full details so that I can decide whether to visit it.

**Acceptance Criteria**

- [x] `/venues/[id]` page shows venue name, category badge, city, address, description
- [x] Star rating and review count displayed
- [x] Reviews placeholder section shown (reviews coming in E3)
- [x] 404 returned if venue id does not exist (`notFound()`)
- [x] Page metadata (title, description) set from venue data
- [x] Back link to `/venues` list
- [x] `npm run build` passes with zero errors

**Out of Scope**
Review submission (E3), venue editing, venue images.

---

## [slice-009] -- Add Venue Form & Server Action

**Epic:** E2 | **Size:** S | **Depends on:** slice-006
Started: 2026-05-30 | Agent: meto-epic-E2
Completed: 2026-05-30 | Files changed: src/app/(venues)/venues/new/page.tsx, src/lib/venues/actions.ts, src/components/map/AddVenueForm.tsx
Self-validated: PASS

**User Story**
As an authenticated user, I want to add a new venue so that I can share a drinking spot with the community.

**Acceptance Criteria**

- [x] `/venues/new` page requires authentication — redirects to `/auth/login` if not logged in
- [x] Form fields: name (required), city (required), category, address, description, lat/lng (optional)
- [x] Server action validates required fields and inserts into Supabase
- [x] After successful submission, redirects to the new venue's detail page
- [x] Form shows error message in Romanian on failure
- [x] Loading/pending state shown on submit button
- [x] `npm run build` passes with zero errors

**Out of Scope**
Image upload, venue editing, admin approval workflow.

---

**Out of Scope**
Geolocation (user's current position), clustering of markers, and map-based radius search.

---

## [slice-007] -- Venue Listing Page with Filter & Search

**Epic:** E2 | **Size:** M | **Depends on:** slice-006
Started: 2026-05-30 | Agent: meto-epic-E2
Completed: 2026-05-30 | Files changed: src/components/map/VenueFiltersBar.tsx
Tester-validated: 2026-05-30 | Result: PASS | Checks: 9/9

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
Tester-validated: 2026-05-30 | Result: PASS | Checks: 10/10

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

## [slice-011] — Reviews Data Layer

**Epic:** E3 | **Size:** S | **Depends on:** slice-004
Started: 2026-05-30 | Agent: meto-epic-E3
Completed: 2026-05-30 | Files changed: src/lib/reviews/queries.ts, src/lib/reviews/actions.ts, supabase/migrations/20240003000000_reviews_unique_constraint.sql
Self-validated: PASS

**User Story**
As a developer, I want a typed data layer for reviews so that review data can be fetched and mutated consistently across the application.

**Acceptance Criteria**

- [x] `src/lib/reviews/queries.ts` exports `getReviewsByVenueId(venueId)` returning `ReviewWithProfile[]`
- [x] `ReviewWithProfile` type includes review fields plus `profiles.username`
- [x] `src/lib/reviews/actions.ts` exports `submitReviewAction(formData)` server action that inserts or upserts a review and updates `venues.rating_avg` and `venues.review_count` via manual recalculation
- [x] `submitReviewAction` redirects unauthenticated users to `/auth/login`
- [x] `submitReviewAction` enforces one review per user per venue (upsert on conflict `venue_id,user_id`)
- [x] `src/lib/reviews/actions.ts` exports `deleteReviewAction(reviewId, venueId)` that deletes the review and updates venue aggregates
- [x] `npm run build` passes with zero errors

**Out of Scope**
UI components, routing, and image upload.

---

## [slice-012] — ReviewList Component

**Epic:** E3 | **Size:** S | **Depends on:** slice-011
Started: 2026-05-30 | Agent: meto-epic-E3
Completed: 2026-05-30 | Files changed: src/components/reviews/ReviewList.tsx
Self-validated: PASS

**User Story**
As a visitor, I want to see all reviews for a venue on its detail page so that I can read community opinions before visiting.

**Acceptance Criteria**

- [x] `src/components/reviews/ReviewList.tsx` renders a list of reviews for a venue
- [x] Each review shows: star rating (1–5), review body text, username, and formatted date
- [x] Empty state shown when venue has no reviews yet
- [x] `src/app/(venues)/venues/[id]/page.tsx` imports and renders `<ReviewSection venueId={id} />` (which includes ReviewList, replacing the placeholder text)
- [x] Component handles empty state gracefully with appropriate message
- [x] `npm run build` passes with zero errors

**Out of Scope**
Review submission form (slice-013), review editing, and pagination.

---

## [slice-018] — Profile Page

**Epic:** E5 | **Size:** S | **Depends on:** none
Started: 2026-05-30 | Agent: meto-epic-E5
Completed: 2026-05-30 | Files changed: src/app/(profile)/layout.tsx, src/app/(profile)/profile/page.tsx, src/lib/profile/queries.ts, src/components/profile/ProfileStats.tsx, src/components/profile/RecentLogs.tsx
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 7/7

**User Story**
As a logged-in user, I want to view my profile page at /profile, so that I can see my username, drink stats, recent logs, and earned badges.

**Acceptance Criteria**

- [x] Route /profile exists under src/app/(profile)/profile/page.tsx
- [x] Page redirects to /auth/login if not authenticated
- [x] Displays username (or email fallback), drink stats (total/beer/wine/spirit), last 5 drink logs, and badge list
- [x] Uses getDrinkStats and getDrinkLogsByUserId from E4 queries
- [x] Reads profile from Supabase profiles table
- [x] Romanian UI labels
- [x] No any types, no console.log

**Out of Scope**
Avatar upload, follow/followers, edit form (slice-019)

---

## [slice-020] — Badge System

**Epic:** E5 | **Size:** S | **Depends on:** none
Started: 2026-05-30 | Agent: meto-epic-E5
Completed: 2026-05-30 | Files changed: src/lib/badges/index.ts, src/components/profile/BadgeList.tsx
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 6/6

**User Story**
As a user, I want to earn badges based on how many drinks I have logged, so that I feel rewarded for contributing to the platform.

**Acceptance Criteria**

- [x] Badge logic lives in src/lib/badges/index.ts
- [x] Badges defined: Primul Pahar (1 drink), Incepator (10), Experimentat (25), Veteran (50), Academician (100)
- [x] Function getEarnedBadges(stats: DrinkStats): Badge[] returns all earned badges
- [x] Badge type exported: { id, name, description, icon, threshold }
- [x] Badge display component at src/components/profile/BadgeList.tsx
- [x] No any types, no console.log

**Out of Scope**
Persisting badges to DB, notifications

---

## [slice-019] — Edit Profile Form

**Epic:** E5 | **Size:** S | **Depends on:** slice-018
Started: 2026-05-30 | Agent: meto-epic-E5
Completed: 2026-05-30 | Files changed: src/lib/profile/actions.ts, src/components/profile/EditProfileForm.tsx, src/app/(profile)/profile/edit/page.tsx
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 7/7

**User Story**
As a logged-in user, I want to update my username on the /profile/edit page, so that I can personalize my identity on the platform.

**Acceptance Criteria**

- [x] Route /profile/edit exists under src/app/(profile)/profile/edit/page.tsx
- [x] Form shows current username prefilled
- [x] Submits via server action in src/lib/profile/actions.ts
- [x] Validates: username 3-30 chars, alphanumeric + underscores only
- [x] Romanian error messages on validation failure
- [x] On success redirects to /profile
- [x] No any types, no console.log

**Out of Scope**
Avatar upload, email change

---

## [slice-021] — ANBR Card Component

**Epic:** E5 | **Size:** S | **Depends on:** slice-018, slice-020
Started: 2026-05-30 | Agent: meto-epic-E5
Completed: 2026-05-30 | Files changed: src/components/anbr-card/ANBRCard.tsx
Self-validated: PASS
Tester-validated: 2026-05-30 | Result: PASS | Checks: 7/7

**User Story**
As a user, I want to see and share my ANBR membership card showing my membership number, grade, stats, and top badge, so that I can spread the word about the platform.

**Acceptance Criteria**

- [x] Component at src/components/anbr-card/ANBRCard.tsx
- [x] Membership number derived deterministically from user UUID (last 8 hex chars as decimal)
- [x] Grade computed from total drinks: Stagiar (0-9), Autorizat (10-24), Emerit (25-49), Academician (50+)
- [x] Displays: ANBR logo text, membership number, username, grade, total/beer/wine/spirit stats, top badge
- [x] Card visible on /profile page below stats section
- [x] Responsive, styled with Tailwind (amber/gold color scheme to feel like a membership card)
- [x] No any types, no console.log

**Out of Scope**
PNG download, QR code, animated sharing
---

## [slice-013] — Review Submission Form
**Epic:** E3 | **Size:** M | **Depends on:** slice-011, slice-012
Started: 2026-05-30 | Agent: meto-epic-E3
Completed: 2026-05-30 | Files changed: src/components/reviews/ReviewForm.tsx, src/components/reviews/ReviewSection.tsx, src/app/(venues)/venues/[id]/page.tsx
Tester-validated: 2026-05-30 | Result: PASS | Checks: 8/8

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

## [slice-017] -- Drink Tracker Dashboard
**Epic:** E4 | **Size:** M | **Depends on:** slice-015, slice-016
Started: 2026-05-30 | Agent: meto-epic-E4
Completed: 2026-05-30 | Files changed: src/app/(tracker)/tracker/page.tsx, src/components/tracker/DrinkStats.tsx, src/components/tracker/FillingGlass.tsx, src/components/tracker/DrinkList.tsx
Tester-validated: 2026-05-30 | Result: PASS | Checks: 8/8

**Acceptance Criteria**
- [x] /tracker requires auth, redirects to /auth/login if not logged in
- [x] DrinkStats shows total, beer, wine, spirit counts
- [x] FillingGlass SVG fills at milestones 10/25/50/100 drinks
- [x] DrinkList renders name, category badge, producer, rating, date, delete button
- [x] Delete calls deleteDrinkLogAction and revalidates /tracker
- [x] Link to /tracker/log shown prominently
- [x] Empty state shown when no drinks logged
- [x] npm run build passes with zero errors

---
