import type { GridResolvers } from './../../types.generated'

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
    return grid!.creator
  },
}
