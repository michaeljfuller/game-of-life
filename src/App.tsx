import React from 'react';
import {Game} from "./components/Game/Game";
import {Controls} from "./components/Controls/Controls";
import styles from "./App.module.css";

// TODO Add Error Boundary

function App() {
    const playing = useSetBool(false);
    const [rows, setRows] = React.useState(25);
    const [columns, setColumns] = React.useState(25);
    const [speed, setSpeed] = React.useState(3);

    return <div className={styles.App}>

        <h1>Conway's Game of Life</h1>

        <div className={styles.controls}>
            <Controls
                playing={playing.value}
                rows={rows}
                columns={columns}
                speed={speed}

                onPause={playing.setFalse}
                onPlay={playing.setTrue}
                onSetRows={setRows}
                onSetColumns={setColumns}
                onSetSpeed={setSpeed}
            />
        </div>

        <div className={styles.game}>
            <Game
                rows={rows}
                columns={columns}
                ticksPerSecond={playing.value ? speed : 0}
            />
        </div>

    </div>;
}

export default App;

function useSetBool(
    initialValue: boolean
) {
    const [value, setValue] = React.useState(initialValue);
    const setTrue = React.useCallback(() => setValue(true), [setValue]);
    const setFalse = React.useCallback(() => setValue(false), [setValue]);
    return { value, setValue, setTrue, setFalse };
}
