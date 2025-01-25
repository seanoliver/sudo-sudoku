export type Cell = {
  value: number
  isPreFilled?: boolean
  isValid?: boolean
  isFocused?: boolean
}
export type Board = Cell[][]
export type Position = [number, number]
export type Difficulty = 'easy' | 'medium' | 'hard'
