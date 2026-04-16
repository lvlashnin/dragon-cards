import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { GameBoard } from "./components/GameBoard/GameBoard";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <ControlPanel />
        <GameBoard />
      </div>
    </>
  );
}

export default App;
