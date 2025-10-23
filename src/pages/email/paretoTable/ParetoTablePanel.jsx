import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const ParetoTablePanel = ({ data }) => {
  const total = data.reduce((sum, r) => sum + r.count, 0);
  let cumulative = 0;
  const cumulativePercent = data.map((r) => {
    cumulative += r.count;
    return ((cumulative / total) * 100).toFixed(1);
  });

  const chartData = {
    labels: data.map((r) => r.cause),
    datasets: [
      {
        type: "bar",
        label: "Frequency",
        data: data.map((r) => r.count),
        backgroundColor: "rgba(239,68,68,0.8)",
        borderRadius: 12,
        borderSkipped: false,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Cumulative %",
        data: cumulativePercent,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.2)",
        yAxisID: "y1",
        tension: 0.36,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { font: { size: 15 } } },
      title: {
        display: true,
        text: "Pareto Analysis - Email Task Errors",
        font: { size: 20 },
      },
      tooltip: { mode: "nearest" },
    },
    animation: { duration: 1200 },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Frequency" },
        grid: { color: "#f1f5f9" },
        ticks: { font: { size: 16 } },
      },
      y1: {
        beginAtZero: true,
        min: 0,
        max: 100,
        position: "right",
        grid: { drawOnChartArea: false },
        title: { display: true, text: "Cumulative %" },
        ticks: { callback: (value) => value + "%", font: { size: 16 } },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 mt-8 max-w-3xl mx-auto">
      <Chart type="bar" data={chartData} options={options} height={150} />
    </div>
  );
};

export default ParetoTablePanel;
