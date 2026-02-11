import type { QueryResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const notifications: NonNullable<QueryResolvers['notifications']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  const userId = args.userId ?? undefined

  return context.prisma.notification.findMany({
    where: userId ? { userId } : undefined,
    orderBy: { createdAt: 'desc' },
  })
}
