export type Cell = number;
export type Board = Cell[][];
export type Position = [number, number];
export type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTY_TO_NUMBERS_REMOVED = {
  easy: 30,
  medium: 40,
  hard: 50,
};

export class Sudoku {
  private board: Board;
  
  constructor(initialBoard?: Board) {
    this.board = initialBoard?.map(row => [...row]) || 
      Array(9).fill(0).map(() => Array(9).fill(0));
  }

  /**
   * Returns a deep copy of the current board.
   */
  public getBoard(): Board {
    return this.board.map((row) => [...row]);
  }

  /**
   * Generate a new Sudoku board with the specified difficulty.
   */
  public generateBoard(difficulty: Difficulty = 'medium'): Board {
    this.clear();
    this.fillDiagonal();
    this.solve();
    this.removeNumbers(difficulty);
    return this.getBoard();
  }

  /**
   * Sets a value in a specific cell if the move is valid.
   */
  public setCell([row, col]: Position, value: Cell): boolean {
    if (!this.isValidInput(value)) return false;
    if (!this.isValidPosition([row, col])) return false;
    if (value !== 0 && !this.isValidMove(row, col, value)) return false;

    this.board[row][col] = value;
    return true;
  }

  /**
   * Solves the current board state.
   */
  public solve(): boolean {
    if (!this.isValidBoard()) return false;
    return this.solveRecursive();
  }

  /**
   * Clears the board, setting all cells to 0.
   */
  public clear(): void {
    this.board = Array(9).fill(0).map(() => Array(9).fill(0));
  }

  private solveRecursive(): boolean {
    const empty = this.findEmptyCell();
    if (!empty) return true;

    const [row, col] = empty;
    for (let num = 1; num <= 9; num++) {
      if (this.isValidMove(row, col, num)) {
        this.board[row][col] = num;
        if (this.solveRecursive()) {
          return true;
        }
        this.board[row][col] = 0;
      }
    }
    return false;
  }

  private isValidInput(value: Cell): boolean {
    return value >= 0 && value <= 9;
  }

  private isValidPosition([row, col]: Position): boolean {
    return row >= 0 && row < 9 && col >= 0 && col < 9;
  }

  private isValidMove(row: number, col: number, num: number): boolean {
    const currentValue = this.board[row][col];
    this.board[row][col] = 0; // Temporarily remove current value for validation

    // Check row
    for (let i = 0; i < 9; i++) {
      if (this.board[row][i] === num) {
        this.board[row][col] = currentValue;
        return false;
      }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (this.board[i][col] === num) {
        this.board[row][col] = currentValue;
        return false;
      }
    }

    // Check 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (this.board[i][j] === num) {
          this.board[row][col] = currentValue;
          return false;
        }
      }
    }

    this.board[row][col] = currentValue;
    return true;
  }

  private isValidBoard(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const currentValue = this.board[row][col];
        if (currentValue !== 0) {
          this.board[row][col] = 0;
          const isValid = this.isValidMove(row, col, currentValue);
          this.board[row][col] = currentValue;
          if (!isValid) return false;
        }
      }
    }
    return true;
  }

  private findEmptyCell(): Position | null {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  private fillDiagonal(): void {
    for (let i = 0; i < 9; i += 3) {
      this.fillBox(i, i);
    }
  }

  private fillBox(row: number, col: number): void {
    const nums = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        this.board[row + r][col + c] = nums[r * 3 + c];
      }
    }
  }

  private removeNumbers(difficulty: Difficulty): void {
    const numToRemove = DIFFICULTY_TO_NUMBERS_REMOVED[difficulty];
    const positions = this.shuffle(Array.from({ length: 81 }, (_, i) => i));
    
    for (let i = 0; i < numToRemove; i++) {
      const index = positions[i];
      const row = Math.floor(index / 9);
      const col = index % 9;
      this.board[row][col] = 0;
    }
  }

  private shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
