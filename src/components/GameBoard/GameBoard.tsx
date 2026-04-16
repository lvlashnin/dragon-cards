import React from "react";
import cx from "classnames";
import { useGameStore } from "../../store/gameStore";
import { Card } from "../Card/Card";
import "./GameBoard.css";

export const GameBoard: React.FC = () => {
  const {
    topDragons,
    bottomDragons,
    slotMultipliers,
    status,
    revealedIndices,
  } = useGameStore();

  const isIdle = status === "idle";
  const isResult = status === "result";

  const getColumnState = (index: number) => {
    if (!isResult) return null;
    const isMatch = topDragons[index] === bottomDragons[index];

    if (!isMatch) return "dim";
    if (slotMultipliers[index] === "LOST") return "fatal";
    return "win";
  };

  return (
    <div className="game-board">
      <div className="board-section">
        <div className="cards-row">
          {topDragons.map((dragon, index) => {
            const isFlipped =
              isIdle || isResult || revealedIndices.includes(index);

            return (
              <div key={`top-${index}`} className="card-slot">
                <Card
                  dragon={dragon}
                  isFlipped={isFlipped}
                  isDraggable={false}
                  resultState={getColumnState(index)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="board-section">
        <div className="cards-row">
          {bottomDragons.map((dragon, index) => {
            const colState = getColumnState(index);

            return (
              <div key={`bottom-${index}`} className="card-slot">
                <Card dragon={dragon} isFlipped={true} isDraggable={isIdle} />

                <div
                  className={cx("multiplier-badge", {
                    "text-green": colState === "win",
                    "text-red": colState === "fatal",
                    "is-dimmed": colState === "dim",
                  })}
                >
                  {slotMultipliers[index] === "LOST"
                    ? "LOST"
                    : `${slotMultipliers[index]}x`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
