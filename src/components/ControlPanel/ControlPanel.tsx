import React from "react";
import cx from "classnames";
import { useGameStore } from "../../store/gameStore";
import { useBetInput } from "../../hooks/useBetInput";
import { MIN_BET, RISKS } from "../../config/constants";
import "./ControlPanel.css";
import { Balance } from "./Balance";

export const ControlPanel: React.FC = () => {
  const { balance, betAmount, risk, status, setRisk, placeBet } =
    useGameStore();

  const { error, isValidBet, handleBetChange, handleBlur, executeQuickAction } =
    useBetInput();

  const isIdle = status === "idle";

  return (
    <div className="control-panel">
      <div className="section">
        <div className="section-header">
          <h3 className="section-title">Bet Amount</h3>
          <h3 className="section-subtitle">Max bet: 1000.00</h3>
        </div>

        <div
          className={cx("input-group", {
            disabled: !isIdle,
            "has-error": error,
          })}
        >
          <input
            type="number"
            value={betAmount === 0 ? "" : betAmount}
            onChange={handleBetChange}
            onBlur={handleBlur}
            disabled={!isIdle}
            placeholder={`Min: ${MIN_BET}`}
          />

          <div className="quick-buttons">
            <button
              onClick={() => executeQuickAction("half")}
              disabled={!isIdle}
            >
              1/2
            </button>
            <button
              onClick={() => executeQuickAction("double")}
              disabled={!isIdle}
            >
              x2
            </button>
            <button
              onClick={() => executeQuickAction("max")}
              disabled={!isIdle}
            >
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
              })}
              onClick={() => setRisk(r)}
              disabled={!isIdle}
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
        disabled={!isIdle || !isValidBet || balance === 0}
      >
        {status === "revealing" && "Revealing..."}
        {status === "result" && "Check Results!"}
        {status === "idle" && "Place Bet"}
      </button>
      {error && <span className="error-text">{error}</span>}

      <Balance className="desktop-balance" />
    </div>
  );
};
