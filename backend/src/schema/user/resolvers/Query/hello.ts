
import type { QueryResolvers } from './../../../types.generated'

export const hello: NonNullable<QueryResolvers['hello']> = async () => {
  return 'March Madness Squares API'
}