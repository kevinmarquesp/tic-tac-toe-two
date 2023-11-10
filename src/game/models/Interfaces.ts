import { TictactoeGrid } from "./Types";

export interface ITictactoe {
    getGrid(): TictactoeGrid
    setGrid(grid: TictactoeGrid): void
    getWinner(): number
}

export interface ICellPos {
    row: number
    col: number
}