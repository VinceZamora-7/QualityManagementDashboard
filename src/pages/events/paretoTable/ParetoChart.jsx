import React, { useState, useEffect, useRef } from "react";

// Utility to filter data by date range (dummy for your use case)
function filterParetoData(data, filter) {
  switch (filter) {
    case "day":
      return data.slice(0, 2);
    case "week":
      return data.slice(0, 3);
    case "month":
      return data.slice(0, 4);
    case "year":
      return data;
    case "all":
    default:
      return data;
  }
}

const ParetoChart = ({ data, aspectRatio = 2 }) => {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(700); // default bigger width
  const [chartHeight, setChartHeight] = useState(350); // default bigger height
  const [filter, setFilter] = useState("all");
  const [filteredData, setFilteredData] = useState(data);

  const margin = 100; // larger margin for axis labels

  // Update filtered data when filter or data changes
  useEffect(() => {
    setFilteredData(filterParetoData(data, filter));
  }, [filter, data]);

  // Responsive update of chart size based on container width and aspect ratio
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
    <div
      ref={chartRef}
      className="w-full max-w-5xl mx-auto min-h-[350px] flex justify-center items-center"
      style={{ padding: "1rem" }}
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
            fontSize="20"
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
                fontSize="12"
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
              r={5}
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
              y={height - margin + 22}
              textAnchor="end"
              fill="#555"
              fontWeight="bold"
              fontSize="11"
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
                y={yBar(y) + 5}
                fontSize="11"
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
                y={yPct(pct) + 5}
                fontSize="11"
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
  );
};

export default ParetoChart;
