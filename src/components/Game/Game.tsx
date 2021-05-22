import React from "react";
import {Grid} from "./Grid/Grid";
import useGameState from "./hooks/useGameState";
import useSetStateOnResize from "./hooks/useSetStateOnResize";
import useGameTick from "./hooks/useGameTick";
import useToggleCellCallback from "./hooks/useToggleCellCallback";

export interface GameProps {
    rows: number;
    columns: number;
    cellSize?: number;
    ticksPerSecond?: number;
}

/**
 * The component that manages the game state.
 */
export function Game({
    rows,
    columns,
    cellSize = 20,
    ticksPerSecond = 0.5
}: GameProps) {
    const [gameState, dispatch] = useGameState();
    useGameTick(ticksPerSecond, rows, columns, dispatch); // Tick game state
    useSetStateOnResize(rows, columns, dispatch); // Update state if grid resized
    const onCellPressed = useToggleCellCallback(rows, columns, dispatch); // On cell pressed, toggle it

    return <div data-testid='Game'>
        <Grid
            gameState={gameState}
            rows={rows}
            columns={columns}
            cellSize={cellSize}
            onCellPressed={onCellPressed}
        />
    </div>;
}
