import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  useMyGamesQuery,
  useMeQuery,
  useCreateGameMutation,
  useGameGridQuery,
  useCreateGridMutation,
  useAssignGridToGameMutation,
  MyGamesDocument,
  type MyGamesQuery,
  type GameGridQuery,
} from '@/graphql/generated'

type SquareType = NonNullable<
  NonNullable<NonNullable<GameGridQuery['game']>['grid']>['squares']
>[number]

function getInitials(displayName?: string | null, email?: string | null): string {
  if (displayName) {
    const parts = displayName.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
    }
    return displayName.slice(0, 2).toUpperCase()
  }
  if (email) {
    return email.slice(0, 2).toUpperCase()
  }
  return '??'
}

function GridSquare({
  square,
  currentUserId,
  onSquareClick,
}: {
  square: SquareType
  currentUserId?: string
  onSquareClick: (square: SquareType) => void
}) {
  const isOwner = square.player?.id === currentUserId
  const playerName = square.player?.displayName || square.player?.email || null
  const initials = square.player ? getInitials(square.player.displayName, square.player.email) : null

  const handleClick = () => {
    if (isOwner) {
      onSquareClick(square)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleClick}
          className={`flex h-10 w-10 items-center justify-center border border-border text-xs transition-colors ${
            isOwner
              ? 'cursor-pointer bg-primary/20 hover:bg-primary/30'
              : square.player
                ? 'cursor-default bg-muted/50'
                : 'cursor-default bg-card'
          }`}
        >
          {initials && (
            <span className="text-[10px] font-medium text-muted-foreground">
              {initials}
            </span>
          )}
        </button>
      </TooltipTrigger>
      {playerName && (
        <TooltipContent>
          <p>{playerName}</p>
        </TooltipContent>
      )}
    </Tooltip>
  )
}

