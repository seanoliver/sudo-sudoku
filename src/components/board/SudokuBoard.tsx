'use client'

import { useNewBoard } from '@/utils/hooks/useNewBoard'
import { useEffect } from 'react'

export const SudokuBoard = () => {
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
                <div
                  key={colIndex}
                  className={`
                    w-12 h-12
                    flex items-center justify-center
                    text-xl font-medium
                    ${colIndex === 0 ? '' : 'border-l'}
                    ${colIndex % 3 === 0 ? 'border-l-2 border-l-gray-800' : 'border-l-gray-300'}
                    ${rowIndex === 0 ? '' : 'border-t'} 
                    ${rowIndex % 3 === 0 ? 'border-t-2 border-t-gray-800' : 'border-t-gray-300'}
                    ${cell ? 'bg-white' : 'bg-gray-50'}
                  `}
                >
                  {cell || ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SudokuBoard
