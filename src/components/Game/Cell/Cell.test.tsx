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
        const cell = renderCell();
        expect(cell.getByRole("button")).toHaveClass(styles.cell);
    });

    it("should have the right style if dead", () => {
        const cell = renderCell({ alive: false });
        expect(cell.getByRole("button")).not.toHaveClass(styles.alive);
    });

    it("should have the right style if alive", () => {
        const cell = renderCell({ alive: true });
        expect(cell.getByRole("button")).toHaveClass(styles.alive);
    });

    it("should respond to clicks", () => {
        const onPress = jest.fn();
        const cell = renderCell({ onPress });
        fireEvent.click(cell.getByRole("button"));
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("should pass back row + column when clicked", () => {
        const onPress = jest.fn(), row = 1, column = 2;
        const cell = renderCell({ onPress, row, column });
        fireEvent.click(cell.getByRole("button"));
        expect(onPress).toHaveBeenCalledWith(row, column);
    });

});
