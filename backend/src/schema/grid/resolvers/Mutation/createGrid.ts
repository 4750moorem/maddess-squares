import type { MutationResolvers } from './../../../types.generated'
import { GraphQLError } from 'graphql'

function shuffleArray(array: number[]): number[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i] as number
    shuffled[i] = shuffled[j] as number
    shuffled[j] = temp
  }
  return shuffled
}

export const createGrid: NonNullable<MutationResolvers['createGrid']> = async (
  _parent,
  args,
  context,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  const user = await context.prisma.user.findUnique({
    where: { firebaseUserId: context.user.uid },
  })

  if (!user) {
    throw new GraphQLError('User not found', {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  const rowOrder = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  const columnOrder = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  return context.prisma.grid.create({
    data: {
      name: args.input.name,
      description: args.input.description,
      creatorId: user.id,
      owners: {
        connect: { id: user.id },
      },
      rowOrder,
      columnOrder,
      squares: {
        create: Array.from({ length: 10 }, (_, rowIndex) =>
          Array.from({ length: 10 }, (_, columnIndex) => ({
            rowIndex,
            columnIndex,
            rowValue: rowOrder[rowIndex] as number,
            columnValue: columnOrder[columnIndex] as number,
          })),
        ).flat(),
      },
    },
  })
}
