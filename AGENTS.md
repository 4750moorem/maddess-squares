# Maddess Squares

Monorepo for the Maddess Squares app with a React UI and a GraphQL API backed by
Postgres.

## Tech stack

- Bun for runtime and scripts
- React + Vite + Tailwind in `ui`
- GraphQL Yoga + Prisma in `backend`
- Postgres via Docker Compose

## Project structure

- `ui/` — web client
- `backend/` — GraphQL API
- `infra/` — infrastructure notes and docs
- `docker-compose.yml` — local Postgres and API container

UI structure highlights:

- `ui/src/pages/` — page and sub-page components
- `ui/src/routes.tsx` — app routes
- `ui/src/components/` — shared UI components
- `ui/src/components/ui/` — shadcn component wrappers/variants
- `ui/src/graphql/` — client queries and generated types
- `ui/src/lib/` — shared utilities

Backend structure highlights:

- `backend/src/schema/` — GraphQL schema, resolvers, and generated types
- `backend/prisma/` — Prisma schema and migrations
- `backend/src/generated/` — generated Prisma client types

## Quick start

```bash
# install deps
bun --cwd ui install
bun --cwd backend install

# start database
docker compose up -d db

# optional: run migrations + generate Prisma client
bun --cwd backend run db:bootstrap

# run API and UI in separate terminals
bun --cwd backend dev
bun --cwd ui dev
```

Env you will likely need:

- `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/march_maddess?schema=public`
- `VITE_API_URL=http://localhost:4000/graphql`

## General rules

- Avoid casting unless 100% necessary.
- Never use `any`. Prefer `unknown`, type guards, and loose types.
- If an `any` is truly unavoidable, add a comment: `TODO figure out a type`.
- Before opening a PR, run `lint`, `check`, and `build` for both `ui` and `backend`.
- If any of those fail, you may still open a PR but it must be a draft, and you must comment on why you think it fails.

## UI rules

- Always use Tailwind.
- Use shadcn components when possible, or supported third-party shadcn components if necessary.
- Avoid writing complex custom components like server-side typeaheads.
- Use React Router declarative routing.
- One component per file is ideal unless another component is very simple.
- Avoid functions that return JSX unless they are component functions.
- Pages and sub-pages go in `ui/src/pages/` for easy navigation.
- All routes live in `ui/src/routes.tsx`.
- Use the basic Apollo cache for state management; if you need more, prefer context or prop drilling over a library.

## Backend rules

- Everything should be type-safe with Prisma or GraphQL generated types.
- We do not need DB enums.

## Game Rules & Terminology

This app hosts a **March Madness Squares** game (also known as NCAA Basketball Squares or Madness Squares). The concept is similar to Super Bowl Squares but applied to the NCAA Men's Basketball Tournament.

### The Grid

- A **10x10 grid** of 100 squares (boxes)
- Each row and column is assigned a number from **0-9**
- The **columns (X-axis / top)** represent the last digit of the **winning team's** final score
- The **rows (Y-axis / side)** represent the last digit of the **losing team's** final score
- Grid numbers are typically hidden until the tournament begins or the admin reveals them

### How Squares Work

- Pool members claim squares on the grid before the tournament starts
- Each square a member owns applies to **every game** in the tournament (unlike Super Bowl Squares which is just one game)
- At the end of each game, the winning square is determined by:
  1. Take the last digit of the winning team's score → find that column
  2. Take the last digit of the losing team's score → find that row
  3. The intersection of that column and row is the winning square

### Example

If North Carolina beats Miami 73-64:
- Winning team (North Carolina): 73 → last digit is **3** (column)
- Losing team (Miami): 64 → last digit is **4** (row)
- The square at column 3, row 4 wins for that game

### Prizes & Winners

- Each game produces a winner (the owner of the winning square)
- Winners are tracked per game and aggregated across the tournament
- Common prize structures include:
  - **Per-game prizes**: A fixed amount for each game won
  - **Round-based prizes**: Different prize amounts for different tournament rounds (Round of 64, Round of 32, Sweet 16, Elite 8, Final Four, Championship)
  - **Total wins**: Prizes for members with the most total winning squares
  - **Empty squares**: If a winning square is unclaimed, the prize may roll over or be split

### Key Terms

- **Square/Box**: A single cell in the 10x10 grid that can be claimed by a member
- **Winning Square**: The square that corresponds to the final score's last digits for a game
- **Grid Numbers**: The 0-9 values assigned to each row and column (often randomly assigned)
- **Pool Member**: A participant who claims squares in the pool
- **Commissioner/Admin**: The person who manages the pool, reveals numbers, and handles prizes
- **Round**: Tournament stage (R1=Round of 64, R2=Round of 32, R3=Sweet 16, R4=Elite 8, R5=Final Four, R6=Championship)
