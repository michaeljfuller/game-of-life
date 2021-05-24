import React, {FormEvent} from "react";
import classes from "./Controls.module.css";

const ROWS_MIN = 10, COLUMNS_MIN = 10;
const ROWS_MAX = 80, COLUMNS_MAX = 80;
const SPEED_MIN = 0.1, SPEED_MAX = 10, SPEED_STEP = 0.1;

export interface ControlsProps {
    playing: boolean;
    rows: number;
    columns: number;
    speed: number;

    onPause: () => void;
    onPlay: () => void;
    onSetRows: (rows: number) => void;
    onSetColumns: (columns: number) => void;
    onSetSpeed: (speed: number) => void;
}

/**
 * A stateless component that contains controls that let the user;
 * - Play/pause
 * - Set Grid size
 * - Set the Game's speed.
 */
export function Controls({
    playing,
    rows,
    columns,
    speed,

    onPause,
    onPlay,
    onSetRows,
    onSetColumns,
    onSetSpeed,
}: ControlsProps) {
    const onRows = useNumberInputCallback(onSetRows);
    const onColumns = useNumberInputCallback(onSetColumns);
    const onSpeed = useNumberInputCallback(onSetSpeed);
    const togglePlay = React.useCallback(() => {
        playing ? onPause() : onPlay();
    },[playing, onPlay, onPause])

    return <div className={classes.Controls}>
        <div className={classes.center}>

            <label htmlFor="columns-input">Columns:</label>
            <input
                id="columns-input"
                data-testid="columns-input"
                onInput={onColumns}
                value={columns}
                type="number"
                min={ROWS_MIN}
                max={ROWS_MAX}
            />

            <label htmlFor="rows-input">Rows:</label>
            <input
                id="rows-input"
                data-testid="rows-input"
                onInput={onRows}
                value={rows}
                type="number"
                min={COLUMNS_MIN}
                max={COLUMNS_MAX}
            />

        </div>
        <div className={classes.speedRow+' '+classes.center}>
            <label htmlFor="speed-input">Speed: </label>
            <input
                id="speed-input"
                data-testid="speed-input"
                onInput={onSpeed}
                value={speed}
                type="range"
                step={SPEED_STEP}
                min={SPEED_MIN}
                max={SPEED_MAX}
            /> {/** TODO Make slider exponential */}
            <span>{speed.toFixed(1)} ticks per second.</span>

        </div>

        <div className={classes.center}>
            <button data-testid="play-toggle" onClick={togglePlay} className={classes.playButton}>
                {playing ? 'Pause' : 'Play'}
            </button>
        </div>
    </div>;
}

function useNumberInputCallback(
    callback: (num: number) => void
) {
    return React.useCallback((event: FormEvent) => {
        const input = event.target as HTMLInputElement;
        const number = input.valueAsNumber;
        callback(number || 0);
    }, [callback]);
}
