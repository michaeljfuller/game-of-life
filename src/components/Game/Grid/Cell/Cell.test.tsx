import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {Cell, CellProps} from "./Cell";
import styles from "./Cell.module.css";

function renderCell(partial?: Partial<CellProps>) {
    const props: CellProps = Object.assign({
        row: 0,
        column: 0,
        onPress: () => {},
        alive: false,
    }, partial);
    return render(<Cell {...props} />);
}

describe("Cell", () => {

    it("can be created", () => {
        const row = 1, column = 2;
        const cell = renderCell({ row, column });
        expect(cell.container.firstChild).toBeDefined();
        expect(cell.container.firstChild).toHaveClass(styles.cell);
        expect(cell.container.firstChild).toHaveAttribute('data-testid', `Cell[${row},${column}]`);
    });

    it("should have the right style if dead", () => {
        const cell = renderCell({ alive: false });
        expect(cell.container.firstChild).not.toHaveClass(styles.alive);
    });

    it("should have the right style if alive", () => {
        const cell = renderCell({ alive: true });
        expect(cell.container.firstChild).toHaveClass(styles.alive);
    });

    it("should respond to clicks", () => {
        const onPress = jest.fn();
        const cell = renderCell({ onPress });
        fireEvent.mouseDown(cell.getByRole("button"));
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("should pass back row + column when clicked", () => {
        const onPress = jest.fn(), row = 1, column = 2;
        const cell = renderCell({ onPress, row, column });
        fireEvent.mouseDown(cell.getByRole("button"));
        expect(onPress).toHaveBeenCalledWith(row, column);
    });

});
