import React from 'react';
import {Game} from "./components/Game/Game";
import {Controls} from "./components/Controls/Controls";

// TODO Add Error Boundary

function App() {
    const playing = useSetBool(false);
    const [rows, setRows] = React.useState(12);
    const [columns, setColumns] = React.useState(12);
    const [speed, setSpeed] = React.useState(1);
    return <div>
        <h1>Conway's Game of Life</h1>
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
        <Game
            rows={rows}
            columns={columns}
            ticksPerSecond={speed}
        />
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
