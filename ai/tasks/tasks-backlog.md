# Tasks Backlog

## [slice-001] -- Initialize Next.js Project with TypeScript and Tailwind
**Epic:** E1 | **Size:** S | **Depends on:** none

**User Story**
As a developer, I want a properly configured Next.js 14 project with TypeScript strict mode and Tailwind CSS so that all future development starts from a consistent, typed foundation.

**Acceptance Criteria**
- [ ] `npx create-next-app` scaffolded with TypeScript, Tailwind CSS, ESLint, and App Router enabled
- [ ] `tsconfig.json` has `"strict": true` and path aliases configured (`@/` pointing to `src/`)
- [ ] `tailwind.config.ts` includes a custom color palette with at least a primary brand color for Betivi
- [ ] `npm run build` completes with zero errors and zero TypeScript errors
- [ ] `.eslintrc` enforces no-unused-vars and no-explicit-any rules

**Out of Scope**
Database connection, authentication, deployment configuration, and any UI components beyond the default layout.

---

## [slice-002] -- Connect Supabase and Configure Environment
**Epic:** E1 | **Size:** S | **Depends on:** slice-001

**User Story**
As a developer, I want Supabase connected to the Next.js app with environment variables and a typed client so that all database and auth operations are available from day one.

**Acceptance Criteria**
- [ ] Supabase project created and `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` added to `.env.local`
- [ ] `@supabase/supabase-js` and `@supabase/ssr` installed and a typed client helper created at `src/lib/supabase/client.ts`
- [ ] Server-side Supabase client created at `src/lib/supabase/server.ts` using cookies for SSR compatibility
- [ ] `.env.example` file committed with placeholder values and no real secrets
- [ ] A smoke-test page or route confirms the Supabase connection returns a non-error response

**Out of Scope**
Database schema creation, RLS policies, and any auth UI.

---

## [slice-003] -- Implement Email/Password Authentication
**Epic:** E1 | **Size:** S | **Depends on:** slice-002

**User Story**
As a visitor, I want to register with my email and password and log in so that I can participate in the Betivi community.

**Acceptance Criteria**
- [ ] `/auth/signup` page with email, password, and confirm-password fields that calls Supabase Auth `signUp`
- [ ] `/auth/login` page with email and password fields that calls Supabase Auth `signInWithPassword`
- [ ] Successful signup triggers a Supabase confirmation email and shows a "check your email" message
- [ ] Successful login redirects user to `/` and displays their email in the navbar
- [ ] Invalid credentials on login display a visible, user-friendly error message in Romanian
- [ ] `/auth/logout` route clears the session and redirects to `/`

**Out of Scope**
OAuth (Google/Facebook) login, password reset flow, and user profile creation beyond the auth record.

---

## [slice-004] -- Define Database Schema and RLS Policies
**Epic:** E1 | **Size:** S | **Depends on:** slice-002

**User Story**
As a developer, I want the core database tables and row-level security policies in place so that the app's data model is secure and ready for feature development.

**Acceptance Criteria**
- [ ] `profiles` table created (id references auth.users, username, avatar_url, created_at) with RLS: users can read all profiles, update only their own
- [ ] `venues` table created (id, name, city, address, description, category, created_at) with RLS: public read, insert restricted to authenticated users
- [ ] `reviews` table created (id, venue_id, user_id, rating int 1-5, body text, created_at) with RLS: public read, insert/update/delete restricted to the owning user
- [ ] All migrations committed as `.sql` files in `supabase/migrations/`
- [ ] RLS policies verified manually in the Supabase dashboard with both authenticated and anonymous roles

**Out of Scope**
Seed data, admin roles, venue images, and any application-layer code that reads from these tables.

---

## [slice-005] -- Protected Routes and Auth Middleware
**Epic:** E1 | **Size:** S | **Depends on:** slice-003, slice-004

**User Story**
As a developer, I want middleware that protects authenticated-only routes so that unauthenticated users are redirected to login before accessing protected pages.

**Acceptance Criteria**
- [ ] Next.js `middleware.ts` created at the project root using Supabase SSR session validation
- [ ] Routes under `/profile` and `/review/new` redirect unauthenticated users to `/auth/login` with a `redirectTo` query param
- [ ] After login, users are redirected back to the originally requested URL via the `redirectTo` param
- [ ] Public routes (`/`, `/venues`, `/auth/*`) are accessible without authentication
- [ ] Middleware does not break static asset serving (`/_next/`, `/favicon.ico`)

**Out of Scope**
Role-based access control, admin-only routes, and rate limiting.
