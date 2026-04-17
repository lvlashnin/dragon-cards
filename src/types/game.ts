export type RiskLevel = "Low" | "Medium" | "High" | "Classic";
export type GameState = "idle" | "revealing" | "result";
export type DragonType = "fire" | "ice" | "storm" | "earth" | "shadow" | "wind";
export type SlotMultiplier = number | "LOST";
export type BetQuickAction = "half" | "double" | "max";

export interface GameStore {
  balance: number;
  betAmount: number;
  risk: RiskLevel;
  status: GameState;
  slotMultipliers: SlotMultiplier[];
  topDragons: DragonType[];
  bottomDragons: DragonType[];
  revealedIndices: number[];
  setBetAmount: (amount: number) => void;
  setRisk: (risk: RiskLevel) => void;
  swapBottomDragons: (dragIndex: number, dropIndex: number) => void;
  placeBet: () => void;
  finishReveal: () => void;
  resetRound: () => void;
  halfBet: () => void;
  doubleBet: () => void;
  maxBet: () => void;
}
