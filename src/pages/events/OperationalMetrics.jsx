import React from "react";

const eventMetrics = [
  { name: "Planning Efficiency", value: "88.4%", color: "text-green-600" },
  { name: "Budget Adherence", value: "93.7%", color: "text-indigo-700" },
  { name: "Vendor Performance", value: "91.2%", color: "text-fuchsia-600" },
  { name: "Post-Event Follow-up", value: "85.6%", color: "text-amber-600" },
];

const OperationalMetrics = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 w-full">
    <h2 className="font-bold text-xl text-gray-800 mb-6 border-b pb-3">
      Operational Quality Indicators
    </h2>
    <ul className="space-y-5">
      {eventMetrics.map((em) => (
        <li
          key={em.name}
          className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0"
        >
          <span className="text-gray-600 text-base">{em.name}</span>
          <span
            className={`font-extrabold text-lg ${em.color} bg-gray-50 px-3 py-1 rounded-md`}
          >
            {em.value}
          </span>
        </li>
      ))}
    </ul>
    <p className="text-sm text-gray-500 mt-4 pt-3 border-t">
      Post-Event Follow-up (85.6%) needs immediate attention.
    </p>
  </div>
);

export default OperationalMetrics;
