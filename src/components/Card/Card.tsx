import React from "react";
import cx from "classnames";
import type { DragonType } from "../../types/game";
import "./Card.css";

interface CardProps {
  dragon?: DragonType;
  isFlipped: boolean;
  isDraggable?: boolean;
  resultState?: "win" | "fatal" | "dim" | null;
}

export const Card: React.FC<CardProps> = ({
  dragon,
  isFlipped,
  isDraggable = false,
  resultState = null,
}) => {
  return (
    <div
      className={cx("card", {
        "is-draggable": isDraggable,
        [`is-${resultState}`]: resultState,
      })}
      draggable={isDraggable}
    >
      <div className={cx("card-inner", { "is-flipped": isFlipped })}>
        <div className="card-face card-front">
          {dragon && <span className="dragon-placeholder">🐉 {dragon}</span>}
        </div>

        <div className="card-face card-back">
          <span className="card-logo">DC</span>
        </div>
      </div>
    </div>
  );
};
