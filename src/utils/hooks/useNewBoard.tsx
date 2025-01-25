import { useState } from 'react'
import { Sudoku } from '../Sudoku'
import { Board } from '../types'

export const useNewBoard = () => {
  const [board, setBoard] = useState<Board>([])

  const generateNewBoard = (
    difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  ) => {
    const newBoard = new Sudoku()
    newBoard.generateBoard(difficulty)
    setBoard(newBoard.getBoard())
  }

  return { board, generateNewBoard }
}
