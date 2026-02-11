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
  useBulkAddPlayersMutation,
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
  const [showAddPlayers, setShowAddPlayers] = useState(false)
  const [players, setPlayers] = useState([
    { firstName: '', lastName: '', email: '', phoneNumber: '' },
  ])
  const [bulkAddPlayers, { loading: addingPlayers }] = useBulkAddPlayersMutation()

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

  const addPlayerRow = () => {
    setPlayers([...players, { firstName: '', lastName: '', email: '', phoneNumber: '' }])
  }

  const removePlayerRow = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index))
  }

  const updatePlayer = (index: number, field: 'firstName' | 'lastName' | 'email' | 'phoneNumber', value: string) => {
    const updated = [...players]
    updated[index] = { ...updated[index], [field]: value }
    setPlayers(updated)
  }

  const handleBulkAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGameId) return

    const validPlayers = players.filter((p) => p.firstName.trim() && p.lastName.trim())
    if (validPlayers.length === 0) return

    await bulkAddPlayers({
      variables: {
        input: {
          gameId: selectedGameId,
          players: validPlayers,
        },
      },
      refetchQueries: [{ query: MyGamesDocument }],
    })

    setPlayers([{ firstName: '', lastName: '', email: '', phoneNumber: '' }])
    setShowAddPlayers(false)
  }

  const getUserRole = (game: MyGamesQuery['myGames'][number]) => {
    const currentUserId = meData?.me?.id
    if (!currentUserId) return 'Unknown'

    const isOwner = game.owners.some(
      (owner: { id: string }) => owner.id === currentUserId,
    )
    if (isOwner) return 'Owner'

    const isPlayer = game.players.some(
      (player) => player.user?.id === currentUserId,
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

            {selectedGameId && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">
                    Grid for {selectedGame?.name}
                  </h2>
                  <div className="flex items-center gap-2">
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
                    {isGameOwner && gridData?.game?.grid && (
                      <Button
                        onClick={() => setShowAddPlayers(!showAddPlayers)}
                        size="sm"
                        variant="outline"
                      >
                        {showAddPlayers ? 'Cancel' : 'Add Players'}
                      </Button>
                    )}
                  </div>
                </div>

                {showAddPlayers && (
                  <div className="retro-card p-6">
                    <h3 className="mb-4 text-lg font-bold">Add Players</h3>
                    <form onSubmit={handleBulkAdd} className="space-y-4">
                      {players.map((player, idx) => (
                        <div key={idx} className="relative space-y-2 rounded border border-border p-4">
                          {players.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removePlayerRow(idx)}
                              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                            >
                              X
                            </button>
                          )}
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={player.firstName}
                              onChange={(e) => updatePlayer(idx, 'firstName', e.target.value)}
                              className="retro-input"
                              placeholder="First Name *"
                              required
                            />
                            <input
                              type="text"
                              value={player.lastName}
                              onChange={(e) => updatePlayer(idx, 'lastName', e.target.value)}
                              className="retro-input"
                              placeholder="Last Name *"
                              required
                            />
                          </div>
                          <input
                            type="email"
                            value={player.email}
                            onChange={(e) => updatePlayer(idx, 'email', e.target.value)}
                            className="retro-input w-full"
                            placeholder="Email (optional)"
                          />
                          <input
                            type="tel"
                            value={player.phoneNumber}
                            onChange={(e) => updatePlayer(idx, 'phoneNumber', e.target.value)}
                            className="retro-input w-full"
                            placeholder="Phone Number (optional)"
                          />
                        </div>
                      ))}
                      <p className="text-xs text-muted-foreground">
                        * Required fields. If email or phone number is provided, an invite will be sent.
                      </p>
                      <div className="flex gap-2">
                        <Button type="button" onClick={addPlayerRow} variant="outline">
                          Add Another Player
                        </Button>
                        <Button type="submit" disabled={addingPlayers}>
                          {addingPlayers ? 'Adding...' : 'Add Players'}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

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
