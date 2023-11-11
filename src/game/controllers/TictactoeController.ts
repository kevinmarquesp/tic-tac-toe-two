import { InvalidGridError, WinnerAnalizerError } from "../errors/TictactoeErrors";
import ErrorsDictionary from "../ErrorsDictionary";

type NeighborsArray = Array<CellPosition | null>;
type None = null | undefined;

type CellPosition = {
    row: number;
    col: number;
};

interface TictactoeProps {
    grid: number[][];
};

export default class TictactoeController {
    private props: TictactoeProps;

    constructor () {
        this.props = {
            grid: new Array(3).fill(new Array(3).fill(0)),
        };
    }

    public getGrid(): number[][] {
        return this.props.grid;
    }

    public setGrid(grid: number[][]): void {
        this._validateGridSize(grid);
        this._validateGridValues(grid);
        this.props.grid = grid;
    }

    public getCell(row: number, col: number): number {
        const selectedRow: number[] | undefined = this.props.grid[row]
    
        if (selectedRow === undefined)
            throw new InvalidGridError(ErrorsDictionary.Tictactoe.InvalidGridError
                .UNEXPECTED_ROW_FORMAT);

        const cellValue: any = selectedRow[col];
    
        if (typeof cellValue !== "number")
            throw new InvalidGridError(ErrorsDictionary.Tictactoe.InvalidGridError
                .UNEXPECTED_CELL_TYPE);

        else if (cellValue < 0 || cellValue > 2)
            throw new InvalidGridError(ErrorsDictionary.Tictactoe.InvalidGridError
                .UNEXPECTED_CELL_VALUE);

        return cellValue;
    }

    public getWinner(): number {
        type PositionAndDirectionCheck = {
            position: CellPosition;
            direction: number;
        };

        const analizeCells: PositionAndDirectionCheck[] = [
            { position: { row: 0, col: 0 }, direction: -1 },
            { position: { row: 0, col: 1 }, direction:  6 },
            { position: { row: 0, col: 2 }, direction: -1 },
            { position: { row: 1, col: 0 }, direction:  4 },
            { position: { row: 2, col: 2 }, direction: -1 },
        ];

        let currentCell: PositionAndDirectionCheck
        let winner: number = 0;

        for (currentCell of analizeCells) {
            const result: number =
                this._checkWinnerByPos(currentCell.position, currentCell.direction);

            if (winner !== 0 && result !== 0)
                throw new WinnerAnalizerError("Invalid board configuration");
                
            winner = result;
        }

        return winner;
    }

    private _validateGridSize(grid: number[][]): void {
        if (grid.length !== 3)
            throw new InvalidGridError(ErrorsDictionary.Tictactoe.InvalidGridError
                .GRID_SIZE_MISSMATCH);

        grid.forEach((row: number[]) => {
            if (row.length !== 3)
                throw new InvalidGridError(ErrorsDictionary.Tictactoe
                    .InvalidGridError.GRID_SIZE_MISSMATCH);
        });
    }

    private _validateGridValues(grid: number[][]): void {
        const isValueValid = (val: number) =>
            typeof val === "number" && val >= 0 && val < 3;

        for (const row of grid)
            for (const val of row)
                if (!isValueValid(val))
                    throw new InvalidGridError(ErrorsDictionary.Tictactoe
                        .InvalidGridError.INVALID_VALUES_ASIGNED);
    }

    private _listCellNeighbors(row: number, col: number): NeighborsArray {
        const isValueValid = (val: number) =>
            val >= 0 && val < 3;

        const neighbors: CellPosition[] = [
            { row: row - 1, col: col - 1 },
            { row: row - 1, col: col     },
            { row: row - 1, col: col + 1 },
            { row: row,     col: col - 1 },
            { row: row,     col: col + 1 },
            { row: row + 1, col: col - 1 },
            { row: row + 1, col: col     },
            { row: row + 1, col: col + 1 },
        ];

        return neighbors.map((pos: CellPosition) =>
            isValueValid(pos.row) && isValueValid(pos.col) ?  pos : null);
    }

    private _checkWinnerByPos(position: CellPosition, direction: number = -1): number {
        const value: number = this.getCell(position.row, position.col);
        const neighbors: NeighborsArray = this._listCellNeighbors(position.row, position.col)

        let neighborPosition: CellPosition | None;
        let neighborValue: number;
        let nextDirection: number;  // in fact, this is the neighbor's index

        if (direction < 0) {  // -1 means that it's the begining of the algorithm
            for ([nextDirection, neighborPosition] of neighbors.entries()) {
                if (neighborPosition === null)
                    continue;

                neighborValue = this.getCell(neighborPosition.row, neighborPosition.col);
            
                if (value === neighborValue)
                    return this._checkWinnerByPos(neighborPosition, nextDirection);
            }

        } else if (direction >= 0 && direction < 8) {  // when it's the seccond or the third movement
            neighborPosition = neighbors[direction];

            if (neighborPosition === undefined)
                throw new WinnerAnalizerError(ErrorsDictionary.Tictactoe
                    .WinnerAnalizerError.UNDEFINED_NEIGHBOR_POSITION);

            if (neighborPosition === null)  // this means that it already reached the end of the board
                return value;

            neighborValue = this.getCell(neighborPosition.row, neighborPosition.col);

            if (value === neighborValue)
                return this._checkWinnerByPos(neighborPosition, direction);

        } else {
            throw new WinnerAnalizerError(ErrorsDictionary.Tictactoe
                .WinnerAnalizerError.INVALID_DIRECTION);
        }

        return 0;
    }
}