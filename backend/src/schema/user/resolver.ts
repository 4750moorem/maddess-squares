/* This file is auto-generated from schema.gql. */
import type { PrismaClient } from '../../generated/prisma/client'

type Context = { prisma: PrismaClient }

const queryResolvers = {
  hello: async (_parent: unknown, _args: Record<string, never>, ctx: Context) => {
    return 'March Madness Squares API'
  },
  dbStatus: async (_parent: unknown, _args: Record<string, never>, ctx: Context) => {
    await ctx.prisma.$queryRaw`SELECT 1`
    return 'ok'
  },
  user: async (_parent: unknown, args: { id: unknown }, ctx: Context) => {
    throw new Error('Not implemented')
  },
}

export default queryResolvers
