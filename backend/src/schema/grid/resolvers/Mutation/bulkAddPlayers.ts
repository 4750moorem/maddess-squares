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

  const { gridId, players } = args.input

  const currentUser = await context.prisma.user.findUnique({
    where: { firebaseUserId: context.user.uid },
  })

  if (!currentUser) {
    throw new GraphQLError('Current user not found', {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  const grid = await context.prisma.grid.findUnique({
    where: { id: gridId },
    include: { owners: true },
  })

  if (!grid) {
    throw new GraphQLError('Grid not found', {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  if (!grid.owners.some((owner) => owner.id === currentUser.id)) {
    throw new GraphQLError('Not authorized to add players to this grid', {
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
        where: { gridId, userId: user.id },
      })

      if (!existingPlayer) {
        await context.prisma.gamePlayer.create({
          data: { gridId, userId: user.id },
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
          gridId,
          tempUserId: tempPlayer.id,
        },
      })
    }
  }

  return context.prisma.grid.findUnique({
    where: { id: gridId },
  })
}
