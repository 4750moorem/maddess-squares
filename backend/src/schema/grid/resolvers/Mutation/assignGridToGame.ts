import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const assignGridToGame: NonNullable<
  MutationResolvers['assignGridToGame']
> = async (_parent, args, context) => {
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

  const game = await context.prisma.game.findUnique({
    where: { id: args.input.gameId },
    include: { owners: true },
  })

  if (!game) {
    throw new GraphQLError('Game not found', {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  const isOwner = game.owners.some((owner) => owner.id === user.id)
  if (!isOwner) {
    throw new GraphQLError('Only game owners can assign grids', {
      extensions: { code: 'FORBIDDEN' },
    })
  }

  const grid = await context.prisma.grid.findUnique({
    where: { id: args.input.gridId },
  })

  if (!grid) {
    throw new GraphQLError('Grid not found', {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  return context.prisma.game.update({
    where: { id: args.input.gameId },
    data: { gridId: args.input.gridId },
  })
}
