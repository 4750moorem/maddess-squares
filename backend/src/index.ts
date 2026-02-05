import { createSchema, createYoga } from 'graphql-yoga'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'
import { resolvers, typeDefs } from './schema'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const schema = createSchema<{ prisma: PrismaClient }>({
  typeDefs,
  resolvers,
})

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
  context: () => ({ prisma }),
})

const port = Number(process.env.PORT ?? 4000)

await prisma.$connect()

const server = Bun.serve({
  port,
  fetch: yoga.fetch,
})

console.log(`API running on http://localhost:${server.port}/graphql`)
