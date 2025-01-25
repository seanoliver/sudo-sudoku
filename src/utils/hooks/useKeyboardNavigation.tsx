import { useCallback } from 'react'

// TODO: Handle keyboard navigation when navigating to a filled cell

export const useKeyboardNavigation = (rowIndex: number, colIndex: number) => {
  return useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const positions = {
        ArrowUp: [rowIndex - 1, colIndex],
        ArrowDown: [rowIndex + 1, colIndex],
        ArrowLeft: [rowIndex, colIndex - 1],
        ArrowRight: [rowIndex, colIndex + 1],
      } as const

      const [nextRow, nextCol] = positions[e.key as keyof typeof positions] || [
        null,
        null,
      ]
      if (nextRow === null || nextCol === null) return

      const nextCell = document.querySelector(
        `[data-position="${nextRow},${nextCol}"]`,
      )
      if (nextCell instanceof HTMLElement) {
        e.preventDefault()
        nextCell.focus()
      }
    },
    [rowIndex, colIndex],
  )
}
