import type { GameResolvers } from './../../types.generated'

export const Game: GameResolvers = {
  owners: async (parent, _args, context) => {
    const game = await context.prisma.game.findUnique({
      where: { id: String(parent.id) },
      include: { owners: true },
    })
    return game?.owners ?? []
  },
  players: async (parent, _args, context) => {
    return context.prisma.gamePlayer.findMany({
      where: { gameId: String(parent.id) },
    })
  },
}
