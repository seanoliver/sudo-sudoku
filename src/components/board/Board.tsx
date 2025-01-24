'use client'

import { useNewBoard } from '@/utils/hooks/useNewBoard'
import { useEffect } from 'react'
import { Cell } from './Cell'

export const Board = () => {
  const { board, generateNewBoard } = useNewBoard()

  useEffect(() => {
    if (!board.length) {
      generateNewBoard('hard')
    }
  }, [board, generateNewBoard])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Sudo Sudoku</h1>
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="grid grid-rows-9 border-2 border-gray-800">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  value={cell}
                  colIndex={colIndex}
                  rowIndex={rowIndex}
                  isPreFilled={cell !== 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Board
