import React from "react";
import {GameStateToggleAction} from "./useGameState/gameStateActions";

export default function useToggleCellCallback(
    rows: number,
    columns: number,
    dispatcher: React.Dispatch<GameStateToggleAction>
) {
    return React.useCallback((row: number, column: number) => {
        dispatcher({
            type: 'toggle',
            index: column + (row * columns),
        });
    }, [columns, dispatcher]);
}
