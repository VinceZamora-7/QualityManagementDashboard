import React from "react";
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

const BarTablePanel = ({ data }) => {
  const chartData = {
    labels: data.map((r) => r.month),
    datasets: [
      {
        label: "Tasks",
        data: data.map((r) => r.tasks),
        backgroundColor: [
          "rgba(59,130,246,0.85)",
          "rgba(99,102,241,0.80)",
          "rgba(34,197,94,0.80)",
          "rgba(239,68,68,0.75)",
        ],
        borderRadius: 12,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Monthly Email Tasks", font: { size: 20 } },
      tooltip: { enabled: true },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutCubic",
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 16 } },
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 16 } },
        grid: { color: "#f1f5f9" },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 mt-8 max-w-2xl mx-auto">
      <Bar data={chartData} options={options} height={150} />
    </div>
  );
};

export default BarTablePanel;
