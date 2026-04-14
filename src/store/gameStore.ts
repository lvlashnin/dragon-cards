import { create } from "zustand";
import type { GameStore } from "../types/game";

export const useGameStore = create<GameStore>((set, get) => ({
  balance: 100000.0,
  betAmount: 1,
  risk: "Classic",
  status: "idle",
    setBetAmount: (amount) => set({ betAmount: amount }),

  setRisk: (risk) => {    
    if (get().status !== "idle") return;

    set({
      risk      
  },

  reorderBottomDragons: (newDragons) => {
    if (get().status === "idle") {
      set({ bottomDragons: newDragons });
    }
  },

  placeBet: () => {
    const { balance, betAmount, status } = get();
    
    if (status !== "idle" || betAmount > balance || betAmount <= 0) return;

    set({
      balance: balance - betAmount,
      status: "revealing",
    });
  },

  finishReveal: () => {
    const { betAmount, balance, topDragons, bottomDragons, slotMultipliers } =
      get();

    let totalMultiplier = 0;
    let isLost = false;
    let hasAnyMatch = false;
    
    for (let i = 0; i < 6; i++) {
      if (topDragons[i] === bottomDragons[i]) {
        hasAnyMatch = true;

        if (slotMultipliers[i] === "LOST") {
          isLost = true;
          break; 
        } else {
          totalMultiplier += slotMultipliers[i] as number;
        }
      }
    }

    
    if (isLost || !hasAnyMatch) {      
      set({ status: "result" });
    } else {      
      const winAmount = betAmount * totalMultiplier;
      set({
        status: "result",
        balance: balance + winAmount,
      });
    }
  },

  resetRound: () => {    
    set({
      status: "idle",
      
    });
  },
}));
