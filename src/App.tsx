import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { GameBoard } from "./components/GameBoard/GameBoard";
import "./App.css";
import { Balance } from "./components/ControlPanel/Balance";

function App() {
  return (
    <>
      <div className="app-container">
        <ControlPanel />
        <GameBoard />
        <Balance className="mobile-balance" />
      </div>
    </>
  );
}

export default App;
