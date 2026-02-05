import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const removeUserFromGame: NonNullable<MutationResolvers['removeUserFromGame']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  const { gameId, userId, role } = args.input

  const currentUser = await context.prisma.user.findUnique({
    where: { firebaseUserId: context.user.uid },
  })

  if (!currentUser) {
    throw new GraphQLError('Current user not found', {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  const game = await context.prisma.game.findUnique({
    where: { id: gameId },
    include: { owners: true },
  })

  if (!game) {
    throw new GraphQLError('Game not found', {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  const isOwner = game.owners.some((owner) => owner.id === currentUser.id)
  if (!isOwner) {
    throw new GraphQLError('Only game owners can remove users from a game', {
      extensions: { code: 'FORBIDDEN' },
    })
  }

  if (role === 'OWNER') {
    if (game.owners.length <= 1 && game.owners[0]?.id === userId) {
      throw new GraphQLError('Cannot remove the last owner from a game', {
        extensions: { code: 'BAD_USER_INPUT' },
      })
    }

    return context.prisma.game.update({
      where: { id: gameId },
      data: {
        owners: {
          disconnect: { id: userId },
        },
      },
    })
  } else {
    await context.prisma.gamePlayer.delete({
      where: {
        gameId_userId: {
          gameId,
          userId,
        },
      },
    })

    return context.prisma.game.findUnique({
      where: { id: gameId },
    })
  }
}
