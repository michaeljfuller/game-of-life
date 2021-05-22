/** Represents if a Cell is dead or alive. */
declare type CellAlive = boolean;

/**
 * Represents the state of every Cell in the Game.
 * 1-dimensional array working horizontally first from the top-left.
 */
declare type GameState = CellAlive[];

/**
 * Represents the state of every Cell in the Game.
 * 2-dimensional array of rows from top to bottom, then columns from left to right.
 */
declare type GameState2D = CellAlive[][];
