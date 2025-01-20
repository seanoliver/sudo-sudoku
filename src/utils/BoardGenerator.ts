import { Board } from "./SudokuSolver";


export class BoardGenerator {
  private board: Board;
  constructor() {
    this.board = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));
  }

  private fillBox(row: number, col: number, num: number): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        
      }
    }
  }
}