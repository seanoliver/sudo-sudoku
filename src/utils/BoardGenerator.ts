import { Board } from './SudokuSolver';
import shuffle from 'lodash/shuffle';

export class BoardGenerator {
  private board: Board;
  constructor() {
    this.board = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));
  }

  private fillBox(row: number, col: number, num: number): boolean {
    const shuffledNums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        this.board[row + r][col + c] = shuffledNums.pop()!;
      }
    }

    return true;
  }
}
