import type { QueryResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const games: NonNullable<QueryResolvers['games']> = async (
  _parent,
  _args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  return context.prisma.game.findMany()
}
