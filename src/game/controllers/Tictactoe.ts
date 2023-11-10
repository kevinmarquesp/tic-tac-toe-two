import { ICellPos } from "../models/Interfaces";
import { TictactoeGrid } from "../models/Types";

class InvalidGridError extends Error {
    constructor (msg: string) {
        super(msg);
        this.name = "InvalidGridError";
    }
}

class WinnerAnalizeError extends Error {
    constructor (msg: string) {
        super(msg);
        this.name = "WinnerAnalizeError";
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

    private _listCellNeighbors(row: number, col: number): Array<ICellPos | null> {
        const isValueValid = (val: number) =>
            val >= 0 && val < 3;

        const neighbors: ICellPos[] = [
            { row: row - 1, col: col - 1 },
            { row: row - 1, col: col     },
            { row: row - 1, col: col + 1 },
            { row: row,     col: col - 1 },
            { row: row,     col: col + 1 },
            { row: row + 1, col: col - 1 },
            { row: row + 1, col: col     },
            { row: row + 1, col: col + 1 },
        ];

        return neighbors.map((pos: ICellPos) =>
            isValueValid(pos.row) && isValueValid(pos.col) ?  pos : null);
    }

    private _checkWinnerByPos(position: ICellPos, direction: number = -1): number {
        const value: number = this._grid[position.row]![position.col]!;  // todo: create a getAt() method
        const neighbors: Array<ICellPos | null> = this._listCellNeighbors(position.row, position.col)

        let neighborPosition: ICellPos | null | undefined;
        let neighborValue: number;
        let nextDirection: number;  // in fact, this is the neighbor's index

        if (direction < 0) {  // -1 means that it's the begining of the algorithm
            for ([nextDirection, neighborPosition] of neighbors.entries()) {
                if (neighborPosition === null)
                    continue;

                neighborValue = this._grid[neighborPosition.row]![neighborPosition.col]!;  // todo: create a getAt() method
            
                if (value === neighborValue) {
                    return this._checkWinnerByPos(neighborPosition, nextDirection);
                }
            }

        } else if (direction >= 0 && direction < 8) {  // when it's the seccond or the third movement
            neighborPosition = neighbors[direction]!;  // todo: verify if this value is not null or undefined

            if (neighborPosition === null)  // this means that it already reached the end of the board
                return value;

            neighborValue = this._grid[neighborPosition.row]![neighborPosition.col]!;  // todo: create a getAt() method

            if (value === neighborValue) {
                return this._checkWinnerByPos(neighborPosition, direction);
            }

        } // todo: throw an error if the direction is invalid

        return 0;
    }
}