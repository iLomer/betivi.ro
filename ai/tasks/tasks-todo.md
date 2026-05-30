# Tasks Todo

---

## [slice-026] -- Admin Role System
**Epic:** E7 | **Size:** S | **Depends on:** slice-004

**User Story**
As a developer, I want an admin role column on profiles and a server-side helper so that admin-only routes can be protected by role rather than by specific user ID.

**Acceptance Criteria**
- [ ] Migration adds `role` column (text, default 'user') to `profiles` table with check constraint allowing 'user' or 'admin'
- [ ] Migration file committed to `supabase/migrations/` with appropriate timestamp
- [ ] `src/lib/admin/auth.ts` exports `isAdmin(userId: string): Promise<boolean>` using the server Supabase client
- [ ] `isAdmin` returns false (not throw) if user not found or role is not 'admin'
- [ ] `Profile` type in `src/types/database.ts` updated to include `role: 'user' | 'admin'`
- [ ] `npm run build` passes with zero errors

**Out of Scope**
Admin UI, role assignment UI, admin middleware, seed data.

---

## [slice-027] -- Admin Dashboard
**Epic:** E7 | **Size:** S | **Depends on:** slice-026

**User Story**
As an admin, I want a dashboard at /admin that shows venue, review, and producer counts plus quick links so that I can monitor platform content at a glance.

**Acceptance Criteria**
- [ ] `/admin` page exists at `src/app/(admin)/admin/page.tsx`
- [ ] Page checks `isAdmin(userId)` server-side — redirects non-admins to `/` with no error message
- [ ] Page displays counts: total venues, total reviews, total producers
- [ ] Page shows quick nav links: Venues (/venues), Producers (/producatori), Harta (/harta)
- [ ] Page styled with Tailwind (minimal, functional — no complex UI required)
- [ ] Layout file at `src/app/(admin)/layout.tsx`
- [ ] `npm run build` passes with zero errors

**Out of Scope**
Admin CRUD for content, user management, audit logs.

---

## [slice-028] -- Venue Seed Script
**Epic:** E7 | **Size:** S | **Depends on:** slice-006

**User Story**
As a developer, I want a seed script with 10 realistic Romanian venues so that the platform has content at launch without requiring manual entry.

**Acceptance Criteria**
- [ ] `scripts/seed/venues.ts` exports `seedVenues(supabase)` function
- [ ] Seeds exactly 10 venues: mix of bars, berarii (breweries), crame (wineries), terase across Cluj, București, Iași, Timișoara
- [ ] Each venue has: name, city, address, category, description in Romanian, lat/lng coordinates
- [ ] Uses upsert (on conflict name+city do nothing) for idempotent re-runs
- [ ] No hardcoded Supabase credentials — receives supabase client as parameter
- [ ] `npm run build` passes with zero errors

**Out of Scope**
User accounts, reviews, drink logs seeding.

---

## [slice-029] -- Producer Seed Script
**Epic:** E7 | **Size:** S | **Depends on:** slice-026

**User Story**
As a developer, I want a seed script with 6 realistic Romanian producers so that the producers directory has content at launch.

**Acceptance Criteria**
- [ ] `scripts/seed/producers.ts` exports `seedProducers(supabase)` function
- [ ] Seeds 6 producers: mix of breweries, wineries, distilleries from different Romanian regions
- [ ] Each producer has: name, category, region, description in Romanian, website URL
- [ ] Uses upsert (on conflict name do nothing) for idempotent re-runs
- [ ] `npm run build` passes with zero errors

**Out of Scope**
Drink log linking, venue linking.

---

## [slice-030] -- Seed Runner
**Epic:** E7 | **Size:** S | **Depends on:** slice-028, slice-029

**User Story**
As a developer, I want a single entry point that orchestrates all seed scripts so that I can populate the database with one command.

**Acceptance Criteria**
- [ ] `scripts/seed/run.ts` imports and calls `seedVenues` and `seedProducers` in sequence
- [ ] Runner creates a Supabase client using `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` env vars
- [ ] Runner prints a summary: how many venues and producers were seeded (using Romanian labels)
- [ ] `package.json` has a `"seed"` script: `"ts-node --project tsconfig.json scripts/seed/run.ts"`
- [ ] `npm run build` passes with zero errors

**Out of Scope**
CI integration, dry-run mode, rollback.
