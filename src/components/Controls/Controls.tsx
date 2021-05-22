import React, {FormEvent} from "react";
import styles from "./Controls.module.css";

const ROWS_MIN = 12, COLUMNS_MIN = 12;
const ROWS_MAX = 50, COLUMNS_MAX = 50;
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
export function Controls(props: ControlsProps) {
    const onRows = useNumberInput(props.onSetRows);
    const onColumns = useNumberInput(props.onSetColumns);
    const onSpeed = useNumberInput(props.onSetSpeed);

    return <div className={styles.Controls}>
        <div>

            <button data-testid="pause-btn" onClick={props.onPause} disabled={!props.playing}>Pause</button>
            <button data-testid="play-btn"  onClick={props.onPlay} disabled={props.playing}>Play</button>

            <label htmlFor="columns-input">Columns:</label>
            <input
                id="columns-input"
                data-testid="columns-input"
                onInput={onColumns}
                value={props.columns}
                type="number"
                min={ROWS_MIN}
                max={ROWS_MAX}
            />

            <label htmlFor="rows-input">Rows:</label>
            <input
                id="rows-input"
                data-testid="rows-input"
                onInput={onRows}
                value={props.rows}
                type="number"
                min={COLUMNS_MIN}
                max={COLUMNS_MAX}
            />

        </div>
        <div>
            <label htmlFor="speed-input">Speed: </label>
            <input
                id="speed-input"
                data-testid="speed-input"
                onInput={onSpeed}
                value={props.speed}
                type="range"
                step={SPEED_STEP}
                min={SPEED_MIN}
                max={SPEED_MAX}
            /> {/** TODO Make slider exponential */}
            <span>{props.speed.toFixed(1)} ticks per second.</span>

        </div>
    </div>;
}

function useNumberInput(
    callback: (num: number) => void
) {
    return React.useCallback((event: FormEvent) => {
        const input = event.target as HTMLInputElement;
        const number = input.valueAsNumber;
        callback(number);
    }, [callback]);
}
