import React from "react";
import {Cell as PureCell, CellProps} from "../Cell/Cell";
import styles from "./Grid.module.css";

const Cell = React.memo(PureCell);

export interface GridProps {
    cellStates: boolean[];
    rows: number;
    columns: number;
    cellSize?: number;
    onCellPressed?: CellProps['onPress'];
}

/**
 * Grid lays out each Cell.
 */
export function Grid({
    cellStates,
    rows,
    columns,
    cellSize=50,
    onCellPressed,
}: GridProps) {

    const cells = forEachCell(rows, columns, (row, column, index) => {
        return <Cell
            key={`${row}x${column}`}
            alive={cellStates[index]}
            row={row}
            column={column}
            onPress={onCellPressed}
        />;
    });

    return <div
        data-testid='Grid'
        className={styles.Grid}
        style={{
            gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
    >{cells}</div>;
}

function forEachCell<
    Callback extends (row: number, column: number, index: number) => any
>(
    rows: number,
    columns: number,
    callback: Callback
) {
    const result = [] as ReturnType<Callback>[];
    let index = 0;
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            result.push(callback(row, column, index++));
        }
    }
    return result;
}
