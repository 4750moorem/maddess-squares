
import type { MutationResolvers } from './../../../types.generated'

export const createUser: NonNullable<MutationResolvers['createUser']> = async (
  _parent,
  _arg,
) => {
  return {
    id: 'temp-user',
    email: _arg.email,
  }
}