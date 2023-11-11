export interface Tictactoe {
    getGrid(): number[][]
    setGrid(grid: number[][]): void
    getWinner(): number
}