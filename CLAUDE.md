# betivi

Betivi is a community platform built for Romania's drinking culture — a space where enthusiasts of craft beer, wine, spirits, and social drinking can connect, discover, and share experiences. The platform serves as a digital hub where Romanians can find drinking spots, share reviews, organize pub crawls, and build a community around their shared passion for good drinks and good company.

The product matters because Romania has a vibrant but fragmented drinking culture. Local bars, craft breweries, wine cellars, and spirits producers lack a unified discovery layer, and enthusiasts have no dedicated community space to share recommendations, organize events, or follow others with similar taste. Betivi fills this gap by combining discovery, social interaction, and community-driven content in a single platform tailored to Romanian tastes and locations.

Betivi differentiates itself from generic review apps like TripAdvisor or Google Maps by focusing exclusively on the drinking community in Romania. It speaks the language — literally and culturally — of its users. Content moderation, local slang, regional drink specialties (tuică, palincă, local craft beer), and Romanian geography are all first-class citizens. This is not a global app with a Romanian filter; it is a Romanian app from the ground up.

The platform will evolve from a discovery and review tool into a full community platform with user profiles, following/follower mechanics, event listings, and curated lists. The long-term vision is to become the authoritative source for drinking culture in Romania — the place where every bar owner wants their venue listed and every enthusiast checks before going out.

## Session Start — Swarm Mode

> **This project uses swarm mode.** Do NOT start with `@meto-pm` or pick tasks as `@meto-developer`.
> Your role as lead agent is to orchestrate — read state, then launch the right epic agent.

**Run in order at the start of every session:**
1. Read `ai/swarm/SWARM_AWARENESS.md` — check each epic's status (`not-started` / `on-track` / `testing-ready` / `complete`)
2. Read `ai/swarm/domain-map.md` — confirm domain ownership before launching any agent
3. For each epic with status `not-started` or `on-track`: launch `@meto-epic-[id]` (separate Claude Code session or teammate)
4. For each epic with status `testing-ready`: launch `@meto-tester` scoped to that epic
5. Run `npx meto-cli status` to get a live terminal view of swarm progress

**Lead agent rules:**
- NEVER implement tasks directly — always delegate to epic agents
- NEVER call `@meto-pm` unless the backlog is empty and planning is genuinely needed
- NEVER run two epic agents that share files in the same session (check domain-map first)

## Read First
1. `/ai/context/product-vision.md` — what and why
2. `/ai/context/tech-stack.md` — stack and constraints
3. `/ai/context/decisions.md` — settled, never re-debate

---

## Agents

Human orchestrator reads the board and calls the right agent.

| Agent | Owns |
|---|---|
| `@meto-pm` | `/ai/backlog/`, `tasks-backlog.md`, `tasks-todo.md` |
| `@meto-developer` | `/src/`, `tasks-in-progress.md`, `tasks-in-testing.md` |
| `@meto-tester` | `tasks-in-testing.md` → done or back to todo |
| `@meto-community` | Community engagement, user communication, market awareness |

Each agent has a memory file in `.claude/agent-memory/` — read at session start, update at session end.

### Swarm Mode Agents

This project uses **swarm mode** -- parallel epic agents working on independent domains.

**Critical rules:**
- The lead agent (you) orchestrates only -- NEVER implement tasks directly. Always delegate: `@meto-pm` for planning, `@meto-epic-[id]` for building, `@meto-tester` for validation.
- Epic agents run independent tasks in parallel (background agents/worktrees). Only sequential when there is a dependency chain.

| Agent | Owns |
|---|---|
| `@meto-pm` | Planning, epics, swarm init, `ai/swarm/domain-map.md` |
| `@meto-epic-[id]` | One per epic, scoped to its domain -- the ONLY agents that write code |
| `@meto-tester` | Validates all epics sequentially |

See `ai/swarm/domain-map.md` for epic ownership.

See `ai/workflows/swarm-workflow.md` for rhythm.

Run `npx meto-cli status` at any time to see swarm progress in the terminal.

---

## Daily Workflow

```
cd your-project && claude              # start a session
→ read SWARM_AWARENESS.md             # check which epics are ready
→ @meto-epic-[id]                     # launch per-epic agent (one per epic, separate session)
→ @meto-tester                        # when an epic is testing-ready
npx meto-cli status                   # check swarm progress at any time
/compact                              # compress context when it feels heavy
```

- **One session per epic** — each `@meto-epic-[id]` runs in its own Claude Code window
- **Lead orchestrates, never implements** — read SWARM_AWARENESS.md, launch agents, monitor
- **Commit frequently** — epic agents commit after each task

- **Commit frequently** — don't let work pile up uncommitted
- **`/compact` when needed** — context is large (1M tokens), but compress if responses slow down
- **New session signs:** agent forgetting prior work, repeated file reads, sluggish responses

## Quick Reference

| Shortcut | What it does |
|---|---|
| `Shift+Tab+Tab` | Switch to Plan Mode (think before building) |
| `Shift+Tab` | Toggle Auto Accept |
| `Tab` | Toggle extended thinking |
| `/compact` | Compress context window |
| `Esc Esc` | Open rewind menu |

---

## The Board

```
tasks-backlog → tasks-todo → tasks-in-progress → tasks-in-testing → tasks-done
```

- Full task definition travels with the task through every column
- `@meto-developer` picks TOP item from todo — no cherry-picking
- **A task moves from todo → in-progress only after the sprint contract is written and agreed** (`ai/contracts/slice-NNN-contract.md` exists and is signed by @meto-tester)
- **XS/S slices:** developer self-validates and moves straight to done (no tester)
- **M/L slices:** must go through `@meto-tester` before done
- Only `@meto-tester` moves tasks backwards (testing → todo on fail)
- **Batch mode:** developer may process multiple slices per session, committing once at the end

