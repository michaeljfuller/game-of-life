import React, {FormEvent} from "react";
import styles from "./Controls.module.css";

const ROWS_MIN = 12, COLUMNS_MIN = 12;
const ROWS_MAX = 50, COLUMNS_MAX = 50;
const ROWS_INIT = 15, COLUMNS_INIT = 15;
const SPEED_MIN = 0.5, SPEED_MAX = 10, SPEED_INIT = 1, SPEED_STEP = 0.1;

export interface ControlsProps {
    onPause: () => void;
    onPlay: () => void;
    onSetRows: (rows: number) => void;
    onSetColumns: (columns: number) => void;
    onSetSpeed: (speed: number) => void;
}
export function Controls(props: ControlsProps) {
    const rows = useNumberInput(ROWS_INIT, props.onSetRows);
    const columns = useNumberInput(COLUMNS_INIT, props.onSetColumns);
    const speed = useNumberInput(SPEED_INIT, props.onSetSpeed);

    return <div className={styles.Controls}>
        <div>

            <button data-testid="pause-btn" onClick={props.onPause}>Pause</button>
            <button data-testid="play-btn"  onClick={props.onPlay}>Play</button>

            <label htmlFor="columns-input">Columns:</label>
            <input
                id="columns-input"
                data-testid="columns-input"
                onInput={columns.callback}
                value={columns.value}
                type="number"
                min={ROWS_MIN}
                max={ROWS_MAX}
            />

            <label htmlFor="rows-input">Rows:</label>
            <input
                id="rows-input"
                data-testid="rows-input"
                onInput={rows.callback}
                value={rows.value}
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
                onInput={speed.callback}
                value={speed.value}
                type="range"
                step={SPEED_STEP}
                min={SPEED_MIN}
                max={SPEED_MAX}
            /> {/** TODO Make slider exponential */}
            <span>{speed.value.toFixed(1)} ticks per second.</span>

        </div>
    </div>;
}

function useNumberInput(
    initialValue: number,
    handler: (num: number) => void
) {
    const [value, setValue] = React.useState(initialValue)
    const callback = React.useCallback((event: FormEvent) => {
        const input = event.target as HTMLInputElement;
        const number = input.valueAsNumber;
        setValue(number);
        handler && handler(number);
    }, [handler, setValue]);
    return { value, setValue, callback };
}
