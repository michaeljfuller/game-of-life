import React from 'react';
import {Game} from "./components/Game/Game";

function App() {
  return (
    <div>
        <h1>Conway's Game of Life</h1>
        <Game rows={12} columns={20} />
    </div>
  );
}

export default App;
