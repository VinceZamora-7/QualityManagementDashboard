import React, { useState, useEffect, useRef } from "react";

// Utility function: filter data by range (dummy implementation — replace with real logic if data includes dates)
function filterParetoData(data, filter) {
  // For real data, filter by timestamp/date (here we just simulate)
  switch (filter) {
    case "day":
      return data.slice(0, 2); // Example: Most recent issues
    case "week":
      return data.slice(0, 3); // Example: Top 3 for past week
    case "month":
      return data.slice(0, 4); // Example: Top 4 for past month
    case "year":
      return data; // Example: All for past year
    case "all":
    default:
      return data; // All records
  }
}

const FILTER_OPTIONS = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
  { value: "all", label: "All Records" },
];

const ParetoChart = ({ data, aspectRatio = 2.5 }) => {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(500);
  const [chartHeight, setChartHeight] = useState(200);
  const [filter, setFilter] = useState("all");
  const [filteredData, setFilteredData] = useState(data);

  const margin = 95;

  // Update filtered data when filter or data changes
  useEffect(() => {
    setFilteredData(filterParetoData(data, filter));
  }, [filter, data]);

  // Responsive width/height based on container
  useEffect(() => {
    const updateSize = () => {
      if (chartRef.current) {
        const width = chartRef.current.offsetWidth;
        setChartWidth(width);
        setChartHeight(width / aspectRatio);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [aspectRatio]);

  const width = chartWidth;
  const height = chartHeight;

  // Process Pareto chart data
  const sorted = [...filteredData].sort((a, b) => b.value - a.value);
  const total = sorted.reduce((sum, d) => sum + d.value, 0);

  let cumulative = 0;
  const cumulativePercents = sorted.map((d) => {
    cumulative += d.value;
    return (cumulative / total) * 100;
  });

  const barWidth = (width - margin * 2) / (sorted.length || 1);
  const maxValue = Math.max(...sorted.map((d) => d.value), 1);
  const yBar = (val) =>
    height - margin - (val / maxValue) * (height - margin * 2);
  const yPct = (pct) => height - margin - (pct / 100) * (height - margin * 2);

  return (
    <div className="w-full">
      <div
        ref={chartRef}
        className="w-full h-full min-h-[250px] flex justify-center items-center"
      >
        {!sorted.length ? (
          <div className="p-4 text-gray-500 text-center w-full">
            No Pareto data available for this period.
          </div>
        ) : (
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="font-sans"
          >
            {/* Chart Title */}
            <text
              x={width / 2}
              y={margin / 2 - 10}
              fontSize="18"
              fill="#1f2937"
              textAnchor="middle"
              fontWeight="bold"
            >
              Root Cause Analysis (Pareto)
            </text>

            {/* X Axis Line */}
            <line
              x1={margin}
              y1={height - margin}
              x2={width - margin}
              y2={height - margin}
              stroke="#cbd5e1"
              strokeWidth="1"
            />

            {/* Bars */}
            {sorted.map((d, i) => (
              <React.Fragment key={d.label}>
                <rect
                  x={margin + i * barWidth + barWidth * 0.15}
                  y={yBar(d.value)}
                  width={barWidth * 0.7}
                  height={height - margin - yBar(d.value)}
                  fill="#3b82f6"
                  rx="4"
                />
                {/* Bar Value Label */}
                <text
                  x={margin + i * barWidth + barWidth / 2}
                  y={yBar(d.value) - 5}
                  textAnchor="middle"
                  fill="#3b82f6"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {d.value}
                </text>
              </React.Fragment>
            ))}

            {/* Cumulative Pareto Line */}
            <polyline
              fill="none"
              stroke="#f97316"
              strokeWidth="3"
              points={cumulativePercents
                .map((pct, i) => {
                  const x = margin + i * barWidth + barWidth / 2;
                  const y = yPct(pct);
                  return `${x},${y}`;
                })
                .join(" ")}
            />
            {/* Cumulative dots */}
            {cumulativePercents.map((pct, i) => (
              <circle
                key={`dot${i}`}
                cx={margin + i * barWidth + barWidth / 2}
                cy={yPct(pct)}
                r={4}
                fill="#f97316"
                stroke="#fff"
                strokeWidth={2}
              />
            ))}

            {/* Bar Labels (X Axis) */}
            {sorted.map((d, i) => (
              <text
                key={d.label + "lbl"}
                x={margin + i * barWidth + barWidth / 50}
                y={height - margin + 15}
                textAnchor="end"
                fill="#555"
                fontWeight="bold"
                fontSize="9"
                transform={`rotate(-40, ${
                  margin + i * barWidth + barWidth / 2
                }, ${height - margin - 50})`}
              >
                {d.label}
              </text>
            ))}

            {/* Y axis (left, value) */}
            {[0, maxValue / 2, maxValue].map((y) => (
              <React.Fragment key={y}>
                <line
                  x1={margin}
                  y1={yBar(y)}
                  x2={margin + 5}
                  y2={yBar(y)}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
                <text
                  x={margin - 8}
                  y={yBar(y) + 4}
                  fontSize="10"
                  fill="#555"
                  textAnchor="end"
                >
                  {Math.round(y)}
                </text>
              </React.Fragment>
            ))}
            {/* Left Y Axis Label */}
            <text
              x={margin / 2}
              y={height / 2}
              transform={`rotate(-90, ${margin / 2}, ${height / 2})`}
              fontSize="12"
              fill="#555"
              textAnchor="middle"
            >
              Count / Frequency
            </text>

            {/* Y axis (right, pct) */}
            {[0, 50, 100].map((pct) => (
              <React.Fragment key={pct}>
                <line
                  x1={width - margin}
                  y1={yPct(pct)}
                  x2={width - margin - 5}
                  y2={yPct(pct)}
                  stroke="#fed7aa"
                  strokeWidth="1"
                />
                <text
                  x={width - margin + 8}
                  y={yPct(pct) + 4}
                  fontSize="10"
                  fill="#f97316"
                  textAnchor="start"
                >
                  {pct}%
                </text>
              </React.Fragment>
            ))}
            {/* Right Y Axis Label */}
            <text
              x={width - margin / 2}
              y={height / 2}
              transform={`rotate(90, ${width - margin / 2}, ${height / 2})`}
              fontSize="12"
              fill="#f97316"
              textAnchor="middle"
            >
              Cumulative Percent
            </text>
          </svg>
        )}
      </div>
    </div>
  );
};

export default ParetoChart;
