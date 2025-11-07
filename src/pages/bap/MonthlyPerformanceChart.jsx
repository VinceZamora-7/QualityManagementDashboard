import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function MonthlyPerformanceChart({ data }) {
  return (
    <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
      <h4 style={{ marginTop: 0 }}>Monthly Tasks vs Errors</h4>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#4e79a7"
              name="Tasks Completed"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="errors"
              stroke="#e15759"
              name="Errors"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
