import React from "react";

const metrics = [
  {
    title: "Total Tasks",
    value: "119",
    color: "text-green-600",
    icon: "📋", // Clipboard for tasks
    bg: "bg-green-100",
  },
  {
    title: "Total Peer rejections",
    value: "87",
    color: "text-orange-600",
    icon: "🙅‍♂️", // Crossed arms or no symbol for rejections
    bg: "bg-orange-200",
  },
  {
    title: "Non-Fatals",
    value: "4",
    color: "text-orange-600",
    icon: "⚠️", // Warning sign for non-fatals
    bg: "bg-orange-200",
  },
  {
    title: "Fatal",
    value: "15",
    color: "text-red-600",
    icon: "❌", // Cross mark for fatal
    bg: "bg-red-100",
  },
];

const MetricCards = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {metrics.map((m) => (
      <div
        key={m.title}
        className="flex items-center p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5 border border-gray-100 cursor-default"
      >
        <div
          className={`p-4 rounded-full ${m.bg} mr-4 flex justify-center items-center`}
        >
          <span className="text-2xl flex justify-center items-center">
            {m.icon}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">
            {m.title}
          </p>
          <p className={`text-2xl font-bold ${m.color} mt-0.5`}>{m.value}</p>
        </div>
      </div>
    ))}
  </section>
);

export default MetricCards;
