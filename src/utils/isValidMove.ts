/**
 * Check if a move is valid in a given Sudoku board. Does NOT check if the move is correct.
 * @param board - Current Sudoku board
 * @param row - The row of the move
 * @param col - The column of the move
 * @param num - The number to check
 * @returns True if the move is valid, false otherwise
 */
export const isValidMove = ({
  board,
  row,
  col,
  num,
}: {
  board: number[][];
  row: number;
  col: number;
  num: number;
}) => {
  // Check if the number is already in the row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }

  // Check if the number is already in the column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  // Check if the number is already in the 3x3 grid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }

  return true;
};
