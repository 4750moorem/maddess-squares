import type { PrismaClient } from '../generated/prisma/client'

export type AuthUser = {
  uid: string
  email: string | undefined
}

export type GraphQLContext = {
  prisma: PrismaClient
  user: AuthUser | null
}
