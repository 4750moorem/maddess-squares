import { useState, useRef, useEffect } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { MyGridsQuery } from '@/graphql/generated'
import {
  useUpdateSquareMutation,
  MyGridsDocument,
} from '@/graphql/generated'

export type SquareType = MyGridsQuery['myGrids'][number]['squares'][number]

export type GridType = MyGridsQuery['myGrids'][number]

type PlayerType = GridType['players'][number]

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

function QuickPickDropdown({
  players,
  squareId,
}: {
  players: PlayerType[]
  squareId: string
}) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [updateSquare] = useUpdateSquareMutation()

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleAssign = async (playerId: string) => {
    await updateSquare({
      variables: { id: squareId, input: { gamePlayerId: playerId } },
      refetchQueries: [{ query: MyGridsDocument }],
    })
    setOpen(false)
  }

  return (
    <div ref={dropdownRef} className="absolute bottom-0 right-0">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
        className="flex h-3 w-3 items-center justify-center rounded-tl bg-muted-foreground/20 text-[6px] leading-none text-muted-foreground hover:bg-muted-foreground/40"
      >
        +
      </button>
      {open && (
        <div className="absolute bottom-full right-0 z-50 mb-1 max-h-48 w-40 overflow-y-auto rounded-md border border-border bg-card shadow-lg">
          {players.length === 0 ? (
            <div className="px-2 py-1.5 text-xs text-muted-foreground">No players</div>
          ) : (
            players.map((player) => (
              <button
                key={player.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleAssign(player.id)
                }}
                className="flex w-full items-center px-2 py-1.5 text-left text-xs hover:bg-muted/60"
              >
                {player.displayName || player.email || 'Unknown'}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function GridSquare({
  square,
  players,
  onSquareClick,
}: {
  square: SquareType
  players: PlayerType[]
  onSquareClick: (square: SquareType) => void
}){
  const playerName = square.gamePlayer?.displayName || square.gamePlayer?.email || null
  const initials = square.gamePlayer ? getInitials(square.gamePlayer.displayName, square.gamePlayer.email) : null

  const handleClick = () => {
    onSquareClick(square)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
          className={`relative flex items-center justify-center border border-border font-mono text-xs transition-colors ${
            square.gamePlayer
              ? 'cursor-pointer bg-muted/40 hover:bg-muted/60'
              : 'cursor-pointer bg-card hover:bg-muted/20'
          }`}
        >
          {initials && (
            <span className="text-[clamp(0.5rem,1vw,0.75rem)] font-medium text-muted-foreground">
              {initials}
            </span>
          )}
          {!square.gamePlayer && (
            <QuickPickDropdown
              players={players}
              squareId={square.id}
            />
          )}
        </div>
      </TooltipTrigger>
      {playerName && (
        <TooltipContent>
          <p>{playerName}</p>
        </TooltipContent>
      )}
    </Tooltip>
  )
}

export function Grid({
  grid,
  onSquareClick,
}: {
  grid: GridType
  onSquareClick: (square: SquareType) => void
}){
  const squaresByPosition = new Map<string, SquareType>()
  for (const square of grid.squares) {
    squaresByPosition.set(`${square.rowIndex}-${square.columnIndex}`, square)
  }

  const cellClass = 'flex items-center justify-center'

  return (
    <div className="overflow-x-auto">
      <div
        className="inline-grid retro-shadow rounded-md border-2 border-border overflow-hidden"
        style={{
          gridTemplateColumns: 'repeat(11, clamp(50px, 8vw, 100px))',
          gridAutoRows: 'clamp(36px, 5vw, 60px)',
        }}
      >
        {/* Top-left corner */}
        <div className={cellClass} />
        {/* Column headers */}
        {grid.columnOrder.map((colValue, colIndex) => (
          <div
            key={colIndex}
            className={`${cellClass} border border-border bg-muted font-medium`}
          >
            {colValue}
          </div>
        ))}
        {/* Rows */}
        {grid.rowOrder.map((rowValue, rowIndex) => (
          <>
            {/* Row header */}
            <div
              key={`row-${rowIndex}`}
              className={`${cellClass} border border-border bg-muted font-medium`}
            >
              {rowValue}
            </div>
            {/* Squares */}
            {grid.columnOrder.map((_, colIndex) => {
              const square = squaresByPosition.get(`${rowIndex}-${colIndex}`)

              if (!square) return <div key={colIndex} className={`${cellClass} border border-border`} />
              return (
                <GridSquare
                  key={square.id}
                  square={square}
                  players={grid.players}
                  onSquareClick={onSquareClick}
                />
              )
            })}
          </>
        ))}
      </div>
    </div>
  )
}
