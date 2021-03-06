import React from "react";
import {fireEvent, render, act} from "@testing-library/react";
import {Game, GameProps} from "./Game";
import cellStyles from "./Grid/Cell/Cell.module.css";

const _ = false, X = true;

function renderGame(partial?: Partial<GameProps>) {
    const props: GameProps = Object.assign({
        rows: 3,
        columns: 5,
        ticksPerSecond: 1,
    }, partial);
    return render(<Game {...props} />)
}
type RenderedGame = ReturnType<typeof renderGame>;

function renderGameWithGrid(grid: GameState2D, props?: Partial<GameProps>) {
    const rows = grid.length, columns = grid[0].length;
    const game = renderGame(
        Object.assign({ rows, columns }, props)
    );
    grid.flat().forEach((value, index) => {
        if (value) fireEvent.mouseDown(getCellAt(game, index));
    });
    return game;
}

function getGrid(game: RenderedGame) {
    return game.getByTestId('Grid');
}
function getAllCells(game: RenderedGame) {
    return game.getAllByTestId(/^Cell\[/);
}
function getCellAt(game: RenderedGame, index: number) {
    return getAllCells(game)[index];
}
function expectGrid(game: RenderedGame, grid: GameState2D, messagePrefix?: string) {
    let index = 0;
    grid.forEach((columnArray, row) => {
        columnArray.forEach((expectAlive, column) => {
            const cell = getCellAt(game, index++);
            const isAlive = cell.classList.contains(cellStyles.alive);
            const message = [
                messagePrefix,
                `Cell[row:${row}, col:${column}]' is`
            ].filter(v => v).join(' ');
            expect(
                `${message} ${isAlive ? 'alive' : 'dead'}`
            ).toBe(
                `${message} ${expectAlive ? 'alive' : 'dead'}`
            );
        });
    });
}

describe('Game', () => {

    it('should create the right number of cells', () => {
        const rows = 2, columns = 3;
        const game = renderGame({ rows, columns });
        expect(getAllCells(game)).toHaveLength(rows * columns);
    });

    it('should have a grid of the right size', () => {
        const rows = 2, columns = 3, cellSize = 50;
        const game = renderGame({ rows, columns, cellSize });
        const grid = getGrid(game);

        expect(grid).toHaveStyle(
            `grid-template-rows: repeat(${rows}, ${cellSize}px)`
        );
        expect(grid).toHaveStyle(
            `grid-template-columns: repeat(${columns}, ${cellSize}px)`
        );
    });

    it('should toggle a cell when pressed', () => {
        const game = renderGame();
        const cellIndex = 3;
        expect(getCellAt(game, cellIndex)).not.toHaveClass(cellStyles.alive);
        fireEvent.mouseDown(getCellAt(game, cellIndex));
        expect(getCellAt(game, cellIndex)).toHaveClass(cellStyles.alive);
    });

    describe('buttons', () => {
        let randomSpy: jest.SpyInstance;
        beforeEach(() => randomSpy = jest.spyOn(global.Math, 'random'));
        afterEach(() => randomSpy.mockRestore());

        it('can clear the grid', () => {
            const game = renderGameWithGrid([
                [X, X, X],
                [X, X, X],
                [X, X, X],
            ]);
            fireEvent.click(game.getByTestId('clear-btn'));
            expectGrid(game, [
                [_, _, _],
                [_, _, _],
                [_, _, _],
            ]);
        });

        it('can randomize grid', () => {
            const randomValues = [
                1, 1, 1,
                0, 1, 0,
                0, 0, 0
            ].map(value => value ^ 1); // Flip values because 0 means alive and 1 means dead
            randomSpy.mockImplementation(() => randomValues.shift() || 0);

            const game = renderGameWithGrid([
                [_, _, _],
                [_, _, _],
                [_, _, _],
            ]);
            fireEvent.click(game.getByTestId('randomise-btn'));
            expectGrid(game, [
                [X, X, X],
                [_, X, _],
                [_, _, _],
            ]);
        });

    });

    // https://en.wikipedia.org/wiki/Oscillator_(cellular_automaton)
    describe('tick', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        it('does not update if speed set to zero', () => {
            const game = renderGameWithGrid([
                [_, X, _],
                [_, X, _],
                [_, X, _],
            ], {ticksPerSecond: 0});
            act(() => jest.advanceTimersToNextTimer());
            expectGrid(game, [
                [_, X, _],
                [_, X, _],
                [_, X, _],
            ]);
        });

        it('can have a blinker', () => {
            const game = renderGameWithGrid([
                [_, X, _],
                [_, X, _],
                [_, X, _],
            ]);
            act(() => jest.advanceTimersToNextTimer());
            expectGrid(game, [
                [_, _, _],
                [X, X, X],
                [_, _, _],
            ], 'At phase 1,');
            act(() => jest.advanceTimersToNextTimer());
            expectGrid(game, [
                [_, X, _],
                [_, X, _],
                [_, X, _],
            ], 'At phase 2,');
        });

        it('ends at the top', () => {
            const game = renderGameWithGrid([
                [X, X, X],
                [_, _, _],
                [_, _, _],
            ]);
            act(() => jest.advanceTimersToNextTimer());
            expectGrid(game, [
                [_, X, _],
                [_, X, _],
                [_, _, _],
            ]);
            act(() => jest.advanceTimersToNextTimer());
        });

        it('ends on the right', () => {
            const game = renderGameWithGrid([
                [_, _, X],
                [_, _, X],
                [_, _, X],
            ]);
            act(() => jest.advanceTimersToNextTimer());
            expectGrid(game, [
                [_, _, _],
                [_, X, X],
                [_, _, _],
            ]);
            act(() => jest.advanceTimersToNextTimer());
        });

        it('ends at the bottom', () => {
            const game = renderGameWithGrid([
                [_, _, _],
                [_, _, _],
                [X, X, X],
            ]);
            act(() => jest.advanceTimersToNextTimer());
            expectGrid(game, [
                [_, _, _],
                [_, X, _],
                [_, X, _],
            ]);
            act(() => jest.advanceTimersToNextTimer());
        });

        it('ends on the left', () => {
            const game = renderGameWithGrid([
                [X, _, _],
                [X, _, _],
                [X, _, _],
            ]);
            act(() => jest.advanceTimersToNextTimer());
            expectGrid(game, [
                [_, _, _],
                [X, X, _],
                [_, _, _],
            ]);
            act(() => jest.advanceTimersToNextTimer());
        });

        it('can have a cross', () => {
            const game = renderGameWithGrid([
                [_,_,_,_,_,_,_,_,_,_],
                [_,_,_,X,X,X,X,_,_,_],
                [_,_,_,X,_,_,X,_,_,_],
                [_,X,X,X,_,_,X,X,X,_],
                [_,X,_,_,_,_,_,_,X,_],
                [_,X,_,_,_,_,_,_,X,_],
                [_,X,X,X,_,_,X,X,X,_],
                [_,_,_,X,_,_,X,_,_,_],
                [_,_,_,X,X,X,X,_,_,_],
                [_,_,_,_,_,_,_,_,_,_],
            ]);
            act(() => jest.advanceTimersToNextTimer());
            expectGrid(game, [
                [_,_,_,_,X,X,_,_,_,_],
                [_,_,_,X,X,X,X,_,_,_],
                [_,_,_,_,_,_,_,_,_,_],
                [_,X,_,X,_,_,X,_,X,_],
                [X,X,_,_,_,_,_,_,X,X],
                [X,X,_,_,_,_,_,_,X,X],
                [_,X,_,X,_,_,X,_,X,_],
                [_,_,_,_,_,_,_,_,_,_],
                [_,_,_,X,X,X,X,_,_,_],
                [_,_,_,_,X,X,_,_,_,_],
            ], 'At phase 1,');
            act(() => jest.advanceTimersToNextTimer());
            expectGrid(game, [
                [_,_,_,X,_,_,X,_,_,_],
                [_,_,_,X,_,_,X,_,_,_],
                [_,_,X,X,_,_,X,X,_,_],
                [X,X,X,_,_,_,_,X,X,X],
                [_,_,_,_,_,_,_,_,_,_],
                [_,_,_,_,_,_,_,_,_,_],
                [X,X,X,_,_,_,_,X,X,X],
                [_,_,X,X,_,_,X,X,_,_],
                [_,_,_,X,_,_,X,_,_,_],
                [_,_,_,X,_,_,X,_,_,_],
            ], 'At phase 2,');
            act(() => jest.advanceTimersToNextTimer());
            expectGrid(game, [
                [_,_,_,_,_,_,_,_,_,_],
                [_,_,_,X,X,X,X,_,_,_],
                [_,_,_,X,_,_,X,_,_,_],
                [_,X,X,X,_,_,X,X,X,_],
                [_,X,_,_,_,_,_,_,X,_],
                [_,X,_,_,_,_,_,_,X,_],
                [_,X,X,X,_,_,X,X,X,_],
                [_,_,_,X,_,_,X,_,_,_],
                [_,_,_,X,X,X,X,_,_,_],
                [_,_,_,_,_,_,_,_,_,_],
            ], 'At phase 3,');
        });

    });

});
