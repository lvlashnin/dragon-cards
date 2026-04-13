export type RiskLevel = "Low" | "Medium" | "High" | "Classic";

export type GameState = "idle" | "placing" | "revealing" | "result";

export interface CardData {
  id: string;
  type: "multiplier" | "lost";
  value: number;
  dragonId?: string;
}

export interface GameStore {
  balance: number;
  betAmount: number;
  risk: RiskLevel;
  status: GameState;
  topCards: CardData[];
  bottomCards: CardData[];
  setBetAmount: (amount: number) => void;
  setRisk: (risk: RiskLevel) => void;
  placeBet: () => void;
  confirmPlacement: () => void;
  reorderBottomCards: (newCards: CardData[]) => void;
}
