import TictactoeController from "../src/game/controllers/TictactoeController";
import { Tictactoe } from "../src/game/models/Tictactoe";

test("Counting the grid elements", () => {
    const tictactoe: Tictactoe = new TictactoeController();
    const grid: number[][] = tictactoe.getGrid();

    expect(grid.length).toBe(3);

    grid.forEach((row: number[]) => {
        expect(row.length).toBe(3);

        row.forEach((val: number) => 
            expect(val).toBe(0));
    });
});

test("Writing a new grid to the board object", () => {
    const tictactoe: Tictactoe = new TictactoeController();

    tictactoe.setGrid(new Array(3)
        .fill(new Array(3).fill(1)));

    const grid: number[][] = tictactoe.getGrid();

    grid.forEach((row: number[]) =>
        row.forEach((val: number) => 
            expect(val).toBe(1)));
});

test("Writing an invalid grid to the board object", () => {
    const tictactoe: Tictactoe = new TictactoeController();

    [1, 2, 4].forEach((i: number) => {
        expect(() => tictactoe.setGrid(new Array(3)
                .fill(new Array(i).fill(0))))
            .toThrow("Grid size missmatch");

        expect(() => tictactoe.setGrid(new Array(i)
                .fill(new Array(3).fill(0))))
            .toThrow("Grid size missmatch");
    });

    [-1, 3, 4].forEach((i: number) => {
        expect(() => tictactoe.setGrid(new Array(3)
                .fill(new Array(3).fill(i))))
            .toThrow("Invalid values asigned");
    });
});

test("Getting the winner given the current grid state", () => {
    const tictactoe: Tictactoe = new TictactoeController();

    tictactoe.setGrid([[0, 1, 2],
                       [0, 1, 2],
                       [0, 1, 2]]);

    expect(() => tictactoe.getWinner()).toThrow("Invalid board configuration");

    tictactoe.setGrid([[1, 0, 2],
                       [1, 1, 2],
                       [1, 0, 0]]);

    expect(tictactoe.getWinner()).toBe(0);
});