import { Board } from "./SudokuSolver";

export class BoardGenerator {
  private board: Board;
  constructor() {
    this.board = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));
  }
}