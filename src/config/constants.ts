import type { DragonType, RiskLevel, SlotMultiplier } from "../types/game";

export const INITIAL_BALANCE = 100000.0;
export const MAX_BET = 1000;
export const MIN_BET = 1;

export const CARD_COUNT = 6;

export const DRAGONS: DragonType[] = [
  "fire",
  "ice",
  "storm",
  "earth",
  "shadow",
  "wind",
];

export const RISKS: RiskLevel[] = ["Low", "Medium", "High", "Classic"];

export const RISK_MULTIPLIERS: Record<RiskLevel, SlotMultiplier[]> = {
  Low: [1.2, 1.5, "LOST", 2, 1.8, 3],
  Medium: [1.5, "LOST", 2, 3, "LOST", 5],
  High: ["LOST", 2, "LOST", 5, "LOST", 10],
  Classic: ["LOST", 3.5, 4, "LOST", 10, 7],
};
