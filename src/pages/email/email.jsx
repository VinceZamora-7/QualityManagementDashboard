import React, { useState } from "react";
import EmailSummaryCards from "./EmailSummaryCards";
import EmailTablePanel from "./EmailTablePanel";
import PieChart from "./pieChart";
import BarTablePanel from "./barTable/BarTablePanel";
import LineTablePanel from "./lineTable/LineTablePanel";
import ParetoTablePanel from "./paretoTable/ParetoTablePanel";
import PRRejectionPanel from "./PRRejectionPanel";

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
    {
      taskId: "ST123311",
      specialist: "Jane Doe",
      status: "Valid",
      createdAt: "2025-10-20 08:12 AM",
      isError: true,
    },
    {
      taskId: "ST123311",
      specialist: "John Smith",
      status: "Valid",
      createdAt: "2025-10-20 09:34 AM",
      isError: true,
    },
    {
      taskId: "ST123311",
      specialist: "Alice Johnson",
      status: "Not Valid",
      createdAt: "2025-10-21 10:45 AM",
      isError: true,
    },
    {
      taskId: "ST123311",
      specialist: "Mike Brown",
      status: "Valid",
      createdAt: "2025-10-21 11:20 AM",
      isError: true,
    },
    {
      taskId: "ST123311",
      specialist: "Emily Davis",
      status: "Not Valid",
      createdAt: "2025-10-21 02:15 PM",
      isError: true,
    },
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 justify-start items-start">
        <EmailSummaryCards {...summaryData} />
        <PieChart className="w-full max-w-2xl min-h-96" />
      </div>
      <EmailTablePanel data={emailTaskDetails} />
      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-300 my-6 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-500">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-5 py-3 whitespace-nowrap text-lg font-semibold rounded-t-lg transition-colors duration-200 ${
              activeTab === idx
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab(idx)}
            aria-selected={activeTab === idx}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div
        role="tabpanel"
        className="transition-opacity duration-300 ease-in-out"
        aria-live="polite"
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
      &nbsp;
      <PRRejectionPanel />
    </div>
  );
};

export default EmailPage;
