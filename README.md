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
- `docker-compose.yml` — local Postgres and API container

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