function MarchMadnessGrid({
  grid,
  currentUserId,
  onSquareClick,
}: {
  grid: NonNullable<NonNullable<GameGridQuery['game']>['grid']>
  currentUserId?: string
  onSquareClick: (square: SquareType) => void
}) {
  const squaresByPosition = new Map<string, SquareType>()
  for (const square of grid.squares) {
    squaresByPosition.set(`${square.rowIndex}-${square.columnIndex}`, square)
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block">
        <div className="flex">
          <div className="flex h-10 w-10 items-center justify-center border border-transparent" />
          {grid.columnOrder.map((colValue, colIndex) => (
            <div
              key={colIndex}
              className="flex h-10 w-10 items-center justify-center border border-border bg-muted font-medium"
            >
              {colValue}
            </div>
          ))}
        </div>
        {grid.rowOrder.map((rowValue, rowIndex) => (
          <div key={rowIndex} className="flex">
            <div className="flex h-10 w-10 items-center justify-center border border-border bg-muted font-medium">
              {rowValue}
            </div>
            {grid.columnOrder.map((_, colIndex) => {
              const square = squaresByPosition.get(`${rowIndex}-${colIndex}`)
              if (!square) return <div key={colIndex} className="h-10 w-10 border border-border" />
              return (
                <GridSquare
                  key={square.id}
                  square={square}
                  currentUserId={currentUserId}
                  onSquareClick={onSquareClick}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function Home() {
  const { user, signOut } = useAuth()
  const { data: meData } = useMeQuery()
  const { data: gamesData, loading: gamesLoading } = useMyGamesQuery()
  const [createGame, { loading: createGameLoading }] = useCreateGameMutation()
  const [createGrid, { loading: createGridLoading }] = useCreateGridMutation()
  const [assignGridToGame, { loading: assignGridLoading }] = useAssignGridToGameMutation()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [gameName, setGameName] = useState('')
  const [gameDescription, setGameDescription] = useState('')
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
  const [selectedSquare, setSelectedSquare] = useState<SquareType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: gridData, loading: gridLoading } = useGameGridQuery({
    variables: { id: selectedGameId ?? '' },
    skip: !selectedGameId,
  })

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gameName.trim()) return

    await createGame({
      variables: {
        input: {
          name: gameName.trim(),
          description: gameDescription.trim() || undefined,
        },
      },
      refetchQueries: [{ query: MyGamesDocument }],
    })

    setGameName('')
    setGameDescription('')
    setShowCreateForm(false)
  }

  const handleCreateAndAssignGrid = async () => {
    if (!selectedGameId) return

    const result = await createGrid()
    const newGridId = result.data?.createGrid?.id
    if (newGridId) {
      await assignGridToGame({
        variables: {
          input: {
            gridId: newGridId,
            gameId: selectedGameId,
          },
        },
        refetchQueries: [{ query: MyGamesDocument }],
      })
    }
  }

  const handleSquareClick = (square: SquareType) => {
    setSelectedSquare(square)
    setIsModalOpen(true)
  }

  const getUserRole = (game: MyGamesQuery['myGames'][number]) => {
    const currentUserId = meData?.me?.id
    if (!currentUserId) return 'Unknown'

    const isOwner = game.owners.some(
      (owner: { id: string }) => owner.id === currentUserId,
    )
    if (isOwner) return 'Owner'

    const isPlayer = game.players.some(
      (player: { user: { id: string } }) => player.user.id === currentUserId,
    )
    if (isPlayer) return 'Player'

    return 'Unknown'
  }

  const selectedGame = gamesData?.myGames.find((g) => g.id === selectedGameId)
  const isGameOwner = selectedGame
    ? selectedGame.owners.some((owner) => owner.id === meData?.me?.id)
    : false

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  March Madness Squares
                </p>
                <h1 className="text-3xl font-semibold">My Games</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {user?.email}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? 'Cancel' : 'Create Game'}
              </Button>
            </div>

            {showCreateForm && (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-medium">Create New Game</h2>
                <form onSubmit={handleCreateGame} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="gameName"
                      className="text-sm font-medium text-foreground"
                    >
                      Game Name
                    </label>
                    <input
                      id="gameName"
                      type="text"
                      value={gameName}
                      onChange={(e) => setGameName(e.target.value)}
                      required
                      className="w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Enter game name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="gameDescription"
                      className="text-sm font-medium text-foreground"
                    >
                      Description (optional)
                    </label>
                    <input
                      id="gameDescription"
                      type="text"
                      value={gameDescription}
                      onChange={(e) => setGameDescription(e.target.value)}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Enter description"
                    />
                  </div>
                  <Button type="submit" disabled={createGameLoading}>
                    {createGameLoading ? 'Creating...' : 'Create Game'}
                  </Button>
                </form>
              </div>
            )}

            <div className="rounded-lg border border-border bg-card">
              {gamesLoading ? (
                <div className="p-6 text-center text-muted-foreground">
                  Loading games...
                </div>
              ) : !gamesData?.myGames?.length ? (
                <div className="p-6 text-center text-muted-foreground">
                  No games yet. Create your first game!
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {gamesData.myGames.map((game) => (
                      <tr
                        key={game.id}
                        onClick={() => setSelectedGameId(game.id)}
                        className={`cursor-pointer border-b border-border last:border-b-0 transition-colors hover:bg-muted/50 ${
                          selectedGameId === game.id ? 'bg-muted/30' : ''
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-medium">
                          {game.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {game.description || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              getUserRole(game) === 'Owner'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {getUserRole(game)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(game.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {selectedGameId && (
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">
                    Grid for {selectedGame?.name}
                  </h2>
                  {isGameOwner && !gridData?.game?.grid && (
                    <Button
                      onClick={handleCreateAndAssignGrid}
                      disabled={createGridLoading || assignGridLoading}
                      size="sm"
                    >
                      {createGridLoading || assignGridLoading
                        ? 'Creating...'
                        : 'Create Grid'}
                    </Button>
                  )}
                </div>

                {gridLoading ? (
                  <div className="text-center text-muted-foreground">
                    Loading grid...
                  </div>
                ) : gridData?.game?.grid ? (
                  <div className="flex justify-center">
                    <MarchMadnessGrid
                      grid={gridData.game.grid}
                      currentUserId={meData?.me?.id}
                      onSquareClick={handleSquareClick}
                    />
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    No grid assigned to this game yet.
                    {isGameOwner && ' Click "Create Grid" to create one.'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Square Details</DialogTitle>
            <DialogDescription>
              {selectedSquare && (
                <>
                  Position: Row {selectedSquare.rowValue}, Column{' '}
                  {selectedSquare.columnValue}
                  <br />
                  Owner:{' '}
                  {selectedSquare.player?.displayName ||
                    selectedSquare.player?.email ||
                    'Unclaimed'}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This square will win when the winning team&apos;s score ends in{' '}
              {selectedSquare?.rowValue} and the losing team&apos;s score ends in{' '}
              {selectedSquare?.columnValue}.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}

export default Home
