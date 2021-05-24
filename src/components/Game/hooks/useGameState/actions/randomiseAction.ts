import type {GameStateActionBase} from "../gameStateActions";

/**
 * Randomise the Grid.
 * The action's `aliveOdds` is a number, between 0 and 1, determining the odds a Cell will be alive.
 */
export function randomiseAction(action: GameStateRandomiseAction, state: GameState) {
    return state.map(() => Math.random() < action.aliveOdds);
}

export interface GameStateRandomiseAction extends GameStateActionBase {
    type: 'randomise';
    aliveOdds: number;
}
