import type { QueryResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const userByFirebaseId: NonNullable<QueryResolvers['userByFirebaseId']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  return context.prisma.user.findUnique({
    where: { firebaseUserId: args.firebaseUserId },
  })
}
