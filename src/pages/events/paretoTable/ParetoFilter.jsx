import React from "react";

const FILTER_OPTIONS = [
  { value: "day", label: "Day" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const ParetoFilter = ({ filter, setFilter }) => (
  <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 w-full max-w-xs mx-auto md:mx-0">
    <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center md:text-left">
      Filter Data
    </h3>
    <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 justify-center md:justify-start">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`flex-1 px-4 py-2 rounded-md text-center transition-colors duration-200 ${
            filter === option.value
              ? "bg-indigo-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-indigo-200"
          }`}
          onClick={() => setFilter(option.value)}
          aria-pressed={filter === option.value}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);

export default ParetoFilter;
