// src/lineTable/LinePanel.jsx or similar
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const lineData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 45 },
  { name: "Mar", value: 50 },
  { name: "Apr", value: 70 },
  { name: "May", value: 60 },
];

// LinePanel.jsx
const LinePanel = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 max-w-4xl mx-auto mt-8">
    <LineChart width={500} height={300} data={lineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  </div>
);

export default LinePanel;
