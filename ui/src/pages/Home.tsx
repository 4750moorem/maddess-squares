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
        {/* Top bar */}
        <header className="border-b-2 border-border bg-card">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Maddess Squares
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-muted-foreground">
                {user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-10">
          <div className="space-y-8">
            {/* Page heading */}
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">My Games</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your pools and view grids
                </p>
              </div>
              <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? 'Cancel' : '+ New Game'}
              </Button>
            </div>

            {/* Create game form */}
            {showCreateForm && (
              <div className="retro-card p-6">
                <h2 className="mb-4 text-lg font-bold">Create New Game</h2>
                <form onSubmit={handleCreateGame} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="gameName"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Game Name
                    </label>
                    <input
                      id="gameName"
                      type="text"
                      value={gameName}
                      onChange={(e) => setGameName(e.target.value)}
                      required
                      className="retro-input w-full"
                      placeholder="Enter game name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="gameDescription"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Description (optional)
                    </label>
                    <input
                      id="gameDescription"
                      type="text"
                      value={gameDescription}
                      onChange={(e) => setGameDescription(e.target.value)}
                      className="retro-input w-full"
                      placeholder="Enter description"
                    />
                  </div>
                  <Button type="submit" disabled={createGameLoading}>
                    {createGameLoading ? 'Creating...' : 'Create Game'}
                  </Button>
                </form>
              </div>
            )}

            {/* Games table */}
            <div className="retro-card overflow-hidden">
              {gamesLoading ? (
                <div className="p-8 text-center text-muted-foreground">
                  Loading games...
                </div>
              ) : !gamesData?.myGames?.length ? (
                <div className="p-8 text-center text-muted-foreground">
                  No games yet. Create your first game!
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border bg-muted/50">
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {gamesData.myGames.map((game) => (
                      <tr
                        key={game.id}
                        onClick={() => setSelectedGameId(game.id)}
                        className={`cursor-pointer border-b-2 border-border last:border-b-0 transition-colors hover:bg-primary/5 ${
                          selectedGameId === game.id
                            ? 'bg-primary/10'
                            : ''
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-semibold">
                          {game.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {game.description || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-sm border px-2 py-0.5 font-mono text-xs font-semibold uppercase ${
                              getUserRole(game) === 'Owner'
                                ? 'border-primary/30 bg-primary/10 text-primary'
                                : 'border-border bg-muted text-muted-foreground'
                            }`}
                          >
                            {getUserRole(game)}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                          {new Date(game.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Grid section */}
            {selectedGameId && (
              <div className="retro-card p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold">
                    Grid for{' '}
                    <span className="text-primary">{selectedGame?.name}</span>
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
          </div>
        </main>
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
              <span className="font-mono font-semibold text-foreground">
                {selectedSquare?.rowValue}
              </span>{' '}
              and the losing team&apos;s score ends in{' '}
              <span className="font-mono font-semibold text-foreground">
                {selectedSquare?.columnValue}
              </span>
              .
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}

export default Home
