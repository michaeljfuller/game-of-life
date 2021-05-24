import {Dispatch} from "react";
import {GameStateSetAction} from "./actions/setAction";
import {GameStateToggleAction} from "./actions/toggleAction";
import {GameStateTickAction} from "./actions/tickAction";
import {GameStateClearAction} from "./actions/clearAction";
import {GameStateRandomiseAction} from "./actions/randomiseAction";

export type GameStateAction = GameStateSetAction | GameStateToggleAction | GameStateTickAction | GameStateClearAction | GameStateRandomiseAction;
export interface GameStateActionBase {
    type: string;
}
export type GameStateDispatcher = Dispatch<GameStateAction>;

export * from "./actions/setAction";
export * from "./actions/toggleAction";
export * from "./actions/tickAction";
export * from "./actions/clearAction";
export * from "./actions/randomiseAction";

