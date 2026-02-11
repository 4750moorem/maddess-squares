import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'
import { publish } from '../../../../lib/pubsub'

export const createNotification: NonNullable<MutationResolvers['createNotification']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  const notification = await context.prisma.notification.create({
    data: {
      userId: args.input.userId,
      actionType: args.input.actionType,
      iconType: args.input.iconType,
      title: args.input.title,
      description: args.input.description,
      metadata: args.input.metadata ?? undefined,
      gameId: args.input.gameId ?? undefined,
      triggeredByUserId: args.input.triggeredByUserId ?? undefined,
      read: false,
    },
  })

  publish(`NOTIFICATION_ADDED:${notification.userId}`, notification)

  return notification
}
