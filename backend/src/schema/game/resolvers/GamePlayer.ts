import type { GamePlayerResolvers } from './../../types.generated'

export const GamePlayer: GamePlayerResolvers = {
  game: async (parent, _args, context) => {
    const gamePlayer = await context.prisma.gamePlayer.findUnique({
      where: { id: String(parent.id) },
      include: { game: true },
    })
    if (!gamePlayer?.game) {
      throw new Error('Game not found')
    }
    return gamePlayer.game
  },
  user: async (parent, _args, context) => {
    const gamePlayer = await context.prisma.gamePlayer.findUnique({
      where: { id: String(parent.id) },
      include: { user: true },
    })
    if (!gamePlayer?.user) {
      throw new Error('User not found')
    }
    return gamePlayer.user
  },
}
