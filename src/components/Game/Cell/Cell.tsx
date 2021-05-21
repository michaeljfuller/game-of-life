import React from "react";
import styles from "./Cell.module.css";

export interface CellProps {
    row: number;
    column: number;
    alive: boolean;
    onPress?: (row: number, column: number) => void;
}
export function Cell(props: CellProps) {
    const isAlive = props.alive;
    const onClick = () => {
        props.onPress && props.onPress(props.row, props.column);
    }

    return <button
        role="button"
        className={[
            styles.cell,
            isAlive ? styles.alive : undefined
        ].filter(v => v).join(' ')}
        onClick={props.onPress && onClick}
    />;
}
