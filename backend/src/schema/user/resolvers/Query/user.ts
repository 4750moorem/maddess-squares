
import type { QueryResolvers } from './../../../types.generated'

export const user: NonNullable<QueryResolvers['user']> = async (
  _parent,
  _arg,
) => {
  return {
    id: _arg.id,
    email: 'user@example.com',
  }
}