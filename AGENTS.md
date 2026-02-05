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
