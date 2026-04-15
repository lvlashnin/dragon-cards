import React from "react";
import { useGameStore } from "../store/gameStore";

export const GameBoard: React.FC = () => {
  const { topDragons, bottomDragons, slotMultipliers } = useGameStore();

  return (
    <div style={{ padding: "20px", color: "#000000ff" }}>
      <h2>top row</h2>
      <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
        {topDragons.map((dragon, i) => (
          <div
            key={`top-${i}`}
            style={{ border: "1px solid gray", padding: "10px" }}
          >
            [ hiden: {dragon} ]
          </div>
        ))}
      </div>

      <h2>bootm row</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        {bottomDragons.map((dragon, i) => (
          <div
            key={`bottom-${i}`}
            style={{ border: "1px solid white", padding: "10px" }}
          >
            <div>🐉 {dragon}</div>
            <div style={{ color: "red", marginTop: "5px" }}>
              multip: {slotMultipliers[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
