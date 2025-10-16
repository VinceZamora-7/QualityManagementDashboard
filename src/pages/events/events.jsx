import React from "react";
import MetricCards from "./MetricCards";
import EventTypePerformance from "./EventTypePerformance";
import OperationalMetrics from "./OperationalMetrics";
import ParetoPanel from "./ParetoPanel";
import PRGuideButton from "./prguide/PRGuideButton"; // Import the new component with popup logic

const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans antialiased">
    <header className="bg-white py-6 px-4 border-b border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Title and Subtitle */}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          <span className="inline-block bg-indigo-100 text-indigo-600 p-2 rounded-full">
            {/* Example icon: Chart */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 17V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm8 0V12a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm8 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"
              />
            </svg>
          </span>
          Event Quality Management Dashboard
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-2">
          Real-time analytics for planning, execution, and attendee
          satisfaction.
        </p>
      </div>
      {/* Button side */}
      <div className="flex justify-end items-center">
        <PRGuideButton />
      </div>
    </header>
    &nbsp;{/* Spacer */}
    <div className="max-w-7xl mx-auto space-y-8">
      <MetricCards />
      <section className="flex flex-col lg:flex-row gap-6 lg:gap-8 mx-auto">
        <EventTypePerformance />
        <OperationalMetrics />
      </section>
      <section>
        <ParetoPanel />
      </section>
    </div>
  </div>
);

export default Dashboard;
