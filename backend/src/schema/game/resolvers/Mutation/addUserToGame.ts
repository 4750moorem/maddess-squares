import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const addUserToGame: NonNullable<MutationResolvers['addUserToGame']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  const { gameId, role, email, phoneNumber } = args.input

  if (!email && !phoneNumber) {
    throw new GraphQLError('Either email or phoneNumber must be provided', {
      extensions: { code: 'BAD_USER_INPUT' },
    })
  }

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
    throw new GraphQLError('Only game owners can add users to a game', {
      extensions: { code: 'FORBIDDEN' },
    })
  }

  const userToAdd = await context.prisma.user.findFirst({
    where: {
      OR: [
        email ? { email } : {},
        phoneNumber ? { phoneNumber } : {},
      ].filter((obj) => Object.keys(obj).length > 0),
    },
  })

  if (!userToAdd) {
    throw new GraphQLError('User not found', {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  if (role === 'OWNER') {
    return context.prisma.game.update({
      where: { id: gameId },
      data: {
        owners: {
          connect: { id: userToAdd.id },
        },
      },
    })
  } else {
    await context.prisma.gamePlayer.upsert({
      where: {
        gameId_userId: {
          gameId,
          userId: userToAdd.id,
        },
      },
      create: {
        gameId,
        userId: userToAdd.id,
      },
      update: {},
    })

    return context.prisma.game.findUnique({
      where: { id: gameId },
    })
  }
}
