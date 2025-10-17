import React from "react";

const FILTER_OPTIONS = [
  { value: "all", label: "All Records" },
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const ParetoFilter = ({ filter, setFilter }) => (
  <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 w-48">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Filter Data</h3>
    <div className="flex flex-col space-y-2">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`px-4 py-2 rounded-md text-left transition-colors duration-200
            ${
              filter === option.value
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-indigo-200"
            }`}
          onClick={() => setFilter(option.value)}
          aria-pressed={filter === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);

export default ParetoFilter;
