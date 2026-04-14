export type RiskLevel = "Low" | "Medium" | "High" | "Classic";
export type GameState = "idle" | "revealing" | "result";
export type DragonType = "fire" | "ice" | "storm" | "earth" | "shadow" | "wind";
export type SlotMultiplier = number | "LOST";

export interface GameStore {
  balance: number;
  betAmount: number;
  risk: RiskLevel;
  status: GameState;
  slotMultipliers: SlotMultiplier[];
  topDragons: DragonType[];
  bottomDragons: DragonType[];
  setBetAmount: (amount: number) => void;
  setRisk: (risk: RiskLevel) => void;
  reorderBottomDragons: (newDragons: DragonType[]) => void;
  placeBet: () => void;
  finishReveal: () => void;
  resetRound: () => void;
}
