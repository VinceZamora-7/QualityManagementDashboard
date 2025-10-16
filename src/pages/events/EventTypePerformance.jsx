import React from "react";

const eventTypePerformance = [
  { name: "Webinars (Online)", percent: 94.2, color: "bg-green-500" },
  { name: "Conferences (Large)", percent: 89.7, color: "bg-indigo-500" },
  { name: "Workshops (In-Person)", percent: 91.8, color: "bg-fuchsia-500" },
];

const EventTypePerformance = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 w-full">
    <h2 className="font-bold text-xl text-gray-800 mb-6 border-b pb-3">
      Success Rate by Event Type
    </h2>
    {eventTypePerformance.map((et) => (
      <div key={et.name} className="mb-6">
        <div className="flex justify-between items-end mb-1">
          <span className="text-gray-700 font-medium">{et.name}</span>
          <span className="text-base font-bold text-gray-800">
            {et.percent.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`${et.color} h-2.5 rounded-full shadow-inner transition-all duration-700 ease-out`}
            style={{ width: `${et.percent}%` }}
          />
        </div>
      </div>
    ))}
    <p className="text-sm text-gray-500 mt-4 pt-3 border-t">
      Target success rate is 90%. Focus on optimizing Conference execution.
    </p>
  </div>
);

export default EventTypePerformance;
