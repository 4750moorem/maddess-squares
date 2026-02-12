import type { UserResolvers } from './../../types.generated'

export const User: UserResolvers = {
  ownedGrids: async (parent, _args, context) => {
    const user = await context.prisma.user.findUnique({
      where: { id: String(parent.id) },
      include: { ownedGrids: true },
    })
    return user?.ownedGrids ?? []
  },
  playerGames: async (parent, _args, context) => {
    return context.prisma.gamePlayer.findMany({
      where: { userId: String(parent.id) },
    })
  },
}
