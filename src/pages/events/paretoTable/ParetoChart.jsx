import React, { useRef, useState, useEffect } from "react";

const ParetoChart = ({ data, aspectRatio = 2.3 }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(640);

  // Margin increased for label space
  const margin = Math.max(120, containerWidth * 0.08);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Compute height based on width and aspect ratio
  const containerHeight = containerWidth / aspectRatio;

  // Animation for bars and line
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(false);
    const animTimeout = setTimeout(() => setAnimate(true), 120);
    return () => clearTimeout(animTimeout);
  }, [data]);

  // Sort data descending by value
  const displayedData = [...data].sort((a, b) => b.value - a.value);
  const total = displayedData.reduce((sum, d) => sum + d.value, 0);

  // Calculate cumulative percents for line
  let cumulative = 0;
  const cumulativePercents = displayedData.map((d) => {
    cumulative += d.value;
    return (cumulative / total) * 100;
  });

  // Dimensions for bars and axes
  const width = containerWidth;
  const height = containerHeight;
  const barWidth = (width - margin * 2) / Math.max(displayedData.length, 1);
  const maxValue = Math.max(...displayedData.map((d) => d.value), 1);

  // Y-axis functions
  const yBar = (val) =>
    height - margin - (val / maxValue) * (height - margin * 2.1);
  const yPct = (pct) =>
    height - margin - (pct / 100) * (height - margin * 2.05);

  return (
    <>
      <style>{`
        .bar-rect {
          transition: height 0.7s cubic-bezier(.4,0,.2,1), y 0.7s cubic-bezier(.4,0,.2,1);
          transform-origin: bottom;
        }
        .bar-rect.initial {
          height: 0 !important;
          y: ${height - margin} !important;
        }
        .line-polyline {
          stroke-dasharray: 1800;
          stroke-dashoffset: 1800;
          transition: stroke-dashoffset 1.2s ease 1s;
        }
        .line-polyline.animate {
          stroke-dashoffset: 0;
        }
        .dot-circle {
          opacity: 0;
          transition: opacity 0.5s ease 1.7s, r 0.5s ease 1.7s;
          r: 0;
        }
        .dot-circle.animate {
          opacity: 1;
          r: 4;
        }
      `}</style>

      <div
        ref={containerRef}
        className="w-full min-h-[340px] rounded-xl bg-white shadow-lg mx-auto overflow-x-auto"
        style={{ minHeight: containerHeight, maxWidth: "100%" }}
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
            preserveAspectRatio="xMidYMid meet"
            style={{ display: "block", margin: "0 auto" }}
          >
            {/* Title */}
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

            {/* X axis line */}
            <line
              x1={margin}
              y1={height - margin}
              x2={width - margin}
              y2={height - margin}
              stroke="#cbd5e1"
              strokeWidth="1"
            />

            {/* Bars */}
            {displayedData.map((d, i) => (
              <React.Fragment key={d.label}>
                <rect
                  className={`bar-rect ${!animate ? "initial" : ""}`}
                  x={margin + i * barWidth + barWidth * 0.12}
                  y={animate ? yBar(d.value) : height - margin}
                  width={barWidth * 0.7}
                  height={animate ? height - margin - yBar(d.value) : 0}
                  fill="#3b82f6"
                  rx="4"
                />
                <text
                  x={margin + i * barWidth + barWidth / 2}
                  y={animate ? yBar(d.value) - 10 : height - margin - 10}
                  textAnchor="middle"
                  fill="#3b82f6"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {d.value}
                </text>
              </React.Fragment>
            ))}

            {/* Pareto line */}
            <polyline
              className={`line-polyline ${animate ? "animate" : ""}`}
              fill="none"
              stroke="#f97316"
              strokeWidth="3"
              points={cumulativePercents
                .map(
                  (pct, i) =>
                    `${margin + i * barWidth + barWidth / 2},${yPct(pct)}`
                )
                .join(" ")}
            />

            {/* Dots */}
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

            {/* X labels */}
            {displayedData.map((d, i) => (
              <text
                key={d.label + "lbl"}
                x={margin + i * barWidth + barWidth / 2}
                y={height - margin + 24}
                textAnchor="end"
                fill="#555"
                fontWeight="bold"
                fontSize="10"
                transform={`rotate(-30, ${
                  margin + i * barWidth + barWidth / 2
                }, ${height - margin + 24})`}
              >
                {d.label}
              </text>
            ))}

            {/* Y axis grid lines and values */}
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

            {/* Y axis label */}
            <text
              x={margin / 2}
              y={height / 2}
              transform={`rotate(-90, ${margin / 2}, ${height / 2})`}
              fontSize="13"
              fill="#555"
              textAnchor="middle"
            >
              Count / Frequency
            </text>

            {/* Pareto right axis and labels */}
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
              fontSize="13"
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
