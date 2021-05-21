import type {GameState} from "./gameState";

/**
 * Returns a new version of the passed GameState, with cells flipped to conform to the rules.
 *
 * Any live cell with fewer than two live neighbours dies, as if by underpopulation.
 * Any live cell with two or three live neighbours lives on to the next generation.
 * Any live cell with more than three live neighbours dies, as if by overpopulation.
 * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 *
 * @link https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules
 */
export function tickGame(state: GameState, rows: number, columns: number): GameState {
    return state.map((_, index) => {
        const neighbours = countNeighbouringCells(index, state, rows, columns);
        const alive = state[index];

        if (alive) return neighbours === 2 || neighbours === 3;
        return neighbours === 3;
    });
}
export default tickGame;

export function countNeighbouringCells(
    cellIndex: number,
    state: GameState,
    rows: number,
    columns: number
) {
    let result = 0;
    const row = Math.floor(cellIndex / columns);
    const column = cellIndex % rows;

    // On an edge?
    const onTopEdge = row === 0;
    const onBottomEdge = row+1 === rows;
    const onLeftEdge = column === 0;
    const onRightEdge = column+1 === columns;

    if (!onTopEdge) {
        // Shift index back by the number of columns to reach Cell above. If true, count it.
        if (state[cellIndex - columns]) result++; // Top
        if (!onLeftEdge && state[(cellIndex - columns) - 1]) result++; // Top left
        if (!onRightEdge && state[(cellIndex - columns) + 1]) result++; // Top right
    }
    if (!onBottomEdge) {
        // Shift index forwards by the number of columns to reach Cell below. If true, count it.
        if (state[cellIndex + columns]) result++; // Bottom
        if (!onLeftEdge && state[(cellIndex + columns) - 1]) result++; // Bottom left
        if (!onRightEdge && state[(cellIndex + columns) + 1]) result++; // Bottom right
    }
    if (!onLeftEdge && state[cellIndex - 1]) result++; // Left
    if (!onRightEdge && state[cellIndex + 1]) result++; // Right

    return result;
}
