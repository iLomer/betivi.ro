# Epic Agent Memory -- Reviews & Ratings (E3)

*Read at session start. Update at session end. Keep it concise.*

---

## Current State
- **Status:** testing-ready
- **Tasks completed:** 3 (slice-011, slice-012, slice-013)
- **Checkpoint count:** 1

## Session Log

### 2026-05-30 — Session 1

**Completed:**
- slice-011 (S): Reviews data layer — `src/lib/reviews/queries.ts` and `src/lib/reviews/actions.ts`
- slice-012 (S): ReviewList component — `src/components/reviews/ReviewList.tsx`
- slice-013 (M): Review form — `src/components/reviews/ReviewForm.tsx`, `src/components/reviews/ReviewSection.tsx`

**Key decisions:**
- Used `ReviewSection` as a Server Component wrapper to fetch auth state and user's existing review, then pass to `ReviewForm` (Client Component)
- `ReviewList` is an async Server Component — reads directly from Supabase
- Venue aggregate recalculation happens in `recalculateVenueAggregates()` — reads all ratings for venue, recomputes avg and count, writes back to venues table
- Added migration `20240003000000_reviews_unique_constraint.sql` for `unique(venue_id, user_id)` constraint required by upsert
- `ReviewForm` uses two separate `useTransition` hooks (one for submit, one for delete) to track independent pending states
- `StarPicker` is a sub-component within `ReviewForm.tsx` (not a separate file — under 50 lines)

**Board state:**
- slice-011: tasks-done (self-validated, S size)
- slice-012: tasks-done (self-validated, S size)
- slice-013: tasks-in-testing (M size — needs @meto-tester)

**Files changed:**
- `src/lib/reviews/queries.ts` (new)
- `src/lib/reviews/actions.ts` (new)
- `src/components/reviews/ReviewList.tsx` (new)
- `src/components/reviews/ReviewForm.tsx` (new)
- `src/components/reviews/ReviewSection.tsx` (new)
- `src/app/(venues)/venues/[id]/page.tsx` (modified — added ReviewSection import, replaced placeholder)
- `supabase/migrations/20240003000000_reviews_unique_constraint.sql` (new)

**Caution for next session:**
- The venue detail page `src/app/(venues)/venues/[id]/page.tsx` is owned by E2 but was modified by E3 to integrate ReviewSection. This is the integration point. If E2 agent makes changes to that file, coordinate.
- Migration must be applied via Supabase SQL editor (same as E1/E2 migrations)
