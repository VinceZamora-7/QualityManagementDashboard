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

const ServiceLineCard = ({ name, description, status, tasks }) => {
  const data = {
    labels: ["Tasks"],
    datasets: [
      {
        label: "Tasks Count",
        data: [tasks],
        backgroundColor: "rgba(59,130,246,0.7)",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: 150, // Adjust max as per your task range
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between max-w-sm">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between text-sm text-gray-700 font-medium mb-4">
        <span>Status: {status}</span>
        <span>Tasks: {tasks}</span>
      </div>
      <div style={{ height: 80, width: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

const OverviewPageWithCharts = () => {
  const serviceLines = [
    {
      name: "Event Management",
      description:
        "Real-time analytics for managing event quality and execution.",
      status: "Active",
      tasks: 82,
    },
    {
      name: "Email Campaigns",
      description: "Monitoring and performance metrics for marketing emails.",
      status: "Active",
      tasks: 45,
    },
    {
      name: "BAP Service Line",
      description: "Tracking and quality assurance for BAP processes.",
      status: "Maintenance",
      tasks: 37,
    },
    {
      name: "Data Analytics",
      description: "Insights and KPIs across multiple service lines.",
      status: "Active",
      tasks: 50,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-7xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Service Lines Overview</h1>
      <p className="text-gray-600 mb-8">
        Summary view of all service lines with status and task progress
        visualization.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {serviceLines.map((line, idx) => (
          <ServiceLineCard key={idx} {...line} />
        ))}
      </div>
    </div>
  );
};

export default OverviewPageWithCharts;
