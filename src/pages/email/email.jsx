import React from "react";

const EmailDashboard = () => {
  // Dummy static data (replace with your dynamic API data)
  const metrics = [
    { title: "Emails Sent", value: 15000 },
    { title: "Delivery Rate", value: "98.5%" },
    { title: "Open Rate", value: "42.7%" },
    { title: "Click Rate", value: "10.3%" },
    { title: "Bounce Rate", value: "1.5%" },
    { title: "Unsubscribe Rate", value: "0.3%" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-6">Email Service Line Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {metrics.map((m) => (
          <div
            key={m.title}
            className="bg-white p-4 rounded-lg shadow flex flex-col items-center"
          >
            <h3 className="text-gray-600 text-sm mb-1">{m.title}</h3>
            <p className="text-xl font-semibold text-indigo-600">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Placeholder charts and tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow h-64 flex flex-col justify-center items-center">
          <p className="text-gray-700">[Trend Chart Placeholder]</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow h-64 flex flex-col justify-center items-center">
          <p className="text-gray-700">[Deliverability Overview Placeholder]</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow h-64 flex flex-col justify-center items-center">
          <p className="text-gray-700">[Top Campaigns Table Placeholder]</p>
        </div>
      </div>
    </div>
  );
};

export default EmailDashboard;
