# Code Guidelines — betivi

These guidelines are enforced by `@meto-developer` during implementation and verified by `@meto-tester` before sign-off.

## File Size Limits

| Scope | Max Lines | Action |
|---|---|---|
| Single file | 300 | Split into focused modules |
| Single function/method | 50 | Extract helper functions |
| Single React component | 200 | Break into sub-components |

If a file exceeds these limits, refactor before adding more code. Never let a file grow past 500 lines — that is a hard stop.

## Structure Rules

- **One responsibility per file** — if a file does two things, split it
- **No god files** — a file that everything imports from is a design smell
- **No circular imports** — if A imports B and B imports A, introduce a shared module or restructure
- **Flat over nested** — prefer 2 levels of directory nesting max; deeply nested trees are hard to navigate
- **Co-locate related code** — tests next to source, types next to usage

## Naming

- Files: `kebab-case.ts` (e.g., `user-service.ts`)
- Classes/Types: `PascalCase` (e.g., `UserService`)
- Functions/Variables: `camelCase` (e.g., `getUserById`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)
- Boolean variables: prefix with `is`, `has`, `should` (e.g., `isLoading`)

## Code Hygiene

- No `console.log` in committed code — use a proper logger
- No commented-out code — delete it, git has history
- No `any` types (TypeScript) — use `unknown` and narrow
- No magic numbers — extract to named constants
- No deeply nested conditionals (3+ levels) — use early returns or extract functions

## Error Handling

- Handle errors at the boundary, not in every function
- Never swallow errors silently (`catch (e) {}`)
- Use typed errors where the language supports it
- User-facing errors must be human-readable, not stack traces

## Stack-Specific Guidelines (Next.js + Supabase)

- **Components:** Max 200 lines per component. Extract hooks into `use*.ts` files
- **API routes:** One route per file. Keep handlers under 50 lines — extract business logic to services
- **Supabase queries:** Never call Supabase directly from components — use a data access layer
- **Server vs Client:** Mark components explicitly with `"use client"` only when needed. Default to server components
- **Environment variables:** Never hardcode secrets. Use `.env.local` and document in `.env.example`
