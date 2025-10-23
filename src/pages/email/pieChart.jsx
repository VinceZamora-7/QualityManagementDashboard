import React from "react";

const metrics = [
  {
    name: "Email Content Issues",
    value: 25,
    displayValue: "25%",
    colorClass: "text-green-600",
    strokeColor: "#4ade80",
  },
  {
    name: "Technical Config Errors",
    value: 25,
    displayValue: "25%",
    colorClass: "text-indigo-700",
    strokeColor: "#6366f1",
  },
  {
    name: "Process Misalignment",
    value: 25,
    displayValue: "25%",
    colorClass: "text-fuchsia-600",
    strokeColor: "#c026d3",
  },
  {
    name: "Email Tool Limitations",
    value: 25,
    displayValue: "25%",
    colorClass: "text-amber-600",
    strokeColor: "#f59e0b",
  },
];

const radius = 40;
const circumference = 2 * Math.PI * radius;
const totalValue = metrics.reduce((acc, item) => acc + item.value, 0);

const pieSegments = metrics.map((segment, index) => {
  const dashArray = (segment.value / totalValue) * circumference;
  const offset = metrics
    .slice(0, index)
    .reduce((acc, s) => acc + (s.value / totalValue) * circumference, 0);
  return { ...segment, dashArray, offset };
});

const OperationalMetrics = () => (
  <section
    className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto mb-6"
    aria-labelledby="operational-metrics-title"
  >
    <h2
      id="operational-metrics-title"
      className="font-bold text-2xl text-gray-800 mb-6 border-b border-gray-200 pb-3"
    >
      Email Operational Quality Indicators
    </h2>

    <ul className="space-y-5 mb-6" role="list">
      {metrics.map(({ name, displayValue, colorClass }) => (
        <li
          key={name}
          className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-none"
        >
          <span className="text-gray-600 text-base">{name}</span>
          <span
            className={`font-extrabold text-lg ${colorClass} bg-gray-50 px-3 py-1 rounded-md select-none`}
          >
            {displayValue}
          </span>
        </li>
      ))}
    </ul>

    <div
      className="flex items-center space-x-8"
      role="img"
      aria-label="Pie chart of email task rejection reasons"
    >
      <svg
        width={120}
        height={120}
        viewBox="0 0 120 120"
        className="transform -rotate-90"
        role="presentation"
      >
        <circle
          r={radius}
          cx={60}
          cy={60}
          fill="transparent"
          stroke="#f3f4f6"
          strokeWidth={15}
        />
        {pieSegments.map(({ name, strokeColor, dashArray, offset }) => (
          <circle
            key={name}
            r={radius}
            cx={60}
            cy={60}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={15}
            strokeDasharray={`${dashArray} ${circumference}`}
            strokeDashoffset={circumference - offset}
            strokeLinecap="round"
            aria-label={`${name}: ${
              metrics.find((m) => m.name === name).displayValue
            }`}
          />
        ))}
      </svg>

      <ul className="text-sm">
        {metrics.map(({ name, strokeColor }) => (
          <li key={name} className="mb-2 flex items-center space-x-2">
            <span
              className="block w-4 h-4 rounded-sm"
              style={{ backgroundColor: strokeColor }}
              aria-hidden="true"
            />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>

    <p className="text-sm text-gray-500 mt-4 pt-3 border-t text-center">
      Note: Percentages represent common reasons for email task failures.
    </p>
  </section>
);

export default OperationalMetrics;
