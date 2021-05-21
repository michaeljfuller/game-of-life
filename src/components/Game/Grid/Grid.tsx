import React from "react";
import {Cell as PureCell, CellProps} from "../Cell/Cell";
import styles from "./Grid.module.css";

const Cell = React.memo(PureCell);

export interface GridProps {
    rows: number;
    columns: number;
    cellSize?: number;
    onCellPressed?: CellProps['onPress'];
}
export function Grid({
    rows,
    columns,
    cellSize=50,
    onCellPressed,
}: GridProps) {
    const [isAlive, setIsAlive] = React.useState(false); // TODO Move to Game and make array

    const onPress = React.useCallback((row: number, column: number) => {
        console.log(`Pressed #${column + (row * columns)} (${column}x${row})`);
        setIsAlive(!isAlive);
        onCellPressed && onCellPressed(column, row);
    }, [isAlive, setIsAlive, columns]);

    const cells = forEachCell(rows, columns, (row, column, index) => {
        return <Cell
            key={`${row}x${column}`}
            alive={isAlive}
            row={row}
            column={column}
            onPress={onPress}
        />;
    });

    return <div
        className={styles.Grid}
        style={{
            gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
    >
        {cells}
    </div>;
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
