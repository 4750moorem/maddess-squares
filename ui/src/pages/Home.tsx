import { useState, useEffect, useCallback, useMemo } from 'react'
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
  useMyGridsQuery,
  useMeQuery,
  useCreateGridMutation,
  useBulkAddPlayersMutation,
  useUpdateSquareMutation,
  useBulkAssignSquaresMutation,
  MyGridsDocument,
  type MyGridsQuery,
} from '@/graphql/generated'


function Home() {
  const { user, signOut } = useAuth()
  const { data: meData } = useMeQuery()
  const { data: gridsData, loading: gridsLoading } = useMyGridsQuery()
  const [createGrid, { loading: createGridLoading }] = useCreateGridMutation()
  const [bulkAddPlayers, { loading: addingPlayers }] = useBulkAddPlayersMutation()
  const [updateSquare, { loading: assigningPlayer }] = useUpdateSquareMutation()
  const [bulkAssignSquares, { loading: bulkAssigning }] = useBulkAssignSquaresMutation()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedSquares, setSelectedSquares] = useState<SquareType[]>([])
  const [showBulkAssignDialog, setShowBulkAssignDialog] = useState(false)
  const [bulkAssignPlayerId, setBulkAssignPlayerId] = useState<string>('')
  const [gridName, setGridName] = useState('')
  const [gridDescription, setGridDescription] = useState('')
  const [selectedGridId, setSelectedGridId] = useState<string | null>(null)
  const [selectedSquare, setSelectedSquare] = useState<SquareType | null>(null)
  const [isSquareModalOpen, setIsSquareModalOpen] = useState(false)
  const [showAddPlayersDialog, setShowAddPlayersDialog] = useState(false)
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('')
  const [showNewPlayerForm, setShowNewPlayerForm] = useState(false)
  const [newPlayer, setNewPlayer] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' })
  const [players, setPlayers] = useState([
    { firstName: '', lastName: '', email: '', phoneNumber: '' },
  ])

  const handleCreateGrid = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gridName.trim()) return

    await createGrid({
      variables: {
        input: {
          name: gridName.trim(),
          description: gridDescription.trim() || undefined,
        },
      },
      refetchQueries: [{ query: MyGridsDocument }],
    })

    setGridName('')
    setGridDescription('')
    setShowCreateDialog(false)
  }

  const handleSquareClick = (square: SquareType) => {
    setSelectedSquare(square)
    setSelectedPlayerId('')
    setShowNewPlayerForm(false)
    setNewPlayer({ firstName: '', lastName: '', email: '', phoneNumber: '' })
    setIsSquareModalOpen(true)
  }

  const handleShiftClick = useCallback((square: SquareType) => {
    setSelectedSquares((prev) => {
      const exists = prev.some((s) => s.id === square.id)
      if (exists) return prev.filter((s) => s.id !== square.id)
      return [...prev, square]
    })
  }, [])

  const selectedSquareIds = useMemo(
    () => new Set(selectedSquares.map((s) => s.id)),
    [selectedSquares],
  )

  const handleBulkAssign = async () => {
    if (selectedSquares.length === 0 || !bulkAssignPlayerId) return
    await bulkAssignSquares({
      variables: {
        input: {
          squareIds: selectedSquares.map((s) => s.id),
          gamePlayerId: bulkAssignPlayerId,
        },
      },
      refetchQueries: [{ query: MyGridsDocument }],
    })
    setSelectedSquares([])
    setBulkAssignPlayerId('')
    setShowBulkAssignDialog(false)
  }

  useEffect(() => {
    setSelectedSquares([])
  }, [selectedGridId])

  const handleAssignPlayer = async () => {
    if (!selectedSquare || !selectedPlayerId) return
    await updateSquare({
      variables: { id: selectedSquare.id, input: { gamePlayerId: selectedPlayerId } },
      refetchQueries: [{ query: MyGridsDocument }],
    })
    setIsSquareModalOpen(false)
  }

  const handleUnassignPlayer = async () => {
    if (!selectedSquare) return
    await updateSquare({
      variables: { id: selectedSquare.id, input: { gamePlayerId: null } },
      refetchQueries: [{ query: MyGridsDocument }],
    })
    setIsSquareModalOpen(false)
  }

  const handleAddAndAssign = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGridId || !selectedSquare) return
    if (!newPlayer.firstName.trim() || !newPlayer.lastName.trim()) return

    try {
      const result = await bulkAddPlayers({
        variables: {
          input: {
            gridId: selectedGridId,
            players: [newPlayer],
          },
        },
        refetchQueries: [{ query: MyGridsDocument }],
      })

      const addedPlayers = result.data?.bulkAddPlayers?.players
      if (addedPlayers && addedPlayers.length > 0) {
        const newest = addedPlayers[addedPlayers.length - 1]
        if (newest) {
          await updateSquare({
            variables: { id: selectedSquare.id, input: { gamePlayerId: newest.id } },
            refetchQueries: [{ query: MyGridsDocument }],
          })
        }
      }
    } catch (err) {
      console.error('handleAddAndAssign error:', err)
    }

    setIsSquareModalOpen(false)
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
    if (!selectedGridId) return

    const validPlayers = players.filter((p) => p.firstName.trim() && p.lastName.trim())
    if (validPlayers.length === 0) return

    await bulkAddPlayers({
      variables: {
        input: {
          gridId: selectedGridId,
          players: validPlayers,
        },
      },
      refetchQueries: [{ query: MyGridsDocument }],
    })

    setPlayers([{ firstName: '', lastName: '', email: '', phoneNumber: '' }])
    setShowAddPlayersDialog(false)
  }

  const getUserRole = (grid: MyGridsQuery['myGrids'][number]) => {
    const currentUserId = meData?.me?.id
    if (!currentUserId) return 'Unknown'

    const isOwner = grid.owners.some(
      (owner) => owner.id === currentUserId,
    )
    if (isOwner) return 'Owner'

    return 'Player'
  }

  const selectedGrid = gridsData?.myGrids.find((g) => g.id === selectedGridId)
  const isGridOwner = selectedGrid
    ? selectedGrid.owners.some((owner) => owner.id === meData?.me?.id)
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
                  <h1 className="text-3xl font-semibold">My Grids</h1>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedGridId ?? ''}
                    onChange={(e) => setSelectedGridId(e.target.value || null)}
                    className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select a grid</option>
                    {gridsData?.myGrids.map((grid) => (
                      <option key={grid.id} value={grid.id}>
                        {grid.name} ({getUserRole(grid)})
                      </option>
                    ))}
                  </select>
                  <Button size="sm" onClick={() => setShowCreateDialog(true)}>
                    New Grid
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

            {selectedGrid && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">
                    {selectedGrid.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    {isGridOwner && (
                      <Button
                        onClick={() => setShowAddPlayersDialog(true)}
                        size="sm"
                        variant="outline"
                      >
                        Add Players
                      </Button>
                    )}
                  </div>
                </div>

                {selectedSquares.length > 0 && (
                  <div className="flex items-center gap-3 rounded-md border border-primary/40 bg-primary/10 px-4 py-2">
                    <span className="text-sm font-medium">
                      {selectedSquares.length} square{selectedSquares.length > 1 ? 's' : ''} selected
                    </span>
                    <Button
                      size="sm"
                      onClick={() => {
                        setBulkAssignPlayerId('')
                        setShowBulkAssignDialog(true)
                      }}
                      disabled={bulkAssigning}
                    >
                      Assign to Selected
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedSquares([])}
                    >
                      Clear
                    </Button>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Hold Shift to select multiple squares
                </p>

                <div className="flex justify-center">
                  <Grid
                    grid={selectedGrid}
                    onSquareClick={handleSquareClick}
                    selectedSquareIds={selectedSquareIds}
                    onShiftClick={handleShiftClick}
                  />
                </div>
              </div>
            )}

            {!selectedGridId && (
              <div className="py-12 text-center text-muted-foreground">
                {gridsLoading
                  ? 'Loading grids...'
                  : !gridsData?.myGrids?.length
                    ? 'No grids yet. Create your first grid!'
                    : 'Select a grid from the dropdown above.'}
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Grid</DialogTitle>
            <DialogDescription>
              Create a new squares grid for your pool.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateGrid} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="gridName"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Grid Name
              </label>
              <input
                id="gridName"
                type="text"
                value={gridName}
                onChange={(e) => setGridName(e.target.value)}
                required
                className="retro-input w-full"
                placeholder="Enter grid name"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="gridDescription"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Description (optional)
              </label>
              <input
                id="gridDescription"
                type="text"
                value={gridDescription}
                onChange={(e) => setGridDescription(e.target.value)}
                className="retro-input w-full"
                placeholder="Enter description"
              />
            </div>
            <Button type="submit" disabled={createGridLoading}>
              {createGridLoading ? 'Creating...' : 'Create Grid'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddPlayersDialog} onOpenChange={setShowAddPlayersDialog}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Players</DialogTitle>
            <DialogDescription>
              Add players to {selectedGrid?.name}. If email or phone is provided, they will be added as a real user.
            </DialogDescription>
          </DialogHeader>
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
                  placeholder="Email (optional - creates real user)"
                />
                <input
                  type="tel"
                  value={player.phoneNumber}
                  onChange={(e) => updatePlayer(idx, 'phoneNumber', e.target.value)}
                  className="retro-input w-full"
                  placeholder="Phone (optional - creates real user)"
                />
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              * Name only = placeholder player. Email or phone = real user account.
            </p>
            <div className="flex gap-2">
              <Button type="button" onClick={addPlayerRow} variant="outline">
                Add Another
              </Button>
              <Button type="submit" disabled={addingPlayers}>
                {addingPlayers ? 'Adding...' : 'Add Players'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSquareModalOpen} onOpenChange={setIsSquareModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedSquare?.gamePlayer ? 'Manage Square Assignment' : 'Assign Player'}
            </DialogTitle>
            <DialogDescription>
              {selectedSquare && (
                <>
                  Position: Row {selectedSquare.rowValue}, Column{' '}
                  {selectedSquare.columnValue}
                  {selectedSquare.gamePlayer && (
                    <>
                      <br />
                      Owner:{' '}
                      {selectedSquare.gamePlayer.displayName ||
                        selectedSquare.gamePlayer.email}
                    </>
                  )}
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

            {selectedSquare?.gamePlayer && (
              <div className="space-y-4 border-t border-border pt-4">
                <Button
                  variant="destructive"
                  onClick={handleUnassignPlayer}
                  disabled={assigningPlayer}
                  className="w-full"
                >
                  {assigningPlayer ? 'Unassigning...' : 'Unassign Player'}
                </Button>
              </div>
            )}

            {selectedSquare && !selectedSquare.gamePlayer && selectedGrid && (
              <div className="space-y-4 border-t border-border pt-4">
                <div className="space-y-2">
                  <label
                    htmlFor="assignPlayer"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Select a Player
                  </label>
                  <select
                    id="assignPlayer"
                    value={selectedPlayerId}
                    onChange={(e) => setSelectedPlayerId(e.target.value)}
                    className="retro-input w-full"
                  >
                    <option value="">Choose a player...</option>
                    {selectedGrid.players.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.displayName || p.email || 'Unknown'}
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={handleAssignPlayer}
                    disabled={!selectedPlayerId || assigningPlayer}
                    className="w-full"
                  >
                    {assigningPlayer ? 'Assigning...' : 'Assign Player'}
                  </Button>
                </div>

                <div className="border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewPlayerForm(!showNewPlayerForm)}
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  >
                    {showNewPlayerForm ? 'Hide' : 'Add New Player'}
                  </button>

                  {showNewPlayerForm && (
                    <form onSubmit={handleAddAndAssign} className="mt-3 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={newPlayer.firstName}
                          onChange={(e) => setNewPlayer({ ...newPlayer, firstName: e.target.value })}
                          className="retro-input"
                          placeholder="First Name *"
                          required
                        />
                        <input
                          type="text"
                          value={newPlayer.lastName}
                          onChange={(e) => setNewPlayer({ ...newPlayer, lastName: e.target.value })}
                          className="retro-input"
                          placeholder="Last Name *"
                          required
                        />
                      </div>
                      <input
                        type="email"
                        value={newPlayer.email}
                        onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
                        className="retro-input w-full"
                        placeholder="Email (optional)"
                      />
                      <input
                        type="tel"
                        value={newPlayer.phoneNumber}
                        onChange={(e) => setNewPlayer({ ...newPlayer, phoneNumber: e.target.value })}
                        className="retro-input w-full"
                        placeholder="Phone (optional)"
                      />
                      <Button type="submit" disabled={assigningPlayer || addingPlayers} className="w-full">
                        {assigningPlayer || addingPlayers ? 'Adding...' : 'Add & Assign'}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBulkAssignDialog} onOpenChange={setShowBulkAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign {selectedSquares.length} Square{selectedSquares.length > 1 ? 's' : ''}</DialogTitle>
            <DialogDescription>
              Select a player to assign to the selected squares.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="bulkAssignPlayer"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Select a Player
              </label>
              <select
                id="bulkAssignPlayer"
                value={bulkAssignPlayerId}
                onChange={(e) => setBulkAssignPlayerId(e.target.value)}
                className="retro-input w-full"
              >
                <option value="">Choose a player...</option>
                {selectedGrid?.players.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.displayName || p.email || 'Unknown'}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={handleBulkAssign}
              disabled={!bulkAssignPlayerId || bulkAssigning}
              className="w-full"
            >
              {bulkAssigning ? 'Assigning...' : `Assign ${selectedSquares.length} Square${selectedSquares.length > 1 ? 's' : ''}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}

export default Home
