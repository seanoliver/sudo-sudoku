import { Board, Difficulty, Position } from './types'

const DIFFICULTY_TO_NUMBERS_REMOVED = {
  easy: 30,
  medium: 40,
  hard: 50,
}

export class Sudoku {
  private board: Board

  constructor(initialBoard?: Board) {
    this.board =
      initialBoard?.map((row) => [...row]) ||
      Array(9)
        .fill(0)
        .map(() => Array(9).fill(0))
  }

  /**
   * Returns a deep copy of the current board.
   */
  public getBoard(): Board {
    return this.board.map((row) => [...row])
  }

  /**
   * Generate a new Sudoku board with the specified difficulty.
   */
  public generateBoard(difficulty: Difficulty = 'medium'): Board {
    this.clear()
    this.prefillDiagonal()
    this.solve()
    this.removeNumbers(difficulty)
    return this.getBoard()
  }

  /**
   * Sets a value in a specific cell if the move is valid.
   */
  public setCell([row, col]: Position, newValue: number): boolean {
    if (!this.isValidInput(newValue)) return false
    if (!this.isValidPosition([row, col])) return false
    if (newValue !== 0 && !this.isValidMove(row, col, newValue)) return false

    this.board[row][col] = {
      value: newValue,
      isPreFilled: false,
      isValid: true,
      isFocused: false,
    }
    return true
  }

  /**
   * Solves the current board state.
   */
  public solve(): boolean {
    if (!this.isValidBoard()) return false
    return this.solveRecursive()
  }

  /**
   * Clears the board, setting all cells to 0.
   */
  public clear(): void {
    this.board = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0))
  }

  private solveRecursive(): boolean {
    const empty = this.findEmptyCell()
    if (!empty) return true

    const [row, col] = empty
    for (let num = 1; num <= 9; num++) {
      if (this.isValidMove(row, col, num)) {
        this.board[row][col] = {
          value: num,
          isPreFilled: true,
          isValid: true,
          isFocused: false,
        }
        if (this.solveRecursive()) {
          return true
        }
        this.board[row][col] = {
          value: 0,
          isPreFilled: false,
          isValid: false,
          isFocused: false,
        }
      }
    }
    return false
  }

  private isValidInput(value: number): boolean {
    return value >= 0 && value <= 9
  }

  private isValidPosition([row, col]: Position): boolean {
    return row >= 0 && row < 9 && col >= 0 && col < 9
  }

  private isValidMove(row: number, col: number, num: number): boolean {
    const currentCellValue = this.board[row][col].value
    this.board[row][col].value = 0

    // Check row
    for (let r = 0; r < 9; r++) {
      const rCell = this.board[row][r]
      if (rCell.value === num) {
        this.board[row][col].value = currentCellValue
        return false
      }
    }

    // Check column
    for (let c = 0; c < 9; c++) {
      const cCell = this.board[c][col]
      if (cCell.value === num) {
        this.board[row][col].value = currentCellValue
        return false
      }
    }

    // Check 3x3 grid
    const startRow = Math.floor(row / 3) * 3
    const startCol = Math.floor(col / 3) * 3
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        const rcCell = this.board[r][c]
        if (rcCell.value === num) {
          this.board[row][col].value = currentCellValue
          return false
        }
      }
    }

    this.board[row][col].value = currentCellValue
    return true
  }

  private isValidBoard(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const currentCell = this.board[row][col]
        if (currentCell.value !== 0) {
          this.board[row][col].value = 0
          const isValid = this.isValidMove(row, col, currentCell.value)
          this.board[row][col] = currentCell
          if (!isValid) return false
        }
      }
    }
    return true
  }

  private findEmptyCell(): Position | null {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col].value === 0) {
          return [row, col]
        }
      }
    }
    return null
  }

  private prefillDiagonal(): void {
    for (let i = 0; i < 9; i += 3) {
      this.prefillBox(i, i)
    }
  }

  /**
   * Fills a 3x3 box with random numbers 1-9 for initial game setup.
   * @param row - The starting row index of the box.
   * @param col - The starting column index of the box.
   */
  private prefillBox(row: number, col: number): void {
    const nums = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        this.board[row + r][col + c] = {
          ...this.board[row + r][col + c],
          value: nums[r * 3 + c],
          isPreFilled: true,
          isValid: true,
        }
      }
    }
  }

  private removeNumbers(difficulty: Difficulty): void {
    const numToRemove = DIFFICULTY_TO_NUMBERS_REMOVED[difficulty]
    const positions = this.shuffle(Array.from({ length: 81 }, (_, i) => i))

    for (let i = 0; i < numToRemove; i++) {
      const index = positions[i]
      const row = Math.floor(index / 9)
      const col = index % 9
      this.board[row][col] = {
        ...this.board[row][col],
        value: 0,
        isPreFilled: false,
        isValid: false,
      }
    }
  }

  private shuffle<T>(array: T[]): T[] {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }
}
