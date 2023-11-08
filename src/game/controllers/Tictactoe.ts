import { TictactoeGrid } from "../models/Types";

class InvalidGridError extends Error {
    constructor (msg: string) {
        super(msg);
        this.name = "InvalidGridError";
    }
}

export default class Tictactoe {
    private _grid: number[][] = new Array(3)
        .fill(new Array(3).fill(0));

    public getGrid(): number[][] {
        return this._grid;
    }

    public setGrid(grid: TictactoeGrid): void {
        this._validateGridSize(grid);
        this._validateGridValues(grid);
        this._grid = grid;
    }

    private _validateGridSize(grid: TictactoeGrid): void {
        if (grid.length !== 3)
            throw new InvalidGridError("Grid size missmatch");

        grid.forEach((row: number[]) => {
            if (row.length !== 3)
                throw new InvalidGridError("Grid size missmatch");
        })
    }

    private _validateGridValues(grid: TictactoeGrid): void {
        const isValueValid = (val: number) =>
            typeof val === "number" && val >= 0 && val < 3;

        for (const row of grid)
            for (const val of row)
                if (!isValueValid(val))
                    throw new InvalidGridError("Invalid values asigned");
    }
}