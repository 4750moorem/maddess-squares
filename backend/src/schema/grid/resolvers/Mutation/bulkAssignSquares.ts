import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const bulkAssignSquares: NonNullable<MutationResolvers['bulkAssignSquares']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  const { squareIds, gamePlayerId } = args.input

  if (squareIds.length === 0) {
    return []
  }

  const squares = await context.prisma.square.findMany({
    where: { id: { in: squareIds } },
  })

  if (squares.length !== squareIds.length) {
    throw new GraphQLError('One or more squares not found', {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  const gridIds = new Set(squares.map((s) => s.gridId))
  if (gridIds.size !== 1) {
    throw new GraphQLError('All squares must belong to the same grid', {
      extensions: { code: 'BAD_REQUEST' },
    })
  }

  const gamePlayer = await context.prisma.gamePlayer.findUnique({
    where: { id: gamePlayerId },
  })

  if (!gamePlayer) {
    throw new GraphQLError('Game player not found', {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  const squareGridId = squares[0]!.gridId
  if (gamePlayer.gridId !== squareGridId) {
    throw new GraphQLError('Game player does not belong to this grid', {
      extensions: { code: 'BAD_REQUEST' },
    })
  }

  return context.prisma.$transaction(
    squareIds.map((id) =>
      context.prisma.square.update({
        where: { id },
        data: { gamePlayerId },
      }),
    ),
  )
}
