export interface ITictactoe {
    getGrid(): number[][]
    setGrid(grid: number[][]): void
    getWinner(): number
}