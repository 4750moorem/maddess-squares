import type { GamePlayerResolvers } from './../../types.generated'

export const GamePlayer: GamePlayerResolvers = {
  email: async (parent, _args, context) => {
    if (!parent.userId) return null
    const user = await context.prisma.user.findUnique({
      where: { id: parent.userId },
    })
    return user?.email ?? null
  },
  phoneNumber: async (parent, _args, context) => {
    if (!parent.userId) return null
    const user = await context.prisma.user.findUnique({
      where: { id: parent.userId },
    })
    return user?.phoneNumber ?? null
  },
  fullName: async (parent, _args, context) => {
    if (parent.tempUserId) {
      const tempPlayer = await context.prisma.tempPlayer.findUnique({
        where: { id: parent.tempUserId },
      })
      if (tempPlayer) return `${tempPlayer.firstName} ${tempPlayer.lastName}`
    }
    if (parent.userId) {
      const user = await context.prisma.user.findUnique({
        where: { id: parent.userId },
      })
      return user?.displayName ?? null
    }
    return null
  },
  displayName: async (parent, _args, context) => {
    if (parent.userId) {
      const user = await context.prisma.user.findUnique({
        where: { id: parent.userId },
      })
      if (user?.displayName) return user.displayName
    }
    if (parent.tempUserId) {
      const tempPlayer = await context.prisma.tempPlayer.findUnique({
        where: { id: parent.tempUserId },
      })
      if (tempPlayer) return `${tempPlayer.firstName} ${tempPlayer.lastName}`
    }
    return null
  },
}
