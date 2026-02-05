
import type { QueryResolvers } from './../../../types.generated'

export const dbStatus: NonNullable<QueryResolvers['dbStatus']> = async (
  _parent,
  _arg,
  ctx,
) => {
  await ctx.prisma.$queryRaw`SELECT 1`
  return 'ok'
}