import type {GridProps} from "./Grid/Grid";

type CellStates = GridProps['cellStates'];

export type CellReducerAction = CellReducerSetAction | CellReducerToggleAction;
interface CellReducerActionBase {
    type: 'toggle'|'set';
}

export function gameStateReducer(cellStates: CellStates, action: CellReducerAction) {
    switch (action.type) {
        case 'set': return setAction(action as CellReducerSetAction);
        case 'toggle': return toggleAction(action as CellReducerToggleAction, cellStates);
        // TODO 'tick'
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
    state: CellStates;
}

/**
 * Toggle the state on a specific cell
 */
function toggleAction(action: CellReducerToggleAction, cellStates: CellStates) {
    const index = (action as CellReducerToggleAction).index;
    const newState = [...cellStates];
    newState[index] = !newState[index];
    return newState;
}
export interface CellReducerToggleAction extends CellReducerActionBase {
    index: number;
}
