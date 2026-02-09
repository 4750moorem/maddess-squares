import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Grid,
  type SquareType,
} from '@/components/Grid'
import {
  useMyGamesQuery,
  useMeQuery,
  useCreateGameMutation,
  useGameGridQuery,
  useCreateGridMutation,
  useAssignGridToGameMutation,
  MyGamesDocument,
  type MyGamesQuery,
} from '@/graphql/generated'


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
        <div className="mx-auto px-6 py-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    March Madness Squares
                  </p>
                  <h1 className="text-3xl font-semibold">My Games</h1>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedGameId ?? ''}
                    onChange={(e) => setSelectedGameId(e.target.value || null)}
                    className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select a game</option>
                    {gamesData?.myGames.map((game) => (
                      <option key={game.id} value={game.id}>
                        {game.name} ({getUserRole(game)})
                      </option>
                    ))}
                  </select>
                  <Button size="sm" onClick={() => setShowCreateForm(!showCreateForm)}>
                    {showCreateForm ? 'Cancel' : 'Create Game'}
                  </Button>
                </div>
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

            {selectedGameId && (
              <div>
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
                    <Grid
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

            {!selectedGameId && (
              <div className="py-12 text-center text-muted-foreground">
                {gamesLoading
                  ? 'Loading games...'
                  : !gamesData?.myGames?.length
                    ? 'No games yet. Create your first game!'
                    : 'Select a game from the dropdown above.'}
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
