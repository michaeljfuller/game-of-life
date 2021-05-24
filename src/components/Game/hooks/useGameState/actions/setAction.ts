import type {GameStateActionBase} from "../gameStateActions";

/**
 * Set the state to a specific value.
 */
export function setAction(action: GameStateSetAction) {
    return action.state;
}
export interface GameStateSetAction extends GameStateActionBase {
    type: 'set';
    state: GameState;
}
