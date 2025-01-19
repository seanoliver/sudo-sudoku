export type Cell = number;
export type Board = Cell[][];
export type Position = [number, number];

export class SudokuSolver {
  private board: number[][];
  
  constructor(initialBoard?: number[][]) {
    this.board =
      initialBoard ||
      Array(9)
        .fill(0)
        .map(() => Array(9).fill(0));
  }

  /**
   * Returns a deep copy of the current board.
   */
  public getBoard(): number[][] {
    return this.board.map((row) => [...row]);
  }

  public setCell([row, col]: Position, value: Cell): boolean {
    if (!this.isValidInput(value)) return false;
    if (!this.isValidPosition([row, col])) return false;
    if (value !== 0 && !this.isValidMove(row, col, value)) return false;

    this.board[row][col] = value;
    return true;
  }

  public solve(): boolean {
    if (!this.isValidBoard()) return false;
    return this.solveRecursive();
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
    // Check if the number is already in the row
    for (let i = 0; i < 9; i++) {
      if (this.board[row][i] === num) {
        return false;
      }
    }

    // Check if the number is already in the column
    for (let i = 0; i < 9; i++) {
      if (this.board[i][col] === num) {
        return false;
      }
    }

    // Check if the number is already in the 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (this.board[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  private isValidBoard(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (
          this.board[row][col] !== 0 &&
          !this.isValidMove(row, col, this.board[row][col])
        ) {
          return false;
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

  public clear(): void {
    this.board = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));
  }
}
