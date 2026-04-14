import type { DragonType, RiskLevel, SlotMultiplier } from "../types/game";
import { DRAGONS } from "../config/constants";

export const getShuffledDragons = (): DragonType[] => {
  return [...DRAGONS].sort(() => Math.random() - 0.5);
};

export const getMultipliersForRisk = (risk: RiskLevel): SlotMultiplier[] => {
  switch (risk) {
    case "Low":
      return [1.2, 1.5, "LOST", 2, 1.8, 3];
    case "Medium":
      return [1.5, "LOST", 2, 3, "LOST", 5];
    case "High":
      return ["LOST", 2, "LOST", 5, "LOST", 10];
    case "Classic":
    default:
      return ["LOST", 3.5, 4, "LOST", 10, 7];
  }
};
