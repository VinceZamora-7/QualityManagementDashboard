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

const data = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Peer Rejects",
      data: [18, 37, 29, 28],
      backgroundColor: "rgba(75,192,192,0.6)",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // controlled by container height
  animation: {
    duration: 1000, // animation duration in ms
    easing: "easeInOutQuart", // easing function
    animateScale: true, // animate scaling of bars
    animateRotate: false, // no rotate animation on bars
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Peer Reject Data",
      font: {
        size: 18,
        weight: "bold",
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
  },
};

const BarPanel = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 max-w-4xl mx-auto mt-8">
      <div style={{ height: 350, width: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarPanel;
