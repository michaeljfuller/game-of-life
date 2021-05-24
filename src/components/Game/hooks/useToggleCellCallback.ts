import React from "react";
import {GameStateDispatcher} from "./useGameState";

/**
 * Creates a callback that, when called with a column and row, toggles the state of a Cell.
 */
export default function useToggleCellCallback(
    rows: number,
    columns: number,
    dispatcher: GameStateDispatcher
) {
    return React.useCallback((row: number, column: number) => {
        dispatcher({
            type: 'toggle',
            index: column + (row * columns),
        });
    }, [columns, dispatcher]);
}
