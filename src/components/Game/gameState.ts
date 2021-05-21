import type {GridProps} from "./Grid/Grid";

type CellStates = GridProps['cellStates'];

export type CellReducerAction = CellReducerSetAction | CellReducerToggleAction | CellReducerTickAction;
interface CellReducerActionBase {
    type: string;
}

export function gameStateReducer(cellStates: CellStates, action: CellReducerAction) {
    switch (action.type) {
        case 'set': return setAction(action);
        case 'toggle': return toggleAction(action, cellStates);
        case 'tick': return tickAction(action, cellStates);
    }
    console.warn('Unknown gameStateReducer action', action);
    return cellStates;
}

/**
 * Set the state to a specific value.
 */
function setAction(action: CellReducerSetAction) {
    return action.state;
}
export interface CellReducerSetAction extends CellReducerActionBase {
    type: 'set';
    state: CellStates;
}

/**
 * Toggle the state on a specific cell
 */
function toggleAction(action: CellReducerToggleAction, state: CellStates) {
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
 * Tick the state of the game
 */
function tickAction(action: CellReducerTickAction, state: CellStates) {
    console.log('tickAction');
    return new Array(state.length).fill(false)
}
export interface CellReducerTickAction extends CellReducerActionBase {
    type: 'tick';
}
