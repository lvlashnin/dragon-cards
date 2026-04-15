import { create } from "zustand";
import type { GameStore } from "../types/game";
import { getShuffledDragons, getMultipliersForRisk } from "../utils/gameLogic";
import { INITIAL_BALANCE, CARD_COUNT, MIN_BET } from "../config/constants";

export const useGameStore = create<GameStore>((set, get) => ({
  balance: INITIAL_BALANCE,
  betAmount: MIN_BET,
  risk: "Classic",
  status: "idle",

  slotMultipliers: getMultipliersForRisk("Classic"),
  topDragons: getShuffledDragons(),
  bottomDragons: getShuffledDragons(),

  setBetAmount: (amount) => set({ betAmount: amount }),

  setRisk: (risk) => {
    if (get().status !== "idle") return;

    set({
      risk,
      slotMultipliers: getMultipliersForRisk(risk),
    });
  },

  reorderBottomDragons: (newDragons) => {
    if (get().status === "idle") {
      set({ bottomDragons: newDragons });
    }
  },

  placeBet: () => {
    const { status, balance, betAmount, finishReveal, resetRound } = get();

    if (status !== "idle" || betAmount > balance || betAmount <= 0) return;

    set({
      balance: balance - betAmount,
      status: "revealing",
    });

    setTimeout(() => {
      finishReveal();
      setTimeout(() => {
        resetRound();
      }, 2000);
    }, 1500);
  },

  finishReveal: () => {
    const { betAmount, balance, topDragons, bottomDragons, slotMultipliers } =
      get();

    let totalMultiplier = 0;
    let isLost = false;
    let hasAnyMatch = false;

    for (let i = 0; i < CARD_COUNT; i++) {
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
    const { risk } = get();
    set({
      status: "idle",
      topDragons: getShuffledDragons(),
      bottomDragons: getShuffledDragons(),
      slotMultipliers: getMultipliersForRisk(risk),
    });
  },
}));
