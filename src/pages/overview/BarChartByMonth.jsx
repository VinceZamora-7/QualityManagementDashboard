import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const BarChartByMonth = ({ serviceLines, months, selectedMonthIdx }) => {
  const data = {
    labels: serviceLines.map((line) => line.name),
    datasets: [
      {
        label: months[selectedMonthIdx],
        data: serviceLines.map((line) => line.monthly[selectedMonthIdx]),
        backgroundColor: serviceLines.map((line) => line.color),
        borderRadius: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Service Line Comparison - ${months[selectedMonthIdx]}`,
      },
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
  return <Bar data={data} options={options} height={150} />;
};

export default BarChartByMonth;
