import { InvalidGridError, InvalidGridValueError } from "../errors/TictactoeErrors";
import ErrorsDictionary from "../ErrorsDictionary";

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

    // todo: recicle all the repeated code
    public currentWinner(): number[] {
        const rowWinners: number[] = this.checkForCurrentWinnerForEachRow();
        const columnWinners: number[] = this.checkForCurrentWinnerForEachColumn();
        const diagonalWinners: number[] = this.checkFroCurrentWinnerForEachDiagonal();

        return [...new Set([...rowWinners, ...columnWinners, ...diagonalWinners])];
    }

    private checkFroCurrentWinnerForEachDiagonal(): number[] {
        const diagonalArray: number[][] = []
        const mainDiagonal: number[] = []
        const opositeDiagonal: number[] = []

        let rowIterator: number = 0;
        let colIterator: number = ROWS - 1;

        while (rowIterator < ROWS && colIterator >= 0) {
            mainDiagonal.push(this.props.grid[rowIterator]![rowIterator]!);
            opositeDiagonal.push(this.props.grid[rowIterator]![colIterator]!);

            ++rowIterator;
            --colIterator;
        }

        diagonalArray.push(mainDiagonal, opositeDiagonal);

        const diagonalWinners: number[] = diagonalArray.map((currentColumn: number[]) => {
            const result: boolean = currentColumn.every((cellValue: number) =>
                cellValue === currentColumn[0] && cellValue !== 0);

            return result ? currentColumn[0]! : 0;
        });

        return diagonalWinners.sort().reverse().filter((value: number) =>
            value > 0);
    }

    private checkForCurrentWinnerForEachColumn(): number[] {
        const columnsArray: number[][] = [];

        for (let i = 0; i < COLS; ++i) {
            const currentColumn: number[] = [];

            this.props.grid.forEach((currentRow: number[]) =>
                currentColumn.push(currentRow[i]!));

            columnsArray.push(currentColumn);
        }

        const columnWinners: number[] = columnsArray.map((currentColumn: number[]) => {
            const result: boolean = currentColumn.every((cellValue: number) =>
                cellValue === currentColumn[0] && cellValue !== 0);

            return result ? currentColumn[0]! : 0;
        });

        return columnWinners.sort().reverse().filter((value: number) =>
            value > 0);
    }

    private checkForCurrentWinnerForEachRow(): number[] {
        const rowWinners: number[] = this.props.grid.map((currentRow: number[]) => {
            const result: boolean = currentRow.every((cellValue: number) =>
                cellValue === currentRow[0] && cellValue !== 0);

            return result ? currentRow[0]! : 0;
        });

        return rowWinners.sort().reverse().filter((value: number) =>
            value > 0);
    }

    private validateGridRowsOrThrow(grid: any = this.props.grid): void {
        if (grid.length !== ROWS)
            throw new InvalidGridError(ErrorsDictionary.Tictactoe
                .InvalidGridError.GRID_ROWS_AMOUNT_MISSMATCH);

        grid.forEach((selectedRow: any) => {
            if (Object.prototype.toString.call(selectedRow) !== "[object Array]")
                throw new InvalidGridError(ErrorsDictionary.Tictactoe
                    .InvalidGridError.ROW_TYPE_MISSMATCH);
            
            if (selectedRow.length !== COLS)
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