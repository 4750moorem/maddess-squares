import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const updateGame: NonNullable<MutationResolvers['updateGame']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  return context.prisma.game.update({
    where: { id: args.id },
    data: {
      name: args.input.name ?? undefined,
      description: args.input.description,
    },
  })
}
