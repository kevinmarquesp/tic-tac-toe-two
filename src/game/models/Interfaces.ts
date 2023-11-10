import { TictactoeGrid } from "./Types";

export interface ITictactoe {
    getGrid(): TictactoeGrid
    setGrid(grid: TictactoeGrid): void
}