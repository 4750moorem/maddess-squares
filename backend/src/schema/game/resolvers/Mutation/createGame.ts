import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const createGame: NonNullable<MutationResolvers['createGame']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  const user = await context.prisma.user.findUnique({
    where: { firebaseUserId: context.user.uid },
  })

  if (!user) {
    throw new GraphQLError('User not found', {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  return context.prisma.game.create({
    data: {
      name: args.input.name,
      description: args.input.description,
      owners: {
        connect: { id: user.id },
      },
    },
  })
}
