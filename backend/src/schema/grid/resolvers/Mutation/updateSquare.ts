import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const updateSquare: NonNullable<MutationResolvers['updateSquare']> =
  async (_parent, args, context) => {
    if (!context.user) {
      throw new GraphQLError('Unauthorized', {
        extensions: { code: 'UNAUTHORIZED' },
      })
    }

    const square = await context.prisma.square.findUnique({
      where: { id: args.id },
    })

    if (!square) {
      throw new GraphQLError('Square not found', {
        extensions: { code: 'NOT_FOUND' },
      })
    }

    const data: { gamePlayerId?: string | null } = {}

    if (args.input.gamePlayerId !== undefined) {
      if (args.input.gamePlayerId === null) {
        data.gamePlayerId = null
      } else {
        const gamePlayer = await context.prisma.gamePlayer.findUnique({
          where: { id: args.input.gamePlayerId },
        })
        if (!gamePlayer) {
          throw new GraphQLError('Game player not found', {
            extensions: { code: 'NOT_FOUND' },
          })
        }
        if (gamePlayer.gridId !== square.gridId) {
          throw new GraphQLError('Game player does not belong to this grid', {
            extensions: { code: 'BAD_REQUEST' },
          })
        }
        data.gamePlayerId = args.input.gamePlayerId
      }
    }

    return context.prisma.square.update({
      where: { id: args.id },
      data,
    })
  }
