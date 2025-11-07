import React, { useState } from "react";
import Header from "./Header";
import SummaryCard from "./SummaryCard";
import ServiceCard from "./ServiceCard";
import QuickActionButton from "./QuickActionButton";
import BarChartByMonth from "./BarChartByMonth";

const months = ["Jan", "Feb", "Mar", "Apr"];
const serviceLines = [
  {
    key: "events",
    name: "Events",
    status: "Healthy",
    errorRate: "2.2%",
    metricLabel: "Events Today",
    metricValue: 154,
    extra: "5 SDS",
    color: "rgba(59,130,246, 0.8)",
    monthly: [140, 154, 120, 170],
  },
  {
    key: "email",
    name: "Email",
    status: "Operable",
    errorRate: "3.8%",
    metricLabel: "Emails Today",
    metricValue: 218,
    extra: "12 SDS",
    color: "rgba(34,197,94, 0.8)",
    monthly: [210, 198, 250, 218],
  },
  {
    key: "bap",
    name: "BAP",
    status: "Stable",
    errorRate: "1.9%",
    metricLabel: "Budgets Planned",
    metricValue: 79,
    extra: "3 SDS",
    color: "rgba(139,92,246, 0.8)",
    monthly: [59, 65, 75, 79],
  },
  {
    key: "data",
    name: "Data",
    status: "Excellent",
    errorRate: "0.9%",
    metricLabel: "Data Sets",
    metricValue: 62,
    extra: "2 SDS",
    color: "rgba(253,224,71, 0.9)",
    monthly: [62, 80, 55, 92],
  },
  {
    key: "socialTriage",
    name: "Social Triage",
    status: "Attention Needed",
    errorRate: "4.5%",
    metricLabel: "Cases",
    metricValue: 201,
    extra: "9 SDS",
    color: "rgba(239,68,68, 0.8)",
    monthly: [190, 201, 206, 199],
  },
  {
    key: "sdp",
    name: "SDP",
    status: "Efficient",
    errorRate: "3.1%",
    metricLabel: "Plans Today",
    metricValue: 90,
    extra: "4 SDP",
    color: "rgba(16,185,129, 0.8)",
    monthly: [70, 85, 90, 93],
  },
  {
    key: "sdpBap",
    name: "SDP-BAP",
    status: "Scaling",
    errorRate: "2.7%",
    metricLabel: "Integrations",
    metricValue: 112,
    extra: "7 SDP",
    color: "rgba(6,182,212, 0.8)",
    monthly: [90, 100, 105, 112],
  },
];
const summaryCards = [
  {
    title: "Active Service Lines",
    value: "7",
    subtext: "2 new this quarter",
    increase: true,
  },
  {
    title: "Overall Performance",
    value: "94.2%",
    subtext: "2.1% from last month",
    increase: true,
  },
  {
    title: "Total Error Rate",
    value: "2.4%",
    subtext: "8.3% YoY",
    increase: false,
  },
  {
    title: "Issues Requiring Attention",
    value: "3",
    subtext: "1 from yesterday",
    increase: false,
  },
];

const Dashboard = () => {
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="grid grid-cols-4 gap-6">
          {summaryCards.map((card, idx) => (
            <SummaryCard key={idx} {...card} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {serviceLines.map((line) => (
            <ServiceCard key={line.key} {...line} />
          ))}
        </div>
        <section className="bg-white p-6 rounded shadow space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="font-semibold mb-2">
              Service Line Performance Trends
            </h2>
            <select
              className="ml-4 border rounded px-3 py-1 text-sm"
              value={selectedMonthIdx}
              onChange={(e) => setSelectedMonthIdx(Number(e.target.value))}
            >
              {months.map((m, idx) => (
                <option key={m} value={idx}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <BarChartByMonth
            serviceLines={serviceLines}
            months={months}
            selectedMonthIdx={selectedMonthIdx}
          />
          <div className="mt-6 space-y-4">{/* Add your insights here */}</div>
        </section>
        <div className="flex gap-4 mt-8">
          <QuickActionButton
            text="Generate Executive Report"
            icon={<span>📊</span>}
          />
          <QuickActionButton
            text="Schedule Service Review"
            icon={<span>📅</span>}
          />
          <QuickActionButton text="View All Alerts" icon={<span>⚠️</span>} />
          <QuickActionButton
            text="Export Dashboard Data"
            icon={<span>📁</span>}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
