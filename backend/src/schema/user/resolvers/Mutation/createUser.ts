import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

export const createUser: NonNullable<MutationResolvers['createUser']> = async (
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
    id: 'temp-user',
    email: _arg.email,
  }
}
