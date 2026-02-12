import type { QueryResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const myGrids: NonNullable<QueryResolvers['myGrids']> = async (
  _parent,
  _args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  const user = await context.prisma.user.findUnique({
    where: { firebaseUserId: context.user.uid },
    include: {
      ownedGrids: true,
      playerGames: {
        include: { grid: true },
      },
    },
  })

  if (!user) {
    return []
  }

  const ownedGrids = user.ownedGrids
  const playerGrids = user.playerGames.map((pg) => pg.grid)

  const allGrids = [...ownedGrids, ...playerGrids]
  const uniqueGrids = allGrids.filter(
    (grid, index, self) => self.findIndex((g) => g.id === grid.id) === index,
  )

  return uniqueGrids
}
