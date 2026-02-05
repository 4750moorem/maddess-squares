import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const deleteUser: NonNullable<MutationResolvers['deleteUser']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  await context.prisma.user.delete({
    where: { id: args.id },
  })

  return true
}
