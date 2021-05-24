import React from "react";
import {GameStateDispatcher} from "./useGameState";

/**
 * Uses the passed GameStateDispatcher to tick the game based on the passed `ticksPerSecond`.
 */
export default function useGameTick(
    ticksPerSecond: number,
    rows: number,
    columns: number,
    dispatcher: GameStateDispatcher
) {
    React.useEffect(() => {
        if (ticksPerSecond > 0) {
            const intervalId = setInterval(
                () => dispatcher({type: 'tick', columns, rows}),
                1000 / ticksPerSecond
            );
            return () => clearInterval(intervalId);
        }
    }, [ticksPerSecond, columns, rows, dispatcher]);
}
