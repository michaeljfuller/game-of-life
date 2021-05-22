import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {Grid, GridProps} from "./Grid";
import styles from "./Grid.module.css";

function renderGrid(partial?: Partial<GridProps>) {
    const {rows = 1, columns = 3} = partial || {};
    const props: GridProps = Object.assign({
        rows,
        columns,
        gameState: Array(rows * columns).fill(false),
    }, partial);
    return render(<Grid {...props} />);
}
type RenderedGrid = ReturnType<typeof renderGrid>;
function getAllCells(grid: RenderedGrid) {
    return grid.getAllByTestId(/^Cell\[/);
}
function getCellAt(grid: RenderedGrid, index: number) {
    return getAllCells(grid)[index];
}

describe("Grid", () => {

    it("should he created", () => {
        const grid = renderGrid();
        expect(grid.container.firstChild).toBeDefined();
        expect(grid.container.firstChild).toHaveClass(styles.Grid);
        expect(grid.container.firstChild).toHaveAttribute('data-testid', `Grid`);
    });

    it("should have the given column size", () => {
        const columns = 2, cellSize = 3;
        const grid = renderGrid({columns, cellSize});
        expect(grid.container.firstChild).toHaveStyle(
            `gridTemplateColumns: repeat(${columns}, ${cellSize}px)`
        );
    });

    it("should have the given row size", () => {
        const rows = 4, cellSize = 5;
        const grid = renderGrid({rows, cellSize});
        expect(grid.container.firstChild).toHaveStyle(
            `gridTemplateRows: repeat(${rows}, ${cellSize}px)`
        );
    });

    it("should have the right number of cells", () => {
        const rows = 5, columns = 10;
        const grid = renderGrid({rows, columns});
        expect(getAllCells(grid)).toHaveLength(rows*columns);
    });

    it("should call onCellPressed", () => {
        const onCellPressed = jest.fn();
        const grid = renderGrid({onCellPressed});
        fireEvent.click(getCellAt(grid, 0));
        expect(onCellPressed).toHaveBeenCalledTimes(1);
    });

    it("should call onCellPressed with cell's position", () => {
        const rows = 3, columns = 3, onCellPressed = jest.fn();
        const grid = renderGrid({rows, columns, onCellPressed});
        const cellColumn = 2, cellRow = 1, cellIndex = cellColumn + (cellRow * columns);
        fireEvent.click(getCellAt(grid, cellIndex));
        expect(onCellPressed).toHaveBeenCalledWith(cellRow, cellColumn);
    });

});
