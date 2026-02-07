import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import {
  useMyGamesQuery,
  useMeQuery,
  useCreateGameMutation,
  MyGamesDocument,
  type MyGamesQuery,
} from '@/graphql/generated'
import { toast } from 'sonner'

function Home() {
  const { user, signOut } = useAuth()
  const { data: meData } = useMeQuery()
  const { data: gamesData, loading: gamesLoading } = useMyGamesQuery()
  const [createGame, { loading: createGameLoading }] = useCreateGameMutation()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [gameName, setGameName] = useState('')
  const [gameDescription, setGameDescription] = useState('')

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gameName.trim()) return

    try {
      const result = await createGame({
        variables: {
          input: {
            name: gameName.trim(),
            description: gameDescription.trim() || undefined,
          },
        },
        refetchQueries: [{ query: MyGamesDocument }],
      })

      if (result.data?.createGame) {
        toast.success('Game created successfully', {
          description: `"${result.data.createGame.name}" is ready to go!`,
        })
        setGameName('')
        setGameDescription('')
        setShowCreateForm(false)
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred'
      toast.error('Failed to create game', {
        description: message,
      })
    }
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

  return (
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
                      className="border-b border-border last:border-b-0"
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
        </div>
      </div>
    </div>
  )
}

export default Home
