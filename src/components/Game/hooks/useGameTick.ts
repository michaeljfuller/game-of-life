import React from "react";
import {GameStateTickAction} from "./useGameState/gameStateActions";

export default function useGameTick(
    ticksPerSecond: number,
    rows: number,
    columns: number,
    dispatcher: React.Dispatch<GameStateTickAction>
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
