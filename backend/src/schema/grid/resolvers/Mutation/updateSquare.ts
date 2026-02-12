import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const updateSquare: NonNullable<MutationResolvers['updateSquare']> =
  async (_parent, args, context) => {
    if (!context.user) {
      throw new GraphQLError('Unauthorized', {
        extensions: { code: 'UNAUTHORIZED' },
      })
    }

    const square = await context.prisma.square.findUnique({
      where: { id: args.id },
    })

    if (!square) {
      throw new GraphQLError('Square not found', {
        extensions: { code: 'NOT_FOUND' },
      })
    }

    return context.prisma.square.update({
      where: { id: args.id },
      data: {},
    })
  }
