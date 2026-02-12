import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { MyGridsQuery } from '@/graphql/generated'

export type SquareType = MyGridsQuery['myGrids'][number]['squares'][number]

export type GridType = MyGridsQuery['myGrids'][number]

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
  onSquareClick,
}: {
  square: SquareType
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
        <button
          type="button"
          onClick={handleClick}
          className={`flex h-10 w-10 items-center justify-center border-r border-b border-border font-mono text-xs transition-colors ${
            square.gamePlayer
              ? 'cursor-pointer bg-muted/40 hover:bg-muted/60'
              : 'cursor-default bg-card'
          }`}
        >
          {initials && (
            <span className="text-[clamp(0.5rem,1vw,0.75rem)] font-medium text-muted-foreground">
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

  return (
    <div className="overflow-x-auto">
      <div className="inline-block retro-shadow rounded-md border-2 border-border overflow-hidden">
        {/* Column headers */}
        <div className="flex">

          <div className="flex h-[5vw] min-h-[36px] max-h-[60px] w-[8vw] min-w-[50px] max-w-[100px] items-center justify-center border border-transparent" />
          {grid.columnOrder.map((colValue, colIndex) => (
            <div
              key={colIndex}
              className="flex h-[5vw] min-h-[36px] max-h-[60px] w-[8vw] min-w-[50px] max-w-[100px] items-center justify-center border border-border bg-muted font-medium"
            >
              {colValue}
            </div>
          ))}
        </div>
        {/* Rows */}
        {grid.rowOrder.map((rowValue, rowIndex) => (
          <div key={rowIndex} className="flex">

            <div className="flex h-[5vw] min-h-[36px] max-h-[60px] w-[8vw] min-w-[50px] max-w-[100px] items-center justify-center border border-border bg-muted font-medium">
              {rowValue}
            </div>
            {grid.columnOrder.map((_, colIndex) => {
              const square = squaresByPosition.get(`${rowIndex}-${colIndex}`)

              if (!square) return <div key={colIndex} className="h-[5vw] min-h-[36px] max-h-[60px] w-[8vw] min-w-[50px] max-w-[100px] border border-border" />
              return (
                <GridSquare
                  key={square.id}
                  square={square}
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
