import React from "react";
import {GameStateDispatcher} from "./useGameState";

/**
 * When the component mounts or changes size, update the grid.
 */
export default function useSetStateOnResize(
    rows: number,
    columns: number,
    dispatcher: GameStateDispatcher
) {
    React.useEffect(() => {
        dispatcher({
            type: 'set',
            state: Array(rows * columns).fill(false), // Create an empty grid of the passed size.
        });
    }, [rows, columns, dispatcher]);
}
