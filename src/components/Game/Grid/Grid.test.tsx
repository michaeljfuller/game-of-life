import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {Grid, GridProps} from "./Grid";

function renderGrid(partial?: Partial<GridProps>) {
    const props: GridProps = Object.assign({
        rows: 1,
        columns: 3,
    }, partial);
    return render(<Grid {...props} />);
}

describe("Grid", () => {

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
        expect(grid.container.firstChild?.childNodes).toHaveLength(rows*columns);
    });

    it("should call onCellPressed", () => {
        const onCellPressed = jest.fn();
        const grid = renderGrid({onCellPressed});
        fireEvent.click(grid.getAllByRole("button")[0]);
        expect(onCellPressed).toHaveBeenCalledTimes(1);
    });
    it("should call onCellPressed with cell's position", () => {
        const rows = 3, columns = 3, onCellPressed = jest.fn();
        const grid = renderGrid({rows, columns, onCellPressed});
        const cells = grid.getAllByRole("button");
        const cellColumn = 2, cellRow = 1, cellIndex = cellColumn + (cellRow * columns);
        fireEvent.click(cells[cellIndex]);
        expect(onCellPressed).toHaveBeenCalledWith(cellColumn, cellRow);
    });

});
