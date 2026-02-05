import { createSchema, createYoga } from 'graphql-yoga'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'
import { resolvers, typeDefs } from './schema'
import { verifyIdToken } from './lib/firebase-admin'
import type { GraphQLContext } from './schema/context'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const schema = createSchema<GraphQLContext>({
  typeDefs,
  resolvers,
})

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
  context: async ({ request }): Promise<GraphQLContext> => {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    let user: GraphQLContext['user'] = null
    if (token) {
      const decoded = await verifyIdToken(token)
      if (decoded) {
        user = { uid: decoded.uid, email: decoded.email }
      }
    }

    return { prisma, user }
  },
})

const port = Number(process.env.PORT ?? 4000)

await prisma.$connect()

const server = Bun.serve({
  port,
  fetch: yoga.fetch,
})

console.log(`API running on http://localhost:${server.port}/graphql`)
