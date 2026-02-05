import type { QueryResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const users: NonNullable<QueryResolvers['users']> = async (
  _parent,
  _args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  return context.prisma.user.findMany()
}
