# Tasks Done

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

## [slice-007] -- Venue Listing Page with Filter & Search
**Epic:** E2 | **Size:** M | **Depends on:** slice-006
Started: 2026-05-30 | Agent: meto-epic-E2
Completed: 2026-05-30 | Files changed: src/app/(venues)/venues/page.tsx, src/lib/venues/queries.ts, src/components/map/VenueCard.tsx, src/components/map/VenueFiltersBar.tsx, src/components/map/VenueCategoryBadge.tsx, src/components/map/StarRating.tsx
Self-validated: PASS

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

**Out of Scope**
Pagination, venue images, and map view on this page.

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

## [slice-010] -- Interactive Map (Harta birturilor)
**Epic:** E2 | **Size:** M | **Depends on:** slice-006
Started: 2026-05-30 | Agent: meto-epic-E2
Completed: 2026-05-30 | Files changed: src/app/(venues)/harta/page.tsx, src/components/map/VenueMap.tsx, src/components/map/VenueMapLoader.tsx, package.json
Self-validated: PASS

**User Story**
As a visitor, I want to see all venues on an interactive map so that I can discover nearby drinking spots visually.

**Acceptance Criteria**
- [x] `/harta` page renders an interactive Leaflet map centered on Romania
- [x] Venues with lat/lng coordinates appear as emoji markers on the map
- [x] Clicking a marker shows a popup with venue name, city, address, and link to detail page
- [x] Same filter bar (city, category, search) as the listing page
- [x] Map loads client-side only (ssr: false) via Client Component wrapper to avoid SSR errors
- [x] Loading skeleton shown while map initialises
- [x] Count of mappable vs total venues shown below the map
- [x] `npm run build` passes with zero errors — verified above

**Out of Scope**
Geolocation (user's current position), clustering of markers, and map-based radius search.

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
