# Tasks In Progress

---

## [slice-026] -- Admin Role System
**Epic:** E7 | **Size:** S | **Depends on:** slice-004
Started: 2026-05-30 | Agent: meto-epic-E7

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
