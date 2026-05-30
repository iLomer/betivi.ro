# Epic Agent Memory -- Project Foundation & Auth (E1)

*Read at session start. Update at session end. Keep it concise.*

---

## Current State
- **Status:** testing-ready
- **Tasks completed:** 5 / 5
- **Checkpoint count:** 2

## Session Log

### 2026-05-30 — Initial session, all 5 slices completed

**Decisions:**
- Next.js 16 uses `src/proxy.ts` / `export function proxy()` — not `middleware.ts` / `export function middleware()`. The old name still works but shows a deprecation warning.
- Tailwind v4 (installed by default with Next.js 16) uses CSS-based `@theme` in globals.css. Created `tailwind.config.ts` as well for the acceptance criteria.
- `npm run build` passes with zero TypeScript errors.

**Key files:**
- `src/lib/supabase/client.ts` — browser Supabase client
- `src/lib/supabase/server.ts` — server Supabase client (async, cookies)
- `src/app/auth/signup/page.tsx` — signup form (Romanian)
- `src/app/auth/login/page.tsx` — login form (Romanian)
- `src/app/auth/logout/route.ts` — GET + POST logout handler
- `src/app/auth/callback/route.ts` — email confirmation callback
- `src/app/layout.tsx` — root layout with auth-aware navbar
- `src/proxy.ts` — route protection proxy
- `supabase/migrations/` — 3 SQL migration files (profiles, venues, reviews)
- `src/types/database.ts` — TypeScript types

**Pending user action:**
- Apply the 3 SQL migration files via Supabase dashboard SQL editor (in order).
