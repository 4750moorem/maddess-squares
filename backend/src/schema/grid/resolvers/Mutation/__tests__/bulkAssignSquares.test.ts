import { describe, it, expect, beforeEach } from 'bun:test'
import { bulkAssignSquares } from '../bulkAssignSquares'
import { GraphQLError } from 'graphql'

function createMockPrisma(overrides: Record<string, unknown> = {}) {
  return {
    square: {
      findMany: overrides.findMany ?? (() => Promise.resolve([])),
      update: overrides.update ?? ((args: { where: { id: string }; data: { gamePlayerId: string } }) => Promise.resolve({ id: args.where.id, ...args.data })),
    },
    gamePlayer: {
      findUnique: overrides.findUnique ?? (() => Promise.resolve(null)),
    },
    $transaction: overrides.$transaction ?? ((promises: Promise<unknown>[]) => Promise.all(promises)),
  }
}

function createContext(user: { uid: string; email: string } | null, prisma: ReturnType<typeof createMockPrisma>) {
  return { user, prisma } as never
}

const gridId = 'grid-1'
const squareBase = { gridId, rowIndex: 0, columnIndex: 0, rowValue: 0, columnValue: 0, gamePlayerId: null }

describe('bulkAssignSquares', () => {
  let mockSquares: Array<typeof squareBase & { id: string }>
  let mockGamePlayer: { id: string; gridId: string }

  beforeEach(() => {
    mockSquares = [
      { ...squareBase, id: 'sq-1', rowIndex: 0, columnIndex: 0 },
      { ...squareBase, id: 'sq-2', rowIndex: 0, columnIndex: 1 },
      { ...squareBase, id: 'sq-3', rowIndex: 1, columnIndex: 0 },
    ]
    mockGamePlayer = { id: 'gp-1', gridId }
  })

  it('should assign a player to multiple squares successfully', async () => {
    const updatedSquares = mockSquares.map((s) => ({ ...s, gamePlayerId: 'gp-1' }))
    let transactionCalls: unknown[][] = []

    const prisma = createMockPrisma({
      findMany: () => Promise.resolve(mockSquares),
      findUnique: () => Promise.resolve(mockGamePlayer),
      update: (args: { where: { id: string }; data: { gamePlayerId: string } }) => {
        const sq = updatedSquares.find((s) => s.id === args.where.id)
        return Promise.resolve(sq)
      },
      $transaction: (promises: Promise<unknown>[]) => {
        transactionCalls.push(promises)
        return Promise.all(promises)
      },
    })

    const context = createContext({ uid: 'user-1', email: 'test@test.com' }, prisma)
    const result = await bulkAssignSquares(
      {} as never,
      { input: { squareIds: ['sq-1', 'sq-2', 'sq-3'], gamePlayerId: 'gp-1' } },
      context,
      {} as never,
    )

    expect(result).toHaveLength(3)
    expect(result[0]!.gamePlayerId).toBe('gp-1')
    expect(result[1]!.gamePlayerId).toBe('gp-1')
    expect(result[2]!.gamePlayerId).toBe('gp-1')
    expect(transactionCalls).toHaveLength(1)
  })

  it('should throw UNAUTHORIZED when user is not authenticated', async () => {
    const prisma = createMockPrisma()
    const context = createContext(null, prisma)

    try {
      await bulkAssignSquares(
        {} as never,
        { input: { squareIds: ['sq-1'], gamePlayerId: 'gp-1' } },
        context,
        {} as never,
      )
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError)
      expect((error as GraphQLError).extensions?.code).toBe('UNAUTHORIZED')
    }
  })

  it('should return empty array for empty squareIds', async () => {
    const prisma = createMockPrisma()
    const context = createContext({ uid: 'user-1', email: 'test@test.com' }, prisma)

    const result = await bulkAssignSquares(
      {} as never,
      { input: { squareIds: [], gamePlayerId: 'gp-1' } },
      context,
      {} as never,
    )

    expect(result).toEqual([])
  })

  it('should throw NOT_FOUND when squares do not exist', async () => {
    const prisma = createMockPrisma({
      findMany: () => Promise.resolve([mockSquares[0]]),
    })
    const context = createContext({ uid: 'user-1', email: 'test@test.com' }, prisma)

    try {
      await bulkAssignSquares(
        {} as never,
        { input: { squareIds: ['sq-1', 'sq-nonexistent'], gamePlayerId: 'gp-1' } },
        context,
        {} as never,
      )
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError)
      expect((error as GraphQLError).extensions?.code).toBe('NOT_FOUND')
      expect((error as GraphQLError).message).toBe('One or more squares not found')
    }
  })

  it('should throw NOT_FOUND when game player does not exist', async () => {
    const prisma = createMockPrisma({
      findMany: () => Promise.resolve(mockSquares),
      findUnique: () => Promise.resolve(null),
    })
    const context = createContext({ uid: 'user-1', email: 'test@test.com' }, prisma)

    try {
      await bulkAssignSquares(
        {} as never,
        { input: { squareIds: ['sq-1', 'sq-2', 'sq-3'], gamePlayerId: 'gp-nonexistent' } },
        context,
        {} as never,
      )
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError)
      expect((error as GraphQLError).extensions?.code).toBe('NOT_FOUND')
      expect((error as GraphQLError).message).toBe('Game player not found')
    }
  })

  it('should throw BAD_REQUEST when game player belongs to a different grid', async () => {
    const differentGridPlayer = { id: 'gp-other', gridId: 'grid-other' }
    const prisma = createMockPrisma({
      findMany: () => Promise.resolve(mockSquares),
      findUnique: () => Promise.resolve(differentGridPlayer),
    })
    const context = createContext({ uid: 'user-1', email: 'test@test.com' }, prisma)

    try {
      await bulkAssignSquares(
        {} as never,
        { input: { squareIds: ['sq-1', 'sq-2', 'sq-3'], gamePlayerId: 'gp-other' } },
        context,
        {} as never,
      )
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError)
      expect((error as GraphQLError).extensions?.code).toBe('BAD_REQUEST')
      expect((error as GraphQLError).message).toBe('Game player does not belong to this grid')
    }
  })

  it('should throw BAD_REQUEST when squares belong to different grids', async () => {
    const mixedSquares = [
      { ...squareBase, id: 'sq-1', gridId: 'grid-1' },
      { ...squareBase, id: 'sq-2', gridId: 'grid-2' },
    ]
    const prisma = createMockPrisma({
      findMany: () => Promise.resolve(mixedSquares),
    })
    const context = createContext({ uid: 'user-1', email: 'test@test.com' }, prisma)

    try {
      await bulkAssignSquares(
        {} as never,
        { input: { squareIds: ['sq-1', 'sq-2'], gamePlayerId: 'gp-1' } },
        context,
        {} as never,
      )
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError)
      expect((error as GraphQLError).extensions?.code).toBe('BAD_REQUEST')
      expect((error as GraphQLError).message).toBe('All squares must belong to the same grid')
    }
  })

  it('should use a transaction for atomicity', async () => {
    let transactionFn: ((promises: Promise<unknown>[]) => Promise<unknown[]>) | null = null

    const prisma = createMockPrisma({
      findMany: () => Promise.resolve(mockSquares),
      findUnique: () => Promise.resolve(mockGamePlayer),
      update: (args: { where: { id: string }; data: { gamePlayerId: string } }) =>
        Promise.resolve({ ...squareBase, id: args.where.id, gamePlayerId: args.data.gamePlayerId }),
      $transaction: (promises: Promise<unknown>[]) => {
        transactionFn = () => Promise.all(promises)
        return Promise.all(promises)
      },
    })

    const context = createContext({ uid: 'user-1', email: 'test@test.com' }, prisma)
    await bulkAssignSquares(
      {} as never,
      { input: { squareIds: ['sq-1', 'sq-2', 'sq-3'], gamePlayerId: 'gp-1' } },
      context,
      {} as never,
    )

    expect(transactionFn).not.toBeNull()
  })
})
