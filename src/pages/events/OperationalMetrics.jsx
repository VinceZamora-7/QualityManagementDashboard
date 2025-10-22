import React from "react";

const metrics = [
  {
    name: "Content & Formatting",
    value: 40,
    displayValue: "40%",
    color: "text-green-600",
    strokeColor: "#4ade80",
  },
  {
    name: "Technical Config",
    value: 25,
    displayValue: "25%",
    color: "text-indigo-700",
    strokeColor: "#6366f1",
  },
  {
    name: "Process Alignment",
    value: 20,
    displayValue: "20%",
    color: "text-fuchsia-600",
    strokeColor: "#c026d3",
  },
  {
    name: "Tool Limitation",
    value: 15,
    displayValue: "15%",
    color: "text-amber-600",
    strokeColor: "#f59e0b",
  },
];

const radius = 40;
const circumference = 2 * Math.PI * radius;

const pieSegments = metrics.map((segment, index, arr) => {
  const total = arr.reduce((acc, s) => acc + s.value, 0);
  const dashArray = (segment.value / total) * circumference;
  const offset = arr
    .slice(0, index)
    .reduce((acc, s) => acc + (s.value / total) * circumference, 0);
  return { ...segment, dashArray, offset };
});

const OperationalMetrics = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 w-full max-w-md mx-auto">
    <h2 className="font-bold text-xl text-gray-800 mb-6 border-b pb-3">
      Operational Quality Indicators
    </h2>
    <ul className="space-y-5 mb-6">
      {metrics.map((metric) => (
        <li
          key={metric.name}
          className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0"
        >
          <span className="text-gray-600 text-base">{metric.name}</span>
          <span
            className={`font-extrabold text-lg ${metric.color} bg-gray-50 px-3 py-1 rounded-md`}
          >
            {metric.displayValue}
          </span>
        </li>
      ))}
    </ul>

    <div className="flex items-center space-x-8">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="transform -rotate-90"
      >
        <circle
          r={radius}
          cx="60"
          cy="60"
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth="15"
        />
        {pieSegments.map((segment) => (
          <circle
            key={segment.name}
            r={radius}
            cx="60"
            cy="60"
            fill="transparent"
            stroke={segment.strokeColor}
            strokeWidth="15"
            strokeDasharray={`${segment.dashArray} ${circumference}`}
            strokeDashoffset={circumference - segment.offset}
          />
        ))}
      </svg>

      <ul className="text-sm">
        {metrics.map((metric) => (
          <li key={metric.name} className="mb-2 flex items-center space-x-2">
            <span
              className="block w-4 h-4 rounded-sm"
              style={{ backgroundColor: metric.strokeColor }}
            ></span>
            <span>{metric.name}</span>
          </li>
        ))}
      </ul>
    </div>

    <p className="text-sm text-gray-500 mt-4 pt-3 border-t">
      Note: Percentages represent PR rejection reasons.
    </p>
  </div>
);

export default OperationalMetrics;
