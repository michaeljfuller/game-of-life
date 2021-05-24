import type {GameStateActionBase} from "../gameStateActions";

/**
 * Clear the Grid.
 */
export function clearAction(action: GameStateClearAction, state: GameState) {
    return Array(state.length).fill(false);
}
export interface GameStateClearAction extends GameStateActionBase {
    type: 'clear';
}
