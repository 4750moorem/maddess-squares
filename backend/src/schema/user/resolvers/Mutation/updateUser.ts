import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const updateUser: NonNullable<MutationResolvers['updateUser']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  return context.prisma.user.update({
    where: { id: args.id },
    data: {
      email: args.input.email,
      phoneNumber: args.input.phoneNumber,
      displayName: args.input.displayName,
    },
  })
}
