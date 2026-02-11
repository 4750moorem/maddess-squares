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
    if (!parent.userId) return null
    const gamePlayer = await context.prisma.gamePlayer.findUnique({
      where: { id: String(parent.id) },
      include: { user: true },
    })
    return gamePlayer?.user ?? null
  },
  tempPlayer: async (parent, _args, context) => {
    if (!parent.tempUserId) return null
    const gamePlayer = await context.prisma.gamePlayer.findUnique({
      where: { id: String(parent.id) },
      include: { tempPlayer: true },
    })
    return gamePlayer?.tempPlayer ?? null
  },
  email: async (parent, _args, context) => {
    const gamePlayer = await context.prisma.gamePlayer.findUnique({
      where: { id: String(parent.id) },
      include: { user: true, tempPlayer: true },
    })
    return gamePlayer?.user?.email ?? gamePlayer?.tempPlayer?.email ?? null
  },
  phoneNumber: async (parent, _args, context) => {
    const gamePlayer = await context.prisma.gamePlayer.findUnique({
      where: { id: String(parent.id) },
      include: { user: true, tempPlayer: true },
    })
    return gamePlayer?.user?.phoneNumber ?? gamePlayer?.tempPlayer?.phoneNumber ?? null
  },
  fullName: async (parent, _args, context) => {
    const gamePlayer = await context.prisma.gamePlayer.findUnique({
      where: { id: String(parent.id) },
      include: { user: true, tempPlayer: true },
    })
    if (gamePlayer?.tempPlayer) {
      return `${gamePlayer.tempPlayer.firstName} ${gamePlayer.tempPlayer.lastName}`
    }
    return gamePlayer?.user?.displayName ?? null
  },
  displayName: async (parent, _args, context) => {
    const gamePlayer = await context.prisma.gamePlayer.findUnique({
      where: { id: String(parent.id) },
      include: { user: true, tempPlayer: true },
    })
    if (gamePlayer?.user?.displayName) return gamePlayer.user.displayName
    if (gamePlayer?.tempPlayer) {
      return `${gamePlayer.tempPlayer.firstName} ${gamePlayer.tempPlayer.lastName}`
    }
    return null
  },
}
