import { useEffect, useState } from "react";
import MMFRateChart from "./MMFRateChart";
import './calculator.css';

const MMF_PROVIDERS = {
  CIC: {
    name: "CIC Investments",
    rate: 12.4,
  },
  ETIC: {
    name: "Etica Capital",
    rate: 13.4,
  },
  KCB: {
    name: "KCB MMF",
    rate: 14.4,
  },
};

const MOCK_LAST_12_MONTHS = [
  { month: "Jan 04", rate: 11.2 },
  { month: "Feb-05", rate: 11.4 },
  { month: "Mar-06", rate: 11.8 },
  { month: "Apr-07", rate: 12.0 },
  { month: "May-08", rate: 12.1 },
  { month: "Jun-09", rate: 12.3 },
  { month: "Jul-10", rate: 12.2 },
  { month: "Aug-11", rate: 12.4 },
  { month: "Sep-12", rate: 12.6 },
  { month: "Oct-01", rate: 12.5 },
  { month: "Nov-02", rate: 12.7 },
  { month: "Dec-03", rate: 12.8 },
];

export default function MMFCalculator() {
  const [providerCode, setProviderCode] = useState("");
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");

  const [interestEarned, setInterestEarned] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const calculateReturns = () => {
    if (!providerCode || !amount || !months) {
      setInterestEarned(0);
      setTotalValue(0);
      return;
    }

    const provider = MMF_PROVIDERS[providerCode];
    const annualRate = provider.rate / 100;
    const monthlyRate = annualRate / 12;

    const interest =
      Number(amount) * monthlyRate * Number(months);

    setInterestEarned(interest);
    setTotalValue(Number(amount) + interest);
  };


useEffect(() => {
  if (!providerCode || !amount || !months) {
    setInterestEarned(0);
    setTotalValue(0);
    return;
  }

  const provider = MMF_PROVIDERS[providerCode];

  const principal = Number(amount);
  const durationMonths = Number(months);
  const annualRate = provider.rate / 100;
  const monthlyRate = annualRate / 12;

  // Compound interest formula
  const finalValue =
    principal * Math.pow(1 + monthlyRate, durationMonths);

  const interest = finalValue - principal;

  setInterestEarned(interest);
  setTotalValue(finalValue);
}, [providerCode, amount, months]);


  return (
    <div className="calculator-grid">
      {/* COLUMN A */}
      <div className="calculator-panel">
        <div className="calculator-inputs">
          <label className="calculator-label">
            MMF Provider
            <select
              className="calculator-input"
              value={providerCode}
              onChange={(e) => setProviderCode(e.target.value)}
            >
              <option value="">Select provider</option>
              {Object.entries(MMF_PROVIDERS).map(
                ([code, provider]) => (
                  <option key={code} value={code}>
                    {provider.name}
                  </option>
                )
              )}
            </select>
          </label>

          <label className="calculator-label">
            Amount (KES)
            <input
              type="number"
              className="calculator-input"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>

          <label className="calculator-label">
            Duration (Months)
            <input
              type="number"
              className="calculator-input"
              placeholder="Enter duration"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            />
          </label>

          <button
            className="calculator-button"
            onClick={calculateReturns}
          >
            Calculate →
          </button>
        </div>

        <div className="calculator-results">
          <div className="calculator-result-box">
            <span className="calculator-result-label">
              Total Value (KES)
            </span>
            <span className="calculator-result-value">
              {totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="calculator-divider" />

          <div className="calculator-result-box">
            <span className="calculator-result-label">
              Interest Earned (KES)
            </span>
            <span className="calculator-result-value">
              {interestEarned.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* COLUMN B */}
      <div className="calculator-graph-placeholder">
        {providerCode ? (
    <MMFRateChart data={MOCK_LAST_12_MONTHS} />
        ) : (
            "Select a provider to view performance"
        )}


      </div>
    </div>
  );
}
