import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "./chart.css";






export default function MMFRateChart({
  data,
  providerName,
  latestRate,
  percentageChange,
}) {



const isPositive = percentageChange >= 0;
const changeClass = isPositive
  ? "chart-change positive"
  : "chart-change negative";

// const formattedChange =
//   percentageChange !== null
//     ? `${percentageChange.toFixed(2)}%`
//     : "--";

const formattedChange =
  percentageChange !== null
    ? `${percentageChange >= 0 ? "+" : ""}${percentageChange.toFixed(2)}%`
    : "--";
  
  
    return (
    <div className="chart-container">
      {/* HEADER */}
      <div className="chart-header">
        <div className="chart-market">
          Current - Avg Rate of Return · KES
        </div>

        <div className="chart-title">
          {providerName || "MMF Provider"}
        </div>

        <div className="chart-price-row">
          <span className="chart-price">{latestRate !== null
      ? `${latestRate.toFixed(2)}%`
      : "--"}</span>
          <span className={changeClass}>
             {formattedChange}
          </span>
        </div>

        <div className="chart-timestamp">
          As of 1:19:43 PM EST. Market Open.
        </div>
      </div>

      {/* GRAPH */}
      <div className="chart-graph">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              tickFormatter={(v) => `${v}%`}
              domain={["dataMin - 0.5", "dataMax + 0.5"]}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Rate"]}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#1ba9da"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
