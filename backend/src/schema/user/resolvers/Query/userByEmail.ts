import type { QueryResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const userByEmail: NonNullable<QueryResolvers['userByEmail']> = async (
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
    where: { email: args.email },
  })
}
