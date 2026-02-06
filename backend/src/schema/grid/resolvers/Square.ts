import type { SquareResolvers } from './../../types.generated'

export const Square: SquareResolvers = {
  player: async (parent, _args, context) => {
    if (!parent.playerId) {
      return null
    }
    return context.prisma.user.findUnique({
      where: { id: String(parent.playerId) },
    })
  },
}
