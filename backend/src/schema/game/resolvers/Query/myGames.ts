import type { QueryResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const myGames: NonNullable<QueryResolvers['myGames']> = async (
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
      ownedGames: true,
      playerGames: {
        include: { game: true },
      },
    },
  })

  if (!user) {
    return []
  }

  const ownedGames = user.ownedGames
  const playerGames = user.playerGames.map((pg) => pg.game)

  const allGames = [...ownedGames, ...playerGames]
  const uniqueGames = allGames.filter(
    (game, index, self) => self.findIndex((g) => g.id === game.id) === index,
  )

  return uniqueGames
}
