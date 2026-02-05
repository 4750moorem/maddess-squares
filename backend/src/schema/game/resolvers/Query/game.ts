import type { QueryResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const game: NonNullable<QueryResolvers['game']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  return context.prisma.game.findUnique({
    where: { id: args.id },
  })
}
