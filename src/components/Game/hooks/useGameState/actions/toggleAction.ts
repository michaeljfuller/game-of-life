import type {GameStateActionBase} from "../gameStateActions";

/**
 * Flip the state of a specific cell.
 */
export function toggleAction(action: GameStateToggleAction, state: GameState) {
    const index = (action as GameStateToggleAction).index;
    const newState = [...state];
    newState[index] = !newState[index];
    return newState;
}
export interface GameStateToggleAction extends GameStateActionBase {
    type: 'toggle';
    index: number;
}
