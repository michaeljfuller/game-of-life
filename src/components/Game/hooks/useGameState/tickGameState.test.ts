import {tickGame,  countNeighbouringCells} from './tickGameState';

describe('tickGame', () => {

    describe('countNeighbouringCells', () => {

        /** Generate test from the passed grid layout and expected counts. */
        function testGridCounts(grid: GameState2D, expectedCounts: (number|false)[][]) {
            const rows = grid.length;
            const columns = grid[0].length;
            const state = grid.flat();
            describe('\n' + drawTextGrid(grid), () => {
                forEachCellIn(grid, (row, column, index) => {
                    const expected = expectedCounts[row][column];
                    if (expected !== false) {
                        it(`should count ${expected} for Cell on [row: ${row}, column: ${column}]}`, () => {
                            expect(countNeighbouringCells(index, state, rows, columns)).toBe(expected);
                        });
                    }
                });
            });
        }

        const _ = false, X = true;
        testGridCounts([
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ], [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        testGridCounts([
            [X, X, X],
            [X, X, X],
            [X, X, X],
        ], [
            [3, 5, 3],
            [5, 8, 5],
            [3, 5, 3],
        ]);
        testGridCounts([
            [_, X, _],
            [X, _, X],
            [_, X, _],
        ], [
            [2, 2, 2],
            [2, 4, 2],
            [2, 2, 2],
        ]);
        testGridCounts([
            [X, _, X],
            [_, X, _],
            [X, _, X],
        ], [
            [1, 3, 1],
            [3, 4, 3],
            [1, 3, 1],
        ]);
        testGridCounts([
            [_, X, _],
            [X, X, X],
            [_, X, _],
        ], [
            [3, 3, 3],
            [3, 4, 3],
            [3, 3, 3],
        ]);
        testGridCounts([
            [_, _, X],
            [_, _, _],
            [X, _, _],
        ], [
            [_, 1, _],
            [1, 2, 1],
            [_, 1, _],
        ]);
        testGridCounts([
            [X, _, _],
            [_, _, _],
            [_, _, X],
        ], [
            [_, 1, _],
            [1, 2, 1],
            [_, 1, _],
        ]);
        testGridCounts([
            [_, _, _],
            [_, X, _],
            [_, _, _],
        ], [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
        ]);

    }); // countNeighbouringCells

    describe('tickGame', () => {

        function testTickGame(
            initialGrid: GameState2D,
            expectedGrid: GameState2D,
        ) {
            const rows = initialGrid.length;
            const columns = initialGrid[0].length;
            const cellString = (index: number, alive: CellAlive) => {
                const pos = indexToPosition(index, columns);
                return `[row:${pos.row}, col:${pos.column}] is ${alive ? 'alive' : 'dead'}`
            };

            it('has the right values for \n' + drawTextGrid(initialGrid), () => {
                const expected = expectedGrid.flat();
                const actual = tickGame(initialGrid.flat(), rows, columns);
                actual.forEach((alive: CellAlive, index: number) => {
                    expect(
                        cellString(index, alive)
                    ).toEqual(
                        cellString(index, expected[index])
                    );
                });
            });

        }

        const _ = false, X = true;
        testTickGame([
            [X, X, X],
            [X, X, X],
            [X, X, X],
        ], [
            [X, _, X],
            [_, _, _],
            [X, _, X],
        ]);
        testTickGame([
            [X, _, X],
            [_, _, _],
            [X, _, X],
        ], [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ]);
        testTickGame([
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ], [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ]);
        testTickGame([
            [X, X, _],
            [_, _, _],
            [_, X, X],
        ], [
            [_, _, _],
            [X, _, X],
            [_, _, _],
        ]);
        testTickGame([
            [X, X, _],
            [X, _, _],
            [_, _, _],
        ], [
            [X, X, _],
            [X, X, _],
            [_, _, _],
        ]);
        testTickGame([
            [X, X, _],
            [X, X, _],
            [_, _, _],
        ], [
            [X, X, _],
            [X, X, _],
            [_, _, _],
        ]);
        testTickGame([
            [_, X, _],
            [X, X, X],
            [_, X, _],
        ], [
            [X, X, X],
            [X, _, X],
            [X, X, X],
        ]);
        testTickGame([
            [X, X, X],
            [X, _, X],
            [X, X, X],
        ], [
            [X, _, X],
            [_, _, _],
            [X, _, X],
        ]);
        testTickGame([
            [_, _, _],
            [X, X, X],
            [_, _, _],
        ], [
            [_, X, _],
            [_, X, _],
            [_, X, _],
        ]);
        testTickGame([
            [_, X, _],
            [_, X, _],
            [_, X, _],
        ], [
            [_, _, _],
            [X, X, X],
            [_, _, _],
        ]);

    }); // tickGame

});

function drawTextGrid(grid: GameState2D): string {
    const rows = grid.length;
    let result = '';
    result += '┌ ' + grid[0].map((_, index) => index).join(' ') + ' ┐\n';
    for (let i = 0; i < rows; i++) {
        result += i +' ' + grid[i].map(value => value ? '█' : '·').join(' ') + ' '+i+'\n'
    }
    result += '└ ' + grid[0].map((_, index) => index).join(' ') + ' ┘';
    return result;
}

function forEachCellIn(
    grid: GameState2D,
    callback: (row: number, column: number, index: number) => void
) {
    const rows = grid.length;
    const columns = grid[0].length;
    let index = 0;
    for (let row=0; row < rows; row++) {
        for (let column=0; column < columns; column++) {
            callback(row, column, index++);
        }
    }
}

function indexToPosition(index: number, columns: number) {
    return {
        column: index % columns,
        row: Math.floor(index / columns),
    };
}
