import {Dispatch} from "react";
import tickGameState from "./tickGameState";

export type GameStateAction = GameStateSetAction | GameStateToggleAction | GameStateTickAction | GameStateClearAction | GameStateRandomiseAction;
interface GameStateActionBase {
    type: string;
}
export type GameStateDispatcher = Dispatch<GameStateAction>;

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

/**
 * Toggle the state on a specific cell
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

/**
 * Tick the state of the game.
 */
export function tickAction(action: GameStateTickAction, state: GameState) {
    return tickGameState(state, action.rows, action.columns);
}
export interface GameStateTickAction extends GameStateActionBase {
    type: 'tick';
    columns: number;
    rows: number;
}

/**
 * Clear the Grid
 */
export function clearAction(action: GameStateClearAction, state: GameState) {
    return Array(state.length).fill(false);
}
export interface GameStateClearAction extends GameStateActionBase {
    type: 'clear';
}

/**
 * Randomise the Grid
 */
export function randomiseAction(action: GameStateRandomiseAction, state: GameState) {
    return state.map(() => Math.random() < action.aliveOdds);
}
export interface GameStateRandomiseAction extends GameStateActionBase {
    type: 'randomise';
    aliveOdds: number;
}
