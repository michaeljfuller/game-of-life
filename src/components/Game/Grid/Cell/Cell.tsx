import React from "react";
import styles from "./Cell.module.css";

export interface CellProps {
    row: number;
    column: number;
    alive: CellAlive;
    onPress?: (row: number, column: number) => void;
}

/**
 * A game Cell that is either dead or alive.
 */
export function Cell({
    alive, column, row, onPress
}: CellProps) {
    const onClick = () => {
        onPress && onPress(row, column);
    }

    return <button
        data-testid={`Cell[${row},${column}]`}
        className={[
            styles.cell,
            alive ? styles.alive : undefined
        ].filter(v => v).join(' ')}
        onClick={onPress && onClick}
    >{/*column.toString().padStart(2, '0')}<br />{row.toString().padStart(2, '0')*/}</button>;
}
