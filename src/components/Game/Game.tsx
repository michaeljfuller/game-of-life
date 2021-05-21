import React from "react";
import {Grid} from "./Grid/Grid";
import {gameStateReducer} from "./gameState";

export interface GameProps {
    rows: number;
    columns: number;
    cellSize?: number;
}

/**
 * The component that manages the game state.
 */
export function Game({
    rows,
    columns,
    cellSize = 20,
}: GameProps) {
    const [gameState, dispatch] = React.useReducer(gameStateReducer, []);

    // On change size, reset state.
    React.useEffect(() => {
        dispatch({
            type: 'set',
            state: Array(rows * columns).fill(false),
        });
    }, [rows, columns]);

    // On cell pressed, toggle it.
    const onCellPressed = React.useCallback((row: number, column: number) => {
        dispatch({
            type: 'toggle',
            index: column + (row * columns),
        });
    }, [columns, dispatch]);

    return <div
        data-testid='Game'
    >
        <Grid
            cellStates={gameState}
            rows={rows}
            columns={columns}
            cellSize={cellSize}
            onCellPressed={onCellPressed}
        />
    </div>;
}
