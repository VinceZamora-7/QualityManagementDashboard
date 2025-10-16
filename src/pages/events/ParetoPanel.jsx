import React, { useState } from "react";
import ParetoChart from "./ParetoChart";
import ParetoFilter from "./ParetoFilter";

const paretoData = [
  { label: "Name-o-matic", value: 40 },
  { label: "Marketo Tags", value: 25 },
  { label: "Marketo Tokens", value: 15 },
  { label: "Marketo Smart Campaign", value: 10 },
  { label: "EMC - Event Details", value: 5 },
  { label: "EMC Customer Jouney", value: 10 },
  { label: "EMC - Marketing emails", value: 5 },
  { label: "EMC - HTML coding errors ", value: 10 },
  { label: "Others - ON 24 Error", value: 5 },
  { label: "Deliverables", value: 5 },
];

const filterParetoData = (data, filter) => {
  switch (filter) {
    case "day":
      return data.slice(0, 2);
    case "week":
      return data.slice(0, 3);
    case "month":
      return data.slice(0, 4);
    case "year":
    case "all":
    default:
      return data;
  }
};

const ParetoPanel = () => {
  const [filter, setFilter] = useState("all");
  const filteredData = filterParetoData(paretoData, filter);

  return (
    <div className="flex gap-6 items-start">
      {/* Chart */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 min-h-[350px]">
        <ParetoChart data={filteredData} />
        <p className="text-sm text-gray-500 mt-4 pt-3 border-t w-full text-center">
          The <b>80/20 Rule</b> suggests targeting Delays and Budget Overruns
          for maximum impact.
        </p>
      </div>

      {/* Filter Panel */}
      <ParetoFilter filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default ParetoPanel;
