import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const deleteGame: NonNullable<MutationResolvers['deleteGame']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  await context.prisma.game.delete({
    where: { id: args.id },
  })

  return true
}
