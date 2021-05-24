import type {GameStateActionBase} from "../gameStateActions";
import tickGame from "./tickGameState/tickGame";

/**
 * Tick the state of the game, based on the game's rules.
 */
export function tickAction(action: GameStateTickAction, state: GameState) {
    return tickGame(state, action.rows, action.columns);
}
export interface GameStateTickAction extends GameStateActionBase {
    type: 'tick';
    columns: number;
    rows: number;
}
