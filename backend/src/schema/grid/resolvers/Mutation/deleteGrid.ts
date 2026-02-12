import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const deleteGrid: NonNullable<MutationResolvers['deleteGrid']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  await context.prisma.grid.delete({
    where: { id: args.id },
  })

  return true
}
