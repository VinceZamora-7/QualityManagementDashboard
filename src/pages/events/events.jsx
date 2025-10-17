import React, { useState } from "react";
import ParetoPanel from "./paretoTable/ParetoPanel";
import LinePanel from "./lineTable/line";
import MetricCards from "./MetricCards";
import EventTypePerformance from "./EventTypePerformance";
import OperationalMetrics from "./OperationalMetrics";
import PRGuideButton from "./prguide/PRGuideButton";

const TABS = [
  { id: "pareto", label: "Pareto Analysis", component: <ParetoPanel /> },
  { id: "line", label: "Line Chart", component: <LinePanel /> },
  // add additional tables/components here as needed
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("pareto");

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans antialiased">
      <header className="bg-white py-6 px-4 border-b border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          {/* Title and subtitle omitted for brevity */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Event Quality Management Dashboard
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            Real-time analytics for planning, execution, and attendee
            satisfaction.
          </p>
        </div>
        <div className="flex justify-end items-center">
          <PRGuideButton />
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-8">
        &nbsp;
        <MetricCards />
        <section className="flex flex-col lg:flex-row gap-6 lg:gap-8 mx-auto max-w-7xl">
          <EventTypePerformance />
          <OperationalMetrics />
        </section>
        {/* Navigation Tabs */}
        <nav className="flex border-b border-gray-300 space-x-4 max-w-7xl mx-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-semibold rounded-t-lg focus:outline-none ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        {/* Content Panel */}
        <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 max-w-7xl mx-auto min-h-[400px]">
          {TABS.find((tab) => tab.id === activeTab)?.component}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
