import { InvalidGridError, InvalidGridValueError, WinnerAnalizerError } from "../errors/TictactoeErrors";
import ErrorsDictionary from "../ErrorsDictionary";

type NeighborsArray = Array<CellPosition | null>;
type None = null | undefined;

type CellPosition = {
    row: number;
    col: number;
};

type TictactoeProps = {
    grid: number[][];
};

const ROWS: number = 3;
const COLS: number = 3;

export default class TictactoeController {
    private props: TictactoeProps;

    constructor () {
        this.props = {
            grid: new Array(ROWS).fill(new Array(COLS).fill(0)),
        };
    }

    public getGrid(): number[][] {
        return this.props.grid;
    }

    public getCell(row: number, col: number): number {
        this.validateGridRowsOrThrow();
        
        const selectedRow: number[] = this.props.grid[row]!;
        const cellValue: number = selectedRow[col]!;

        this.validateCellValueOrThrow(cellValue);
        return cellValue;
    }

    public setGrid(grid: number[][]): void {
        this.validateGridRowsOrThrow(grid);
        this.validateGridCellValuesOrThrow(grid);

        this.props.grid = grid;
    }

    public currentWinner(): number {
        type PositionAndDirectionCheck = {
            position: CellPosition;
            direction: number;
        };

        const analizingCellsData: PositionAndDirectionCheck[] = [
            { position: { row: 0, col: 0 }, direction: -1 },
            { position: { row: 0, col: 1 }, direction:  6 },
            { position: { row: 0, col: 2 }, direction: -1 },
            { position: { row: 1, col: 0 }, direction:  4 },
            { position: { row: 2, col: 2 }, direction: -1 },
        ];

        let currentCellData: PositionAndDirectionCheck
        let winner: number = 0;

        for (currentCellData of analizingCellsData) {
            const result: number =
                this.checkWinnerByPos(currentCellData.position, currentCellData.direction);

            if (winner !== 0 && result !== 0)
                throw new WinnerAnalizerError(ErrorsDictionary.Tictactoe
                    .WinnerAnalizerError.INVALID_GRID_FORMATION);
                
            winner = result;
        }

        return winner;
    }

    private listCellNeighbors(row: number, col: number): NeighborsArray {
        const isValueValid = (value: number) =>
            value >= 0 && value < 3;

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

        return neighbors.map((pos: CellPosition) => isValueValid(pos.row) &&
            isValueValid(pos.col) ?  pos : null);
    }

    private checkWinnerByPos(position: CellPosition, direction: number = -1): number {
        const value: number = this.getCell(position.row, position.col);
        const neighbors: NeighborsArray = this.listCellNeighbors(position.row, position.col)

        let neighborPosition: CellPosition | None;
        let neighborValue: number;
        let nextDirection: number;  // in fact, this is the neighbor's index

        if (direction < 0) {  // -1 means that it's the begining of the algorithm
            for ([nextDirection, neighborPosition] of neighbors.entries()) {
                if (neighborPosition === null)
                    continue;

                neighborValue = this.getCell(neighborPosition.row, neighborPosition.col);
            
                if (value === neighborValue)
                    return this.checkWinnerByPos(neighborPosition, nextDirection);
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
                return this.checkWinnerByPos(neighborPosition, direction);

        } else {
            throw new WinnerAnalizerError(ErrorsDictionary.Tictactoe
                .WinnerAnalizerError.INVALID_DIRECTION);
        }

        return 0;
    }

    private validateGridRowsOrThrow(grid: any = this.props.grid): void {
        if (grid.length !== 3)
            throw new InvalidGridError(ErrorsDictionary.Tictactoe
                .InvalidGridError.GRID_ROWS_AMOUNT_MISSMATCH);

        grid.forEach((selectedRow: any) => {
            if (Object.prototype.toString.call(selectedRow) !== "[object Array]")
                throw new InvalidGridError(ErrorsDictionary.Tictactoe
                    .InvalidGridError.ROW_TYPE_MISSMATCH);
            
            if (selectedRow.length !== 3)
                throw new InvalidGridError(ErrorsDictionary.Tictactoe
                    .InvalidGridError.ROW_SIZE_MISSMATCH);
        });
    }

    private validateGridCellValuesOrThrow(grid: any[][] = this.props.grid): void {
        grid.forEach((selectedRow: any[]) => {
            selectedRow.forEach((cellValue: any) => {
                this.validateCellValueOrThrow(cellValue);
            });
        });
    }

    private validateCellValueOrThrow(cellValue: any): void {
        if (typeof cellValue !== "number")
            throw new InvalidGridValueError(ErrorsDictionary.Tictactoe
                .InvalidGridValueError.GRID_VALUES_TYPE_MISSMATCH);

        if (cellValue < 0 || cellValue > 2)
            throw new InvalidGridValueError(ErrorsDictionary.Tictactoe
                .InvalidGridValueError.GRID_VALUES_OUT_OF_RANGE);
    }
}