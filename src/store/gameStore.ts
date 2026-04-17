import { create } from "zustand";
import type { GameStore } from "../types/game";
import { getShuffledDragons } from "../utils/gameLogic";
import {
  INITIAL_BALANCE,
  CARD_COUNT,
  MIN_BET,
  MAX_BET,
  RISK_MULTIPLIERS,
  DRAGONS,
} from "../config/constants";

export const useGameStore = create<GameStore>((set, get) => ({
  balance: INITIAL_BALANCE,
  betAmount: MIN_BET,
  risk: "Classic",
  status: "idle",
  revealedIndices: [],

  slotMultipliers: RISK_MULTIPLIERS["Classic"],
  topDragons: getShuffledDragons(),
  bottomDragons: DRAGONS,

  setBetAmount: (amount) => set({ betAmount: amount }),

  setRisk: (risk) => {
    if (get().status !== "idle") return;

    set({
      risk,
      slotMultipliers: RISK_MULTIPLIERS[risk],
    });
  },

  swapBottomDragons: (dragIndex: number, dropIndex: number) => {
    const { status, bottomDragons } = get();
    if (status !== "idle" || dragIndex === dropIndex) return;

    const newDragons = [...bottomDragons];
    const temp = newDragons[dragIndex];

    newDragons[dragIndex] = newDragons[dropIndex];
    newDragons[dropIndex] = temp;

    set({ bottomDragons: newDragons });
  },

  placeBet: () => {
    const { status, balance, betAmount } = get();
    if (status !== "idle" || betAmount > balance || betAmount <= 0) return;

    set({
      balance: balance - betAmount,
      status: "revealing",
      revealedIndices: [],
    });

    setTimeout(() => {
      set({ topDragons: getShuffledDragons() });
    }, 400);

    for (let i = 0; i < CARD_COUNT; i++) {
      setTimeout(
        () => {
          set((state) => ({
            revealedIndices: [...state.revealedIndices, i],
          }));

          if (i === CARD_COUNT - 1) {
            setTimeout(() => {
              get().finishReveal();

              setTimeout(() => {
                get().resetRound();
              }, 2000);
            }, 700);
          }
        },
        500 + i * 600,
      );
    }
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
    set({
      status: "idle",
      revealedIndices: [],
    });
  },

  halfBet: () => {
    const current = get().betAmount;
    set({ betAmount: Math.max(MIN_BET, Math.floor(current / 2)) });
  },
  doubleBet: () => {
    const { betAmount, balance } = get();
    set({ betAmount: Math.min(MAX_BET, balance, betAmount * 2) });
  },
  maxBet: () => {
    set({ betAmount: Math.min(MAX_BET, get().balance) });
  },
}));
