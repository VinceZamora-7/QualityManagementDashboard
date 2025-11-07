import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function TeamPerformanceChart({ data }) {
  return (
    <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
      <h4 style={{ marginTop: 0 }}>Peer Rejections</h4>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tasks" fill="#76b7b2" name="Tasks" />
            <Bar dataKey="errors" fill="#e15759" name="Errors" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
