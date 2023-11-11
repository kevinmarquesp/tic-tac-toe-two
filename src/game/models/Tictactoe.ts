export default interface Tictactoe {
    getGrid(): number[][]
    setGrid(grid: number[][]): void
    currentWinner(): number
}