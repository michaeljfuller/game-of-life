import type {GridProps} from "./Grid/Grid";
import tickGameState from "./tickGameState";

export type GameState = GridProps['cellStates'];

export type CellReducerAction = CellReducerSetAction | CellReducerToggleAction | CellReducerTickAction;
interface CellReducerActionBase {
    type: string;
}

export function gameStateReducer(state: GameState, action: CellReducerAction) {
    switch (action.type) {
        case 'set': return setAction(action);
        case 'toggle': return toggleAction(action, state);
        case 'tick': return tickAction(action, state);
    }
    console.warn('Unknown gameStateReducer action', action);
    return state;
}

/**
 * Set the state to a specific value.
 */
function setAction(action: CellReducerSetAction) {
    return action.state;
}
export interface CellReducerSetAction extends CellReducerActionBase {
    type: 'set';
    state: GameState;
}

/**
 * Toggle the state on a specific cell
 */
function toggleAction(action: CellReducerToggleAction, state: GameState) {
    const index = (action as CellReducerToggleAction).index;
    const newState = [...state];
    newState[index] = !newState[index];
    return newState;
}
export interface CellReducerToggleAction extends CellReducerActionBase {
    type: 'toggle';
    index: number;
}

/**
 * Tick the state of the game.
 */
function tickAction(action: CellReducerTickAction, state: GameState) {
    return tickGameState(state, action.rows, action.columns);
}
export interface CellReducerTickAction extends CellReducerActionBase {
    type: 'tick';
    columns: number;
    rows: number;
}
