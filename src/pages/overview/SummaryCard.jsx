import React from "react";

const SummaryCard = ({ title, value, subtext, increase }) => (
  <div className="bg-white shadow rounded p-4 flex flex-col">
    <div className="text-sm font-semibold text-gray-600">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
    <div
      className={`text-sm mt-1 ${increase ? "text-green-600" : "text-red-600"}`}
    >
      {increase ? "▲" : "▼"} {subtext}
    </div>
  </div>
);

export default SummaryCard;
