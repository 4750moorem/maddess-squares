import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { GameGridQuery } from '@/graphql/generated'

export type SquareType = NonNullable<
  NonNullable<NonNullable<GameGridQuery['game']>['grid']>['squares']
>[number]

export type GridType = NonNullable<NonNullable<GameGridQuery['game']>['grid']>

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

export function MarchMadnessGrid({
  grid,
  currentUserId,
  onSquareClick,
}: {
  grid: GridType
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
