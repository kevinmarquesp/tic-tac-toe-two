import Tictactoe from "../src/game/controllers/Tictactoe";
import { ITictactoe } from "../src/game/models/Interfaces";
import { TictactoeGrid } from "../src/game/models/Types";

test("Counting the grid elements", () => {
    const tictactoe: ITictactoe = new Tictactoe();
    const grid: TictactoeGrid = tictactoe.getGrid();

    expect(grid.length).toBe(3);

    grid.forEach((row: number[]) => {
        expect(row.length).toBe(3);

        row.forEach((val: number) => 
            expect(val).toBe(0));
    });
});

test("Writing a new grid to the board object", () => {
    const tictactoe: ITictactoe = new Tictactoe();

    tictactoe.setGrid(new Array(3)
        .fill(new Array(3).fill(1)));

    const grid: TictactoeGrid = tictactoe.getGrid();

    grid.forEach((row: number[]) =>
        row.forEach((val: number) => 
            expect(val).toBe(1)));
});

test("Writing an invalid grid to the board object", () => {
    const tictactoe: ITictactoe = new Tictactoe();

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