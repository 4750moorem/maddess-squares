import type { SubscriptionResolvers } from './../../../types.generated'
import type { Notification } from '../../../../generated/prisma/client'
import { subscribe } from '../../../../lib/pubsub'

export const notificationAdded: NonNullable<SubscriptionResolvers['notificationAdded']> = {
  subscribe: (_parent, args) => {
    return subscribe<Notification>(`NOTIFICATION_ADDED:${args.userId}`)
  },
  resolve: (payload: Notification) => {
    return payload
  },
}
