import { useEffect, useState } from "react";
import MMFRateChart from "./MMFRateChart";
// import { Link } from "react-router-dom";
// import BookBanner from "../books/BookBanner";
import "./calculator.css";



const SF_PROVIDERS = {
  MNX: { name: "Mansa X Special Fund", rate: 18.96 },
  KUZ: { name: "Kuza Asset Management Special Fund", rate: 9.8 },
  OAK: { name: "Oak Asset Management Special Fund", rate: 20.28 },
  ARVC: { name: "Arvocap Almasi Fund", rate: 18.88 },
  ETICA: { name: "Etica Special Wealth Fund", rate: 20.36 },

};






export default function SFCalculator() {
  const [providerCode, setProviderCode] = useState("");
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");

  const [interestEarned, setInterestEarned] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  // 🔹 NEW STATE FOR GRAPH
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartError, setChartError] = useState(null);

  const [providerName, setProviderName] = useState("");
  const [latestRate, setLatestRate] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);

  const calculateReturns = () => {
    if (!providerCode || !amount || !months) {
      setInterestEarned(0);
      setTotalValue(0);
      return;
    }

    const provider = SF_PROVIDERS[providerCode];
    const annualRate = provider.rate / 100;
    const monthlyRate = annualRate / 12;

    const interest = Number(amount) * monthlyRate * Number(months);

    setInterestEarned(interest);
    setTotalValue(Number(amount) + interest);
  };

  useEffect(() => {
    if (!providerCode || !amount || !months) {
      setInterestEarned(0);
      setTotalValue(0);
      return;
    }

    const provider = SF_PROVIDERS[providerCode];
    const principal = Number(amount);
    const durationMonths = Number(months);
    const annualRate = provider.rate / 100;
    const monthlyRate = annualRate / 12;

    const finalValue =
      principal * Math.pow(1 + monthlyRate, durationMonths);

    const interest = finalValue - principal;

    setInterestEarned(interest);
    setTotalValue(finalValue);
  }, [providerCode, amount, months]);

  // 🔹 FETCH LAST 12 MONTHS RATES WHEN PROVIDER CHANGES
  useEffect(() => {
    if (!providerCode) {
      setChartData([]);
      return;
    }

    const fetchRates = async () => {
      setChartLoading(true);
      setChartError(null);

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/sf/providers/${providerCode}/`
          // `https://api.ken-lib.com/mmf/providers/${providerCode}/`
        );

        if (!response.ok) {
          throw new Error("Failed to load rate history");
        }

        const data = await response.json();
        setChartData(
        (data.sfmonthly_rates || []).map(item => ({
            month: item.month,
            rate: Number(item.rate), // 🔴 important: ensure number
        }))
        );


        setProviderName(data.provider?.name || "");
        setLatestRate(
        data.latest_rate !== null ? Number(data.latest_rate) : null
        );
        setPercentageChange(
        data.percentage_change !== null
            ? Number(data.percentage_change)
            : null
        );







      } catch (err) {
        setChartError(err.message);
        setChartData([]);
      } finally {
        setChartLoading(false);
      }
    };

    fetchRates();
  }, [providerCode]);

return (
    <div>
    <div className="calculator-grid">
      {/* COLUMN A */}
      <div className="calculator-panel">
        <div className="calculator-inputs">
          <label className="calculator-label">
            Special Fund
            <select
              className="calculator-input"
              value={providerCode}
              onChange={(e) => setProviderCode(e.target.value)}
            >
              <option value="">Select fund</option>
              {Object.entries(SF_PROVIDERS).map(
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
        {!providerCode && "Select a provider to view performance"}

        {providerCode && chartLoading && "Loading performance..."}

        {providerCode && chartError && (
          <span className="calculator-error">
            {chartError}
          </span>
        )}

        {providerCode && !chartLoading && !chartError && (
          <MMFRateChart
            data={chartData}
            providerName={providerName}
            latestRate={latestRate}
            percentageChange={percentageChange}
            />
        )}


      </div>
    </div>

    {/* <div>
      <BookBanner />
    </div> */}

     {/* Ad section */}
     {/* <div className="mainbanner">
      <div
        className="imagebanner"
        style={{ backgroundImage: "url(/images/invest.jpg)" }}
      ></div>

      <div className="contentbanner">
        <div className="textwrapbanner">
          <h2 className="titlebanner">GET IN TOUCH</h2>

          <p className="descriptionbanner">
            The Bannermen pride themselves on their expertise in HTML5—among
            other ad technologies! Why not let them wow you with their knowledge
            in your next digital campaign?!
          </p>

          <a href="https://ken-lib.com/" className="linkbanner">
            contact us <span className="arrowbanner">→</span>
          </a>
        </div>
      </div>
    </div> */}



    </div>
  );
}
