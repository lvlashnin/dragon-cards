import React from "react";
import cx from "classnames";
import { useGameStore } from "../../store/gameStore";
import "./ControlPanel.css";
import { MAX_BET, MIN_BET, RISKS } from "../../config/constants";

export const ControlPanel: React.FC = () => {
  const { balance, betAmount, risk, status, setBetAmount, setRisk, placeBet } =
    useGameStore();

  const isGameActive = status === "idle";
  const isGameRevealing = status === "revealing";
  const isValidBet =
    betAmount >= MIN_BET && betAmount <= balance && betAmount <= MAX_BET;

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setBetAmount(value);
    } else if (e.target.value === "") {
      setBetAmount(0);
    }
  };

  const handleHalf = () =>
    setBetAmount(Math.max(MIN_BET, Math.floor(betAmount / 2)));
  const handleDouble = () =>
    setBetAmount(Math.min(MAX_BET, balance, betAmount * 2));
  const handleMax = () => setBetAmount(Math.min(MAX_BET, balance));

  return (
    <div className="control-panel">
      <div className="section">
        <h3 className="section-title">Bet Amount</h3>
        <p className="section-subtitle">Max Bet: {MAX_BET.toFixed(2)}</p>

        <div className={cx("input-group", { disabled: isGameRevealing })}>
          <input
            type="number"
            value={betAmount || ""}
            onChange={handleBetChange}
            disabled={isGameRevealing}
            min={MIN_BET}
            max={MAX_BET}
          />
          <div className="quick-buttons">
            <button onClick={handleHalf} disabled={isGameRevealing}>
              1/2
            </button>
            <button onClick={handleDouble} disabled={isGameRevealing}>
              x2
            </button>
            <button onClick={handleMax} disabled={isGameRevealing}>
              Max
            </button>
          </div>
          <span className="currency">$</span>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Risk</h3>
        <div className="risk-selector">
          {RISKS.map((r) => (
            <button
              key={r}
              className={cx("risk-btn", {
                active: risk === r,
                classic: r === "Classic",
              })}
              onClick={() => setRisk(r)}
              disabled={isGameRevealing}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <button
        className={cx("place-bet-btn", {
          "is-loading": status === "revealing",
          "is-result": status === "result",
        })}
        onClick={placeBet}
        disabled={!isGameActive || !isValidBet || balance === 0}
      >
        {status === "revealing" && "Revealing..."}
        {status === "result" && "Check Results!"}
        {status === "idle" && "Place Bet"}
      </button>

      <div className="balance-box">
        Balance: <span>{balance.toFixed(2)}</span>
      </div>
    </div>
  );
};
