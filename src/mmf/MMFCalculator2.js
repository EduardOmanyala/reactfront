import { useEffect, useState } from "react";
import MMFRateChart from "./MMFRateChart";
// import { Link } from "react-router-dom";
import BookBanner from "../books/BookBanner";
import "./calculator.css";




const MMF_PROVIDERS = {
  NDVU: { name: "Ndovu Wealth Limited", rate: 10.5 },          // ~10.48% early May
  ARVC: { name: "ArvoCap Asset Managers Limited", rate: 11.0 }, // ~11.03%
  LFCB: { name: "Lofty-Corban Investments Limited", rate: 10.7 }, // ~10.65%
  KCBM: { name: "KCB Asset Management Limited", rate: 9.0 },   // Stable/lower tier
  ETCA: { name: "Etica Capital Limited", rate: 12.1 },         // ~12.05%
  GNFA: { name: "GenAfrica Asset Managers", rate: 9.5 },       // Mid-tier
  STNB: { name: "Stanbic Unit Trust Funds", rate: 5.0 },       // Lower end
  NABC: { name: "Nabo Capital Limited", rate: 12.1 },          // ~12.08%
  FAUL: { name: "Faulu Microfinance Bank Limited", rate: 10.0 }, // Competitive
  KZAM: { name: "Kuza Asset Management Limited", rate: 10.3 }, // ~10.30%
  CYTN: { name: "Cytonn Asset Managers Limited", rate: 12.1 }, // ~12.13% (often leads)
  JBLE: { name: "Jubilee Financial Services Limited", rate: 10.5 }, // ~10.53%
  MALI: { name: "Mali Money Market Fund (Safaricom)", rate: 8.0 }, // Lower
  ENWL: { name: "Enwealth Financial Services", rate: 10.7 },   // ~10.66%
  DRYA: { name: "Dry Associates", rate: 9.4 },                 // Mid/lower
  SNLM: { name: "Sanlam Investments East Africa", rate: 9.0 }, // Mid-tier
  GHIM: { name: "GenCap Hela Imara (Genghis Capital)", rate: 8.8 }, // Lower-mid
  APOL: { name: "Apollo Asset Management Company", rate: 8.5 },
  ABSH: { name: "Absa Shilling Money Market Fund", rate: 7.5 }, // Lower
  OMUT: { name: "Old Mutual Unit Trust Scheme", rate: 9.5 },   // Mid
  GLFC: { name: "GulfCap Investment Bank", rate: 10.8 },       // ~10.82%
  ORTK: { name: "Orient Kasha Money Market Fund", rate: 10.0 }, // Mid
  ZIDI: { name: "Ziidi Collective Investment Scheme", rate: 6.5 }, // Lower
  CICM: { name: "CIC Asset Managers Limited", rate: 8.5 },
  COOP: { name: "Co-op Trust Investment Services", rate: 8.2 },
  IELA: { name: "ICEA Lion Asset Management", rate: 8.3 },
  BRTM: { name: "Britam Asset Managers (Kenya) Limited", rate: 9.5 },
  IMCP: { name: "I&M Capital Limited", rate: 9.2 },
  MYFR: { name: "Mayfair Asset Managers Limited", rate: 7.5 }, // Can vary (some fixed income higher)
  ALAK: { name: "African Alliance Kenya Asset Management", rate: 6.0 }, // Lower
  MDSN: { name: "Madison Investment Managers Limited", rate: 10.0 },
  EQIB: { name: "Equity Investment Bank Money Market Fund", rate: 5.0 }  // Often lower
};





export default function MMFCalculator() {
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

    const provider = MMF_PROVIDERS[providerCode];
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

    const provider = MMF_PROVIDERS[providerCode];
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
          //`http://127.0.0.1:8000/mmf/providers/${providerCode}/`
          `https://api.ken-lib.com/mmf/providers/${providerCode}/`
        );

        if (!response.ok) {
          throw new Error("Failed to load rate history");
        }

        const data = await response.json();
        setChartData(
        (data.monthly_rates || []).map(item => ({
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

    <div>
      <BookBanner />
    </div>

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
