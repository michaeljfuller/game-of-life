import type {GridProps} from "../../Grid/Grid";
import tickGameState from "./tickGameState";

export type GameStateActions = GridProps['cellStates'];

export type GameStateAction = GameStateSetAction | GameStateToggleAction | GameStateTickAction;
interface GameStateActionBase {
    type: string;
}

/**
 * Set the state to a specific value.
 */
export function setAction(action: GameStateSetAction) {
    return action.state;
}
export interface GameStateSetAction extends GameStateActionBase {
    type: 'set';
    state: GameStateActions;
}

/**
 * Toggle the state on a specific cell
 */
export function toggleAction(action: GameStateToggleAction, state: GameStateActions) {
    const index = (action as GameStateToggleAction).index;
    const newState = [...state];
    newState[index] = !newState[index];
    return newState;
}
export interface GameStateToggleAction extends GameStateActionBase {
    type: 'toggle';
    index: number;
}

/**
 * Tick the state of the game.
 */
export function tickAction(action: GameStateTickAction, state: GameStateActions) {
    return tickGameState(state, action.rows, action.columns);
}
export interface GameStateTickAction extends GameStateActionBase {
    type: 'tick';
    columns: number;
    rows: number;
}
