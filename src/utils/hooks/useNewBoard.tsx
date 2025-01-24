import { useState } from 'react'
import { Board, Sudoku } from '../Sudoku'

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
