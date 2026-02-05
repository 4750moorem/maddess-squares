# UI

React client built with Vite, Tailwind, and Apollo Client. It consumes the
GraphQL API and uses generated hooks in `src/graphql/generated.ts`.

## How it works

- Apollo client is configured in `src/main.tsx` using `VITE_API_URL`
- GraphQL operations live in `src/graphql/queries.graphql`
- Codegen outputs typed hooks in `src/graphql/generated.ts`

## Getting started

```bash
bun install
```

Set the API endpoint:

```bash
export VITE_API_URL="http://localhost:4000/graphql"
```

## Commands

```bash
# start dev server
bun dev

# run GraphQL codegen
bun run codegen

# build for production
bun run build

# lint
bun run lint

# preview production build
bun run preview
```
