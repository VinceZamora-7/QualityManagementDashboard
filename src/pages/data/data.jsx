import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = {
  totalProduction: 10000,
  defectiveProductionPercent: 2.5,
  productionRate: 150,
  averageCycleDuration: 4.2,
  defectTypes: [
    { name: "Type A", count: 40 },
    { name: "Type B", count: 25 },
    { name: "Type C", count: 35 },
  ],
};

function QualityDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h4 className="text-gray-500 font-semibold mb-2">Total Production</h4>
          <p className="text-2xl font-bold text-gray-900">
            {data.totalProduction}
          </p>
          <span className="text-gray-400 text-sm">units</span>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h4 className="text-gray-500 font-semibold mb-2">
            Defective Production
          </h4>
          <p className="text-2xl font-bold text-red-600">
            {data.defectiveProductionPercent}%
          </p>
          <span className="text-gray-400 text-sm">of total</span>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h4 className="text-gray-500 font-semibold mb-2">Production Rate</h4>
          <p className="text-2xl font-bold text-green-600">
            {data.productionRate}
          </p>
          <span className="text-gray-400 text-sm">units/hour</span>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h4 className="text-gray-500 font-semibold mb-2">
            Avg. Cycle Duration
          </h4>
          <p className="text-2xl font-bold text-blue-600">
            {data.averageCycleDuration}
          </p>
          <span className="text-gray-400 text-sm">hours</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Defect Types
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.defectTypes}>
            <XAxis dataKey="name" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default QualityDashboard;
