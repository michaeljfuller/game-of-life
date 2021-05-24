import React from "react";
import {Grid} from "./Grid/Grid";
import useGameState from "./hooks/useGameState";
import useSetStateOnResize from "./hooks/useSetStateOnResize";
import useGameTick from "./hooks/useGameTick";
import useToggleCellCallback from "./hooks/useToggleCellCallback";
import classes from "./Game.module.css";

export interface GameProps {
    rows: number;
    columns: number;
    cellSize?: number;
    ticksPerSecond?: number;
}

/**
 * Stateful component that handles the state of the game.
 * Sets up the Grid and decides the state of its Cells via some custom hooks.
 */
export function Game({
    rows,
    columns,
    cellSize = 15,
    ticksPerSecond = 0.5
}: GameProps) {
    const [gameState, dispatch] = useGameState();
    useGameTick(ticksPerSecond, rows, columns, dispatch); // Tick game state
    useSetStateOnResize(rows, columns, dispatch); // Update state if grid resized
    const onCellPressed = useToggleCellCallback(rows, columns, dispatch); // On cell pressed, toggle it
    const onClear = React.useCallback(() => dispatch({ type: 'clear' }), [dispatch]);
    const onRandomise = React.useCallback(() => dispatch({ type: 'randomise', aliveOdds: 0.3 }), [dispatch]);

    return <div data-testid='Game' className={classes.Game}>
        <Grid
            gameState={gameState}
            rows={rows}
            columns={columns}
            cellSize={cellSize}
            onCellPressed={onCellPressed}
        />
        <div className={classes.actions}>
            <button data-testid="randomise-btn" onClick={onRandomise}>Randomise</button>
            <button data-testid="clear-btn"     onClick={onClear}>Clear</button>
        </div>
    </div>;
}
