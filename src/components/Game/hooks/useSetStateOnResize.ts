import React from "react";
import {GameStateSetAction} from "./useGameState/gameStateActions";

export default function useSetStateOnResize(
    rows: number,
    columns: number,
    dispatcher: React.Dispatch<GameStateSetAction>
) {
    React.useEffect(() => {
        dispatcher({
            type: 'set',
            state: Array(rows * columns).fill(false),
        });
    }, [rows, columns, dispatcher]);
}
