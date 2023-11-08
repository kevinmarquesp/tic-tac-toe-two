import { TictactoeGrid } from "./Types";

export interface ITictactoe {
    getGrid(): TictactoeGrid
    setGrid(TictactoeGrid): void
}