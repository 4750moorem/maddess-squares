import type { QueryResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const user: NonNullable<QueryResolvers['user']> = async (
  _parent,
  _arg,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  return {
    id: _arg.id,
    email: 'user@example.com',
  }
}
