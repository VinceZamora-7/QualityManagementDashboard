import React, { useRef, useState, useEffect } from "react";

const ParetoChart = ({ data, aspectRatio = 2.5 }) => {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(500);
  const [chartHeight, setChartHeight] = useState(200);
  const [animate, setAnimate] = useState(false);

  const margin = 95;

  // Responsive width/height
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

  // Trigger animation after first render
  useEffect(() => {
    const animTimeout = setTimeout(() => {
      setAnimate(true);
    }, 100); // slight delay before animating
    return () => clearTimeout(animTimeout);
  }, [data]);

  const displayedData = [...data].sort((a, b) => b.value - a.value);
  const total = displayedData.reduce((sum, d) => sum + d.value, 0);

  let cumulative = 0;
  const cumulativePercents = displayedData.map((d) => {
    cumulative += d.value;
    return (cumulative / total) * 100;
  });

  const width = chartWidth;
  const height = chartHeight;
  const barWidth = (width - margin * 2) / (displayedData.length || 1);
  const maxValue = Math.max(...displayedData.map((d) => d.value), 1);

  const yBar = (val) =>
    height - margin - (val / maxValue) * (height - margin * 2);
  const yPct = (pct) => height - margin - (pct / 100) * (height - margin * 2);

  return (
    <>
      <style>{`
        .bar-rect {
          transition: height 0.7s ease, y 0.7s ease;
          transform-origin: bottom;
        }
        .bar-rect.initial {
          height: 0 !important;
          y: ${height - margin} !important;
        }
        .line-polyline {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          transition: stroke-dashoffset 1.2s ease 0.7s;
        }
        .line-polyline.animate {
          stroke-dashoffset: 0;
        }
        .dot-circle {
          opacity: 0;
          transition: opacity 0.5s ease 1.5s, r 0.5s ease 1.5s;
          r: 0;
        }
        .dot-circle.animate {
          opacity: 1;
          r: 4;
        }
          
      `}</style>

      <div
        ref={chartRef}
        className="w-full min-h-[250px] flex justify-center items-center"
      >
        {!displayedData.length ? (
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

            <line
              x1={margin}
              y1={height - margin}
              x2={width - margin}
              y2={height - margin}
              stroke="#cbd5e1"
              strokeWidth="1"
            />

            {/* Bars with animated height and y */}
            {displayedData.map((d, i) => (
              <React.Fragment key={d.label}>
                <rect
                  className={`bar-rect ${!animate ? "initial" : ""}`}
                  x={margin + i * barWidth + barWidth * 0.15}
                  y={animate ? yBar(d.value) : height - margin}
                  width={barWidth * 0.7}
                  height={animate ? height - margin - yBar(d.value) : 0}
                  fill="#3b82f6"
                  rx="4"
                />
                <text
                  x={margin + i * barWidth + barWidth / 2}
                  y={animate ? yBar(d.value) - 5 : height - margin - 5}
                  textAnchor="middle"
                  fill="#3b82f6"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {d.value}
                </text>
              </React.Fragment>
            ))}

            {/* Animated cumulative Pareto line */}
            <polyline
              className={`line-polyline ${animate ? "animate" : ""}`}
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

            {/* Animated cumulative dots */}
            {cumulativePercents.map((pct, i) => (
              <circle
                className={`dot-circle ${animate ? "animate" : ""}`}
                key={`dot${i}`}
                cx={margin + i * barWidth + barWidth / 2}
                cy={yPct(pct)}
                r={animate ? 4 : 0}
                fill="#f97316"
                stroke="#fff"
                strokeWidth={2}
              />
            ))}

            {displayedData.map((d, i) => (
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
    </>
  );
};

export default ParetoChart;
