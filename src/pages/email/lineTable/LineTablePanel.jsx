import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const colors = ["#3b82f6", "#6366f1", "#22c55e", "#f59e42"];

const LineTablePanel = ({ data }) => {
  const chartData = {
    labels: data.map((r) => r.month),
    datasets: [0, 1, 2, 3].map((weekIdx) => ({
      label: `Week ${weekIdx + 1}`,
      data: data.map((r) => r.weeks[weekIdx]),
      borderColor: colors[weekIdx],
      backgroundColor: colors[weekIdx] + "30",
      tension: 0.36,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: false,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { font: { size: 15 } } },
      title: {
        display: true,
        text: "Weekly Email Tasks By Month",
        font: { size: 20 },
      },
    },
    animation: {
      duration: 1200,
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 16 } } },
      y: {
        beginAtZero: true,
        grid: { color: "#f1f5f9" },
        ticks: { font: { size: 16 } },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 mt-8 max-w-3xl mx-auto">
      <Line data={chartData} options={options} height={150} />
    </div>
  );
};

export default LineTablePanel;
