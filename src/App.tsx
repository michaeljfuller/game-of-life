import React from 'react';
import {Game} from "./components/Game/Game";
import {Controls} from "./components/Controls/Controls";

function App() {
  return (
    <div>
        <h1>Conway's Game of Life</h1>
        <Controls
            onPause={() => console.log('onPause')}
            onPlay={() => console.log('onPlay')}
            onSetRows={n => console.log('onSetRows', n)}
            onSetColumns={n => console.log('onSetColumns', n)}
            onSetSpeed={n => console.log('onSetSpeed', n)}
        />
        <Game rows={12} columns={20} />
    </div>
  );
}

export default App;
