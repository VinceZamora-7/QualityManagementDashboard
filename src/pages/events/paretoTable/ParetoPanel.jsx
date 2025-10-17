import React, { useState } from "react";
import ParetoChart from "./ParetoChart";
import ParetoFilter from "./ParetoFilter";
import paretoData from "../../../data/dataEvents/data.json";

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

// ParetoPanel.jsx
const ParetoPanel = () => {
  const [filter, setFilter] = useState("all");
  const filteredData = filterParetoData(paretoData, filter);

  return (
    <div className="flex gap-6 items-start w-full mx-auto">
      <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 min-h-[350px] max-w-4xl">
        <ParetoChart data={filteredData} />
      </div>
      <ParetoFilter filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default ParetoPanel;
