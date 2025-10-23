import React, { useState } from "react";
import EmailSummaryCards from "./EmailSummaryCards";
import EmailTablePanel from "./EmailTablePanel";
import BarTablePanel from "./barTable/BarTablePanel";
import LineTablePanel from "./lineTable/LineTablePanel";
import ParetoTablePanel from "./paretoTable/ParetoTablePanel";

const tabs = [
  { label: "Pareto Chart", component: ParetoTablePanel },
  { label: "Line Graph", component: LineTablePanel },
  { label: "Bar Graph", component: BarTablePanel },
];

const EmailPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const summaryData = {
    overallErrorRate: "3.2%",
    totalEmailTasks: 1247,
    successfulTasks: 1207,
    activeSpecialists: 12,
  };

  const emailTaskDetails = [
    // Your email task details here
  ];

  const paretoTableData = [
    { cause: "Sync error", count: 19 },
    { cause: "Template miss", count: 11 },
    { cause: "Invalid token", count: 6 },
    { cause: "Other", count: 27 },
  ];
  const lineTableData = [
    { month: "January", weeks: [4, 6, 3, 5] },
    { month: "February", weeks: [9, 10, 8, 10] },
    { month: "March", weeks: [7, 9, 6, 7] },
    { month: "April", weeks: [3, 6, 9, 10] },
  ];

  const barTableData = [
    { month: "January", tasks: 18 },
    { month: "February", tasks: 37 },
    { month: "March", tasks: 29 },
    { month: "April", tasks: 28 },
  ];

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <EmailSummaryCards {...summaryData} />
      <EmailTablePanel data={emailTaskDetails} />

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-300 my-6 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-500">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-5 py-3 whitespace-nowrap text-lg font-semibold rounded-t-lg ${
              activeTab === idx
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab(idx)}
            aria-selected={activeTab === idx}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Current Tab Content */}
      <div
        role="tabpanel"
        className="transition-opacity duration-300 ease-in-out"
      >
        <ActiveComponent
          data={
            activeTab === 0
              ? paretoTableData
              : activeTab === 1
              ? lineTableData
              : barTableData
          }
        />
      </div>
    </div>
  );
};

export default EmailPage;
