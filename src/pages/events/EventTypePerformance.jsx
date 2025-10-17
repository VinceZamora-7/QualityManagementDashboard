import React from "react";

const eventTypePerformance = [
  { name: "Event Setup", percent: 21 },
  { name: "Event Update", percent: 5 },
];

// Function to select color class based on percentage
const getColorClass = (percent) => {
  if (percent <= 25) return "bg-green-500";
  if (percent <= 75) return "bg-orange-500";
  return "bg-red-500";
};

const EventTypePerformance = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 w-full">
    <h2 className="font-bold text-xl text-gray-800 mb-6 border-b pb-3">
      Peer Rejection Rate by Event Type
    </h2>
    {eventTypePerformance.map((et) => {
      const colorClass = getColorClass(et.percent);

      return (
        <div key={et.name} className="mb-6">
          <div className="flex justify-between items-end mb-1">
            <span className="text-gray-700 font-medium">{et.name}</span>
            <span className="text-base font-bold text-gray-800">
              {Math.round(et.percent)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`${colorClass} h-4 rounded-full shadow-inner transition-all duration-700 ease-out`}
              style={{ width: `${et.percent}%` }}
            />
          </div>
        </div>
      );
    })}
    <p className="text-sm text-gray-500 mt-4 pt-3 border-t">
      Target success rate is 90%. Focus on optimizing Conference execution.
    </p>
  </div>
);

export default EventTypePerformance;
