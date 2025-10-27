import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PRRejectionPanel = () => {
  // Weekly rejection data grouped by month
  const weeklyDataByMonth = {
    January: [2, 3, 4, 1],
    February: [5, 7, 8, 5],
    March: [3, 4, 5, 3],
    April: [7, 8, 9, 6],
    May: [6, 5, 4, 5],
  };

  const months = Object.keys(weeklyDataByMonth);
  const currentMonth = "January";
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Sample peer rejected tasks for left card fixed month
  const peerRejectedTasks = [
    { id: "PR1", task: "Task Alpha", specialist: "Jane", date: "January" },
    { id: "PR2", task: "Task Beta", specialist: "John", date: "February" },
    { id: "PR3", task: "Task Gamma", specialist: "Alice", date: "January" },
    { id: "PR4", task: "Task Delta", specialist: "Mike", date: "April" },
    { id: "PR5", task: "Task Epsilon", specialist: "Emily", date: "January" },
  ];

  const currentMonthTasks = peerRejectedTasks.filter(
    (task) => task.date === currentMonth
  );

  // Weekly data for selected month for bar chart
  const weeklyData = weeklyDataByMonth[selectedMonth] || [];

  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const data = {
    labels: weekLabels,
    datasets: [
      {
        label: `Peer Rejections in ${selectedMonth}`,
        data: weeklyData,
        backgroundColor: "rgba(99,102,241, 0.8)",
        borderColor: "rgba(79,70,229,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: { duration: 300 },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: `Weekly Peer Rejections for ${selectedMonth}`,
      },
    },
  };

  // Sum of weekly rejections in current month for left card
  const totalCurrentMonthRejections = weeklyDataByMonth[currentMonth].reduce(
    (acc, val) => acc + val,
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        Peer Rejection Panel
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left card fixed to currentMonth */}
        <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-5 border-b border-indigo-300 pb-2 text-indigo-700">
            Current Month Data ({currentMonth})
          </h3>

          <ul className="list-disc list-inside space-y-3 mb-8 text-gray-900 text-lg">
            <li>
              Month: <strong>{currentMonth}</strong>
            </li>
            <li>
              Peer Rejections: <strong>{totalCurrentMonthRejections}</strong>
            </li>
          </ul>

          <h4 className="text-lg font-semibold mb-3 text-gray-700">
            Peer Rejected Tasks
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md text-left">
              <thead className="bg-indigo-100 text-indigo-900">
                <tr>
                  <th className="py-3 px-5 border-b border-indigo-200 font-medium">
                    Task ID
                  </th>
                  <th className="py-3 px-5 border-b border-indigo-200 font-medium">
                    Task
                  </th>
                  <th className="py-3 px-5 border-b border-indigo-200 font-medium">
                    Specialist
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentMonthTasks.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-5 text-center text-gray-500 font-medium"
                    >
                      No peer rejected tasks for this month.
                    </td>
                  </tr>
                )}
                {currentMonthTasks.map(({ id, task, specialist }, idx) => (
                  <tr
                    key={id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-indigo-50"}
                  >
                    <td className="py-3 px-5 border-b border-gray-300">{id}</td>
                    <td className="py-3 px-5 border-b border-gray-300">
                      {task}
                    </td>
                    <td className="py-3 px-5 border-b border-gray-300">
                      {specialist}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right card - weekly bar chart filterable by month */}
        <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-5 text-gray-900">
            Weekly Rejections Bar Chart (Filter by Month)
          </h3>

          <div className="flex flex-wrap gap-3 mb-6">
            {months.map((month) => (
              <button
                key={month}
                className={`px-5 py-2 rounded-md font-semibold transition-colors duration-200 ${
                  selectedMonth === month
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedMonth(month)}
                type="button"
              >
                {month}
              </button>
            ))}
          </div>

          <Bar data={data} options={options} height={200} />
        </div>
      </div>
    </div>
  );
};

export default PRRejectionPanel;
