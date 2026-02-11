import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const bulkAddPlayers: NonNullable<MutationResolvers['bulkAddPlayers']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  const { gameId, players } = args.input

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

  if (!game.owners.some((owner) => owner.id === currentUser.id)) {
    throw new GraphQLError('Not authorized to add players to this game', {
      extensions: { code: 'FORBIDDEN' },
    })
  }

  for (const player of players) {
    if (player.email || player.phoneNumber) {
      const orConditions: Array<{ email: string } | { phoneNumber: string }> = []
      if (player.email) orConditions.push({ email: player.email })
      if (player.phoneNumber) orConditions.push({ phoneNumber: player.phoneNumber })

      let user = await context.prisma.user.findFirst({
        where: { OR: orConditions },
      })

      if (!user) {
        user = await context.prisma.user.create({
          data: {
            email: player.email,
            phoneNumber: player.phoneNumber,
            displayName: `${player.firstName} ${player.lastName}`,
          },
        })
      }

      const existingPlayer = await context.prisma.gamePlayer.findFirst({
        where: { gameId, userId: user.id },
      })

      if (!existingPlayer) {
        await context.prisma.gamePlayer.create({
          data: { gameId, userId: user.id },
        })
      }
    } else {
      const tempPlayer = await context.prisma.tempPlayer.create({
        data: {
          firstName: player.firstName,
          lastName: player.lastName,
        },
      })

      await context.prisma.gamePlayer.create({
        data: {
          gameId,
          tempUserId: tempPlayer.id,
        },
      })
    }
  }

  return context.prisma.game.findUnique({
    where: { id: gameId },
  })
}
