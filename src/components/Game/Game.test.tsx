import React from "react";
import {fireEvent, render} from "@testing-library/react";
import {Game, GameProps} from "./Game";
import cellStyles from "./Grid/Cell/Cell.module.css";

function renderGame(partial?: Partial<GameProps>) {
    const props: GameProps = Object.assign({
        rows: 3,
        columns: 5,
    }, partial);
    return render(<Game {...props} />)
}

function getGrid(game: ReturnType<typeof renderGame>) {
    return game.getByTestId('Grid');
}
function getAllCells(game: ReturnType<typeof renderGame>) {
    return game.getAllByTestId(/^Cell\[/);
}
function getCellAt(game: ReturnType<typeof renderGame>, index: number) {
    return getAllCells(game)[index];
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
        fireEvent.click(getCellAt(game, cellIndex));
        expect(getCellAt(game, cellIndex)).toHaveClass(cellStyles.alive);
    });

});
