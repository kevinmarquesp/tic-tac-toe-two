import ErrorsDictionary from "../src/game/ErrorsDictionary";
import TictactoeController from "../src/game/controllers/TictactoeController";
import { InvalidGridError, InvalidGridValueError } from "../src/game/errors/TictactoeErrors";
import Tictactoe from "../src/game/models/Tictactoe";

describe("Default behavior and states of the TictactoeController object", () => {
    const ROWS: number = 3;
    const COLS: number = 3;

    const tictactoe: Tictactoe = new TictactoeController();
    const grid: number[][] = tictactoe.getGrid();

    it("Should give a 3x3 two dimentional array", () => {
        expect(grid.length).toBe(ROWS);
        
        grid.forEach((currentRow: number[]) => {
            expect(currentRow.length).toBe(COLS);
        });
    });

    it("Should be an empty grid with all values setted to 0", () => {
        grid.forEach((currentRow: number[]) => {
            currentRow.forEach((cellValue: number) => {
                expect(cellValue).toBe(0);
            });
        });
    });
});

describe("What happens when asigning a new tictactoe board array", () => {
    type BoardTestCase = {
        grid: any[][];
        error: string | null;
    };

    const ExpectedErrors = {
        GRID_ROWS_AMOUNT_MISSMATCH: ErrorsDictionary.Tictactoe.InvalidGridError.GRID_ROWS_AMOUNT_MISSMATCH,
        ROW_SIZE_MISSMATCH:         ErrorsDictionary.Tictactoe.InvalidGridError.ROW_SIZE_MISSMATCH,
        GRID_VALUES_OUT_OF_RANGE:   ErrorsDictionary.Tictactoe.InvalidGridValueError.GRID_VALUES_OUT_OF_RANGE,
        GRID_VALUES_TYPE_MISSMATCH: ErrorsDictionary.Tictactoe.InvalidGridValueError.GRID_VALUES_TYPE_MISSMATCH,
    }

    const ValidBoardCases: BoardTestCase[] = [
        { grid: [[1, 0, 0], [1, 0, 0], [1, 0, 0]], error: null },
        { grid: [[2, 0, 2], [1, 2, 2], [0, 0, 2]], error: null },
    ];

    const OutOfRangeBoardCases: BoardTestCase[] = [
        { grid: [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]],         error: ExpectedErrors.ROW_SIZE_MISSMATCH },
        { grid: [[1, 0],       [1, 0, 0],    [1, 0, 0]],            error: ExpectedErrors.ROW_SIZE_MISSMATCH },
        { grid: [[1, 0, 0],    [1, 0, 0],    [1, 0, 0, 0]],         error: ExpectedErrors.ROW_SIZE_MISSMATCH },
        { grid: [[1, 0, 0],    [1, 0, 0],    [1, 0, 0], [0, 0, 0]], error: ExpectedErrors.GRID_ROWS_AMOUNT_MISSMATCH },
        { grid: [[1, 0, 0],    [0, 0, 0]],                          error: ExpectedErrors.GRID_ROWS_AMOUNT_MISSMATCH },
        { grid: [[1, 0, 0],    [0, 0]],                             error: ExpectedErrors.GRID_ROWS_AMOUNT_MISSMATCH },
    ];

    const InvalidValuesBoardCases: BoardTestCase[] = [
        { grid: [[-1, 0, 0],   [1, 0, 0],   [1, 0, -5]],        error: ExpectedErrors.GRID_VALUES_OUT_OF_RANGE },
        { grid: [[2, 0, 2],    [1, 3, 2],   [0, 0, 2]],         error: ExpectedErrors.GRID_VALUES_OUT_OF_RANGE },
        { grid: [[null, 0, 2], [1, 3, 2],   [0, 0, 2]],         error: ExpectedErrors.GRID_VALUES_TYPE_MISSMATCH },
        { grid: [[1, 0, 2],    [1, 0, "x"], [0, 0, 2]],         error: ExpectedErrors.GRID_VALUES_TYPE_MISSMATCH },
        { grid: [[1, 0, 2],    [1, 1, 0],   [0, 0, undefined]], error: ExpectedErrors.GRID_VALUES_TYPE_MISSMATCH },
    ];

    const tictactoe: Tictactoe = new TictactoeController();

    it("Shuold asign the new board setup to the TictactoeController object", () => {
        ValidBoardCases.forEach((currentBoardTestCase: BoardTestCase) => {
            tictactoe.setGrid(currentBoardTestCase.grid);
            
            expect(currentBoardTestCase.error).toBe(null);
            expect(tictactoe.getGrid()).toBe(currentBoardTestCase.grid);
        });
    });

    it("Should throw an error for grids with more than 3 rows or columns", () => {
        OutOfRangeBoardCases.forEach((currentBoardTestCase: BoardTestCase) => {
            expect(typeof currentBoardTestCase.error).toBe("string");

            expect(() => tictactoe.setGrid(currentBoardTestCase.grid))
                .toThrow(currentBoardTestCase.error!);

            expect(() => tictactoe.setGrid(currentBoardTestCase.grid))
                .toThrow(InvalidGridError);
        });
    });

    it("Should throw an error for grids with not having number, or number less than 0 or greater than 2", () => {
        InvalidValuesBoardCases.forEach((currentBoardTestCase: BoardTestCase) => {
            expect(typeof currentBoardTestCase.error).toBe("string");
            
            expect(() => tictactoe.setGrid(currentBoardTestCase.grid))
                .toThrow(currentBoardTestCase.error!);
            
            expect(() => tictactoe.setGrid(currentBoardTestCase.grid))
                .toThrow(InvalidGridValueError);
        });
    });
});

describe("The current winner based on the internal grid values and positions", () => {
    type WinnerAnilizerCase = {
        grid: number[][];
        winner: number[];
    };

    const RowWinnerCases: WinnerAnilizerCase[] = [
        { grid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], winner: []  },
        { grid: [[1, 1, 1], [0, 0, 0], [0, 0, 0]], winner: [1] },
        { grid: [[0, 0, 0], [0, 0, 0], [2, 2, 2]], winner: [2] },
    ];

    const tictactoe: Tictactoe = new TictactoeController();

    it("Should give the expected winner for each filled row", () => {
        RowWinnerCases.forEach((currentWinnerAnalizerCase: WinnerAnilizerCase) => {
            tictactoe.setGrid(currentWinnerAnalizerCase.grid);

            expect(tictactoe.currentWinner())
                .toStrictEqual(currentWinnerAnalizerCase.winner);
        });
    });
});