See `/ai/workflows/definition-of-done.md` for done criteria.

### Task Definition Format

Each task block uses this structure:

```
## [slice-NNN] -- Title
**Epic:** ENN | **Size:** XS/S/M/L | **Depends on:** slice-NNN or none
**Needs:** slice-NNN, slice-NNN   (optional — omit if none)
**Blocks:** slice-NNN, slice-NNN  (optional — omit if none)
```

> `Needs` lists tasks that must be in `tasks-done.md` before this task is safe to start. `Blocks` lists tasks that cannot start until this one is done. Both fields are read by `meto ready`.

---

## Agent Teams

This project supports Agent Teams. The lead agent can spawn teammates using `@meto-pm`, `@meto-developer`, `@meto-tester`, `@meto-community`.

**Coordination model:** Agent Teams has its own task system, but this project uses the kanban board (`tasks-backlog` through `tasks-done`) as the single source of truth for task state. Teammates must read and update the board files, not rely on Agent Teams' internal task tracking.

**File ownership is exclusive -- two teammates editing the same file causes overwrites.**

| Agent | Writes |
|---|---|
| `@meto-pm` | `/ai/` files, `tasks-backlog.md`, `tasks-todo.md` |
| `@meto-developer` | `/src/`, config files, `tasks-in-progress.md`, `tasks-in-testing.md` |
| `@meto-tester` | `tasks-in-testing.md`, `tasks-done.md`, `tasks-todo.md` (failed items) |
| `@meto-community` | Read-only — reads product files, drafts community content in `/ai/community/` |

Each agent writes only its own memory file in `.claude/agent-memory/` -- never another agent's.

Teammates do NOT inherit the lead's conversation history. Each teammate reads CLAUDE.md and its agent definition fresh.

**Per-agent rules live in `.claude/rules/` — Claude Code loads them automatically based on which agent is active.**

---

## Context Management

- **Session cadence:** Start a new session every 10-15 slices or when context feels sluggish
- **Session start — checklist (run in order):**
  1. **Read `ai/handoff/current.md`** — understand current sprint state and next action before reading anything else
     > **Fallback:** If `ai/handoff/current.md` does not exist, read `ai/tasks/tasks-in-progress.md` and the memory file for your agent role instead.
  2. Read `CLAUDE.md`
  3. Read your agent memory file (`.claude/agent-memory/<your-role>/MEMORY.md`)
  4. Read the board (`ai/tasks/tasks-in-progress.md`) — then act
- **Session end — blocking steps (must complete before closing the session):**
  1. **[BLOCKING] Write `ai/handoff/current.md` using the handoff template — do not end the session until this file is written**
  2. Update your memory file with decisions, patterns, and what to pick up next
  > **Context limit reminder:** If context is near the limit, write the handoff before doing anything else — it is the most important session-end action.
- **Context budget:** Grep before reading full files; read targeted line ranges; max 10 files open before acting
- **Red flag:** If you re-read a file you already read this session, note key info in memory instead

---

## Workflow Rules

- **Plan first:** For any task with 3+ steps or architectural decisions, enter plan mode before writing code. If something goes sideways, STOP and re-plan.
- **Contract first:** Before writing any implementation code, create `ai/contracts/slice-NNN-contract.md` from the template and get explicit sign-off from @meto-tester. No code until the contract exists and is signed.
- **Test first, always:** Write the failing test before implementation. Watch it fail, then make it pass. Code written before a test = delete and restart.
- **Systematic debugging:** Root-cause first — read the error, trace the call, form a hypothesis. If 3 distinct fixes fail, stop and re-plan rather than trying a fourth.
- **Verify before done:** Never mark a task complete without running the verification command in the current session. No verbal claims — show the output.
- **Minimal impact:** Changes touch only what's necessary. No temporary fixes — find root causes.

---

## NEVER DO — @meto-developer

- End a session without writing `ai/handoff/current.md`
- Write implementation code before a signed sprint contract exists for the current slice
- Pick up more than one task at a time
- Cherry-pick — always take the TOP item from `tasks-todo.md`
- Modify backlog or todo files (owned by @meto-pm)
- Move tasks to `tasks-done.md` (owned by @meto-tester)
- Hardcode scaffold content in source — always read from templates
- Commit with `console.log`, `any` types, or commented-out code

---

## Commit Format

```
feat(scope): description [dev-agent]
fix(scope): description [dev-agent]
docs(scope): description [pm-agent]
test(scope): description [tester-agent]
chore(scope): description [bootstrap]
```

---

## Stack
## Stack Overview

| Layer | Choice | Reason |
|---|---|---|
| UI | Next.js (React) | Server-side rendering, file-based routing, API routes built-in |
| API | Next.js API Routes | Co-located with frontend, serverless-ready |
| Database | Supabase (PostgreSQL) | Managed Postgres with real-time subscriptions and auto-generated APIs |
| Auth | Supabase Auth | Built-in email/password, OAuth providers, row-level security |
| Hosting | Vercel | Zero-config Next.js deploys, edge functions, preview deployments |

## Key Libraries
- **Tailwind CSS** -- utility-first styling
- **TypeScript** -- strict mode throughout

## Code Conventions
<!-- Keep to 3-4 rules max. More rules = more ignored. Focus on what actually causes bugs. -->
TypeScript strict mode, no any types, no console.log in production code

## Code Guidelines
See `/ai/workflows/code-guidelines.md` for file size limits, structure rules, naming, and stack-specific standards. Both `@meto-developer` and `@meto-tester` enforce these.
