import React from "react";

const metrics = [
  {
    title: "Event Success Rate",
    value: "92.1%",
    color: "text-green-600",
    icon: "✅",
    bg: "bg-green-100",
  },
  {
    title: "Attendance Rate",
    value: "87.3%",
    color: "text-indigo-700",
    icon: "👥",
    bg: "bg-indigo-100",
  },
  {
    title: "Satisfaction Score",
    value: "4.5/5",
    color: "text-fuchsia-600",
    icon: "⭐",
    bg: "bg-fuchsia-100",
  },
  {
    title: "Upcoming Events",
    value: "15",
    color: "text-amber-600",
    icon: "🗓️",
    bg: "bg-amber-100",
  },
];

const MetricCards = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {metrics.map((m) => (
      <div
        key={m.title}
        className="flex items-center p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5 border border-gray-100 cursor-default"
      >
        <div className={`p-4 rounded-full ${m.bg} mr-4`}>
          <span className="text-2xl">{m.icon}</span>
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
