import type { QueryResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const grid: NonNullable<QueryResolvers['grid']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  return context.prisma.grid.findUnique({
    where: { id: args.id },
  })
}
