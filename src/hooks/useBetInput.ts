import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { MIN_BET, MAX_BET } from "../config/constants";
import type { BetQuickAction } from "../types/game";

export const useBetInput = () => {
  const { balance, betAmount, setBetAmount, halfBet, doubleBet, maxBet } =
    useGameStore();
  const [error, setError] = useState<string | null>(null);

  const isValidBet =
    betAmount >= MIN_BET && betAmount <= balance && betAmount <= MAX_BET;

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setBetAmount(0);
      setError(null);
      return;
    }

    const value = parseFloat(rawValue);

    if (!isNaN(value)) {
      setBetAmount(value);

      if (value > balance) {
        setError("Insufficient funds");
      } else if (value > MAX_BET) {
        setError(`Maximum bet is ${MAX_BET}`);
      } else {
        setError(null);
      }
    }
  };

  const handleBlur = () => {
    setError(null);
    if (betAmount < MIN_BET) {
      setBetAmount(MIN_BET);
    } else if (betAmount > balance) {
      setBetAmount(Math.min(balance, MAX_BET));
    } else if (betAmount > MAX_BET) {
      setBetAmount(MAX_BET);
    }
  };

  const executeQuickAction = (action: BetQuickAction) => {
    if (action === "half") halfBet();
    if (action === "double") doubleBet();
    if (action === "max") maxBet();
    setError(null);
  };

  return {
    error,
    isValidBet,
    handleBetChange,
    handleBlur,
    executeQuickAction,
  };
};
