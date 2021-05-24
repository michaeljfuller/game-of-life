import React from "react";
import styles from "./Cell.module.css";

export interface CellProps {
    row: number;
    column: number;
    alive: CellAlive;
    onPress?: (row: number, column: number) => void;
}

/**
 * A stateless component that represents a Cell - dead or alive.
 */
export function Cell({
    alive, column, row, onPress
}: CellProps) {
    const onPressHandler = () => {
        onPress && onPress(row, column);
    }

    return <button
        data-testid={`Cell[${row},${column}]`}
        className={[
            styles.cell,
            alive ? styles.alive : undefined
        ].filter(v => v).join(' ')}
        onMouseDown={onPress && onPressHandler}
    >{/*column.toString().padStart(2, '0')}<br />{row.toString().padStart(2, '0')*/}</button>;
}
