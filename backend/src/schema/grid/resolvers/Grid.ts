import type { GridResolvers } from './../../types.generated'
import { GraphQLError } from 'graphql'

export const Grid: GridResolvers = {
  squares: async (parent, _args, context) => {
    return context.prisma.square.findMany({
      where: { gridId: String(parent.id) },
    })
  },
  creator: async (parent, _args, context) => {
    const grid = await context.prisma.grid.findUnique({
      where: { id: String(parent.id) },
      include: { creator: true },
    })
    if (!grid) throw new GraphQLError('Grid not found', { extensions: { code: 'NOT_FOUND' } })
    return grid.creator
  },
  owners: async (parent, _args, context) => {
    const grid = await context.prisma.grid.findUnique({
      where: { id: String(parent.id) },
      include: { owners: true },
    })
    return grid?.owners ?? []
  },
  players: async (parent, _args, context) => {
    return context.prisma.gamePlayer.findMany({
      where: { gridId: String(parent.id) },
    })
  },
}
