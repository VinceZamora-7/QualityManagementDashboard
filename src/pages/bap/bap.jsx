import React, { useState, useMemo } from "react";
import KPI from "./KPI";
import MonthlyPerformanceChart from "./MonthlyPerformanceChart";
import ErrorCausesChart from "./ErrorCausesChart";
import TeamPerformanceChart from "./TeamPerformanceChart";
import ImprovementPanel from "./ImprovementPanel";
import {
  COLORS,
  monthlyPerformance,
  teamErrorData,
  errorCauses,
} from "../../data/bapData/performanceData";

export default function BudgetAndPlanningPage() {
  const [year, setYear] = useState(2025);

  // Compute key performance metrics
  const metrics = useMemo(() => {
    const totalTasks = monthlyPerformance.reduce((sum, m) => sum + m.tasks, 0);
    const totalErrors = monthlyPerformance.reduce(
      (sum, m) => sum + m.errors,
      0
    );
    const errorRate = ((totalErrors / totalTasks) * 100).toFixed(2);
    const avgTasksPerMonth = Math.round(totalTasks / monthlyPerformance.length);
    const efficiency = (100 - errorRate).toFixed(1);
    return { totalTasks, totalErrors, errorRate, avgTasksPerMonth, efficiency };
  }, []);

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Segoe UI, Roboto, Arial, sans-serif",
        background: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
        <label style={{ marginRight: 8, color: "#444" }}>Year</label>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{ padding: 6 }}
        >
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
        </select>
      </div>

      {/* KPI Section */}
      <section style={{ display: "flex", marginBottom: 18, flexWrap: "wrap" }}>
        <KPI
          title="Total Tasks Completed"
          value={metrics.totalTasks}
          sub={`Year ${year}`}
        />
        <KPI
          title="Total Errors"
          value={metrics.totalErrors}
          sub="Recorded issues"
        />
        <KPI
          title="Error Rate"
          value={`${metrics.errorRate}%`}
          sub="Overall project rate"
        />
        <KPI
          title="Avg Tasks / Month"
          value={metrics.avgTasksPerMonth}
          sub="Performance trend"
        />
        <KPI
          title="Efficiency Score"
          value={`${metrics.efficiency}%`}
          sub="(100 - error rate)"
        />
      </section>

      {/* Charts Section */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <MonthlyPerformanceChart data={monthlyPerformance} />
        <ErrorCausesChart data={errorCauses} colors={COLORS} />
      </div>

      {/* Team + Improvement */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginTop: 16,
        }}
      >
        <TeamPerformanceChart data={teamErrorData} />
        <ImprovementPanel />
      </div>
    </div>
  );
}
