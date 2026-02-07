# Backend

GraphQL API built with GraphQL Yoga and Prisma, backed by Postgres. The schema
and resolvers live under `src/schema`.

## How it works

- `src/index.ts` boots the Yoga server and Prisma client
- GraphQL schema and resolvers are generated and composed in `src/schema`
- Prisma uses `DATABASE_URL` to connect to Postgres

## Getting started

```bash
bun install
```

Start the database and set the connection string:

```bash
docker compose -f ../docker-compose.yml up -d db
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/march_maddess?schema=public"
```

Initialize the database:

```bash
bun run db:bootstrap
```

## Commands

```bash
# dev server (includes schema codegen)
bun run dev

# start without watching
bun run start

# generate schema + types only
bun run schema:codegen

# database helpers
bun run db:up
bun run db:down
bun run db:bootstrap

# prisma CLI passthrough
bun run prisma

# seed test user (for testing)
bun run seed:test-user
```

## Testing Setup

Before testing the application, seed the test user:

```bash
bun run seed:test-user
```

This creates a user with:
- Email: `test12@gmail.com`
- Password: `Asdfjkl12!` (Firebase account)
- Firebase ID: `MwCFg682UzSRCT0FXdUx4x76B2D3`
