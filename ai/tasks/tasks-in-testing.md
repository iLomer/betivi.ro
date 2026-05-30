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
