import type { QueryResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const me: NonNullable<QueryResolvers['me']> = async (
  _parent,
  _args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  return context.prisma.user.findUnique({
    where: { firebaseUserId: context.user.uid },
  })
}
