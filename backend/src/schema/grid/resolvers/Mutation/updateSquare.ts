import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const updateSquare: NonNullable<MutationResolvers['updateSquare']> =
  async (_parent, args, context) => {
    if (!context.user) {
      throw new GraphQLError('Unauthorized', {
        extensions: { code: 'UNAUTHORIZED' },
      })
    }

    const user = await context.prisma.user.findUnique({
      where: { firebaseUserId: context.user.uid },
    })

    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: { code: 'NOT_FOUND' },
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

    if (square.playerId !== user.id) {
      throw new GraphQLError('You can only update squares you own', {
        extensions: { code: 'FORBIDDEN' },
      })
    }

    return context.prisma.square.update({
      where: { id: args.id },
      data: {},
    })
  }
