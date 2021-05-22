import React from "react";
import {
    GameStateAction,
    setAction,
    toggleAction,
    tickAction,
    clearAction,
    randomiseAction
} from "./useGameState/gameStateActions";

export default function useGameState() {
    return React.useReducer(gameStateReducer, []);
}

function gameStateReducer(state: GameState, action: GameStateAction) {
    switch (action.type) {
        case 'set': return setAction(action);
        case 'toggle': return toggleAction(action, state);
        case 'tick': return tickAction(action, state);
        case 'clear': return clearAction(action, state);
        case 'randomise': return randomiseAction(action, state);
    }
    console.warn('Unknown gameStateReducer action', action);
    return state;
}
