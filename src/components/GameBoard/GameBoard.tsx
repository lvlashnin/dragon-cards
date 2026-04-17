import React from "react";
import cx from "classnames";
import { useGameStore } from "../../store/gameStore";
import { Card } from "../Card/Card";
import { playSound } from "../../utils/soundManager";
import "./GameBoard.css";

export const GameBoard: React.FC = () => {
  const {
    topDragons,
    bottomDragons,
    slotMultipliers,
    status,
    revealedIndices,
    swapBottomDragons,
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

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (!isIdle) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("draggedCardIndex", index.toString());
    e.dataTransfer.effectAllowed = "move";
    playSound("grab");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isIdle) return;

    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number,
  ) => {
    if (!isIdle) return;
    e.preventDefault();
    const dragIndexString = e.dataTransfer.getData("draggedCardIndex");
    if (!dragIndexString) return;
    const dragIndex = parseInt(dragIndexString, 10);
    swapBottomDragons(dragIndex, dropIndex);
    playSound("drop");
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
              <div
                key={`bottom-${index}`}
                className="card-slot"
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
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
