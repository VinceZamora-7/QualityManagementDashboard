import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Data with weeks in each month
const weeklyData = {
  Jan: [
    { name: "Week 1", value: 10 },
    { name: "Week 2", value: 8 },
    { name: "Week 3", value: 7 },
    { name: "Week 4", value: 5 },
  ],
  Feb: [
    { name: "Week 1", value: 12 },
    { name: "Week 2", value: 11 },
    { name: "Week 3", value: 14 },
    { name: "Week 4", value: 8 },
  ],
  Mar: [
    { name: "Week 1", value: 15 },
    { name: "Week 2", value: 13 },
    { name: "Week 3", value: 12 },
    { name: "Week 4", value: 10 },
  ],
  Apr: [
    { name: "Week 1", value: 20 },
    { name: "Week 2", value: 18 },
    { name: "Week 3", value: 16 },
    { name: "Week 4", value: 16 },
  ],
  May: [
    { name: "Week 1", value: 14 },
    { name: "Week 2", value: 15 },
    { name: "Week 3", value: 16 },
    { name: "Week 4", value: 15 },
  ],
};

const months = ["Jan", "Feb", "Mar", "Apr", "May"];

const LinePanel = () => {
  const [selectedMonth, setSelectedMonth] = useState("Jan");

  // Data for the selected month (weekly data)
  const dataForChart = weeklyData[selectedMonth] || [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 max-w-4xl mx-auto mt-8">
      <div className="flex items-center mb-4 space-x-4">
        <label htmlFor="monthSelect" className="font-medium text-gray-700">
          Select Month:
        </label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded-md p-1 text-gray-700"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={dataForChart}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LinePanel;
