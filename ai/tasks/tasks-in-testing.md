# Tasks In Testing

---

## [slice-017] -- Drink Tracker Dashboard
**Epic:** E4 | **Size:** M | **Depends on:** slice-015, slice-016
Started: 2026-05-30 | Agent: meto-epic-E4
Completed: 2026-05-30 | Files changed: src/app/(tracker)/tracker/page.tsx, src/components/tracker/DrinkStats.tsx, src/components/tracker/FillingGlass.tsx, src/components/tracker/DrinkList.tsx

**User Story**
As an authenticated user, I want a dashboard showing my drink history and a visual filling-glass progress indicator so that I can see my drinking journey at a glance.

**Acceptance Criteria**
- [x] `/tracker` page requires authentication — redirects to `/auth/login` if not logged in
- [x] `src/components/tracker/DrinkStats.tsx` displays total drinks, beer count, wine count, spirit count
- [x] `src/components/tracker/FillingGlass.tsx` renders an SVG glass that fills proportionally based on total drink count (milestones: 10 drinks = 25%, 25 = 50%, 50 = 75%, 100 = 100%)
- [x] `src/components/tracker/DrinkList.tsx` renders the log entries: drink name, category badge, producer (if set), star rating (if set), formatted date; delete button for each entry
- [x] Delete calls `deleteDrinkLogAction` and revalidates `/tracker`
- [x] Link to `/tracker/log` shown prominently ("Adaugă o băutură")
- [x] Empty state shown when user has no logged drinks
- [x] `npm run build` passes with zero errors

**Out of Scope**
Editing existing entries, exporting logs, and social sharing of individual drinks.

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

