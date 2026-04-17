import React from "react";
import cx from "classnames";
import { useGameStore } from "../../store/gameStore";
import "./Balance.css";

interface BalanceProps {
  className?: string;
}

export const Balance: React.FC<BalanceProps> = ({ className }) => {
  const balance = useGameStore((state) => state.balance);

  return (
    <div className={cx("balance-box", className)}>
      Balance: <span>{balance.toFixed(2)}</span>
    </div>
  );
};
