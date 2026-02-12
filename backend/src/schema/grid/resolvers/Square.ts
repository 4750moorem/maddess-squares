import type { SquareResolvers } from './../../types.generated'

export const Square: SquareResolvers = {
  gamePlayer: async (parent, _args, context) => {
    if (!parent.gamePlayerId) return null
    return context.prisma.gamePlayer.findUnique({
      where: { id: String(parent.gamePlayerId) },
    })
  },
}
