import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/**
 * Budget and Planning (BAP) page
 * Place this file at: /src/pages/bap/bap.jsx
 *
 * Notes:
 * - Uses recharts for visualizations. Install with: npm install recharts
 * - This is a self-contained example with mock data and simple inline styling.
 */

const COLORS = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f"];

const sampleMonthly = [
  { month: "Jan", budget: 120000, actual: 115000 },
  { month: "Feb", budget: 110000, actual: 98000 },
  { month: "Mar", budget: 130000, actual: 125000 },
  { month: "Apr", budget: 125000, actual: 140000 },
  { month: "May", budget: 140000, actual: 135000 },
  { month: "Jun", budget: 150000, actual: 148000 },
  { month: "Jul", budget: 155000, actual: 160000 },
  { month: "Aug", budget: 145000, actual: 138000 },
  { month: "Sep", budget: 135000, actual: 128000 },
  { month: "Oct", budget: 140000, actual: 142000 },
  { month: "Nov", budget: 150000, actual: 149000 },
  { month: "Dec", budget: 160000, actual: 170000 },
];

const expenseByCategory = [
  { name: "Salaries", value: 720000 },
  { name: "Software", value: 120000 },
  { name: "Consultants", value: 90000 },
  { name: "Training", value: 45000 },
  { name: "Travel", value: 60000 },
];

const departmentSpend = [
  { dept: "Finance", allocated: 300000, spent: 280000 },
  { dept: "Ops", allocated: 250000, spent: 265000 },
  { dept: "IT", allocated: 200000, spent: 190000 },
  { dept: "HR", allocated: 120000, spent: 115000 },
  { dept: "R&D", allocated: 180000, spent: 200000 },
];

const formatCurrency = (n) =>
  n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

function KPI({ title, value, sub }) {
  return (
    <div
      style={{
        flex: 1,
        padding: 12,
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        minWidth: 160,
        marginRight: 12,
      }}
    >
      <div style={{ fontSize: 12, color: "#777" }}>{title}</div>
      <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{value}</div>
      {sub && (
        <div style={{ fontSize: 12, color: "#999", marginTop: 6 }}>{sub}</div>
      )}
    </div>
  );
}

export default function BudgetAndPlanningPage() {
  const [year, setYear] = useState(new Date().getFullYear());

  const totals = useMemo(() => {
    const totalBudget = sampleMonthly.reduce((s, m) => s + m.budget, 0);
    const totalActual = sampleMonthly.reduce((s, m) => s + m.actual, 0);
    const remaining = totalBudget - totalActual;
    const variancePct = ((totalActual - totalBudget) / totalBudget) * 100;
    return { totalBudget, totalActual, remaining, variancePct };
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

      <section style={{ display: "flex", marginBottom: 18 }}>
        <KPI
          title="Total Budget"
          value={formatCurrency(totals.totalBudget)}
          sub={`Year ${year}`}
        />
        <KPI
          title="Total Spent"
          value={formatCurrency(totals.totalActual)}
          sub="Actuals to date"
        />
        <KPI
          title="Remaining"
          value={formatCurrency(totals.remaining)}
          sub={totals.remaining >= 0 ? "Under budget" : "Over budget"}
        />
        <KPI
          title="Variance"
          value={`${totals.variancePct.toFixed(1)}%`}
          sub={totals.variancePct > 0 ? "Over" : "Under"}
        />
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
          <h4 style={{ marginTop: 0 }}>Monthly Budget vs Actuals</h4>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sampleMonthly}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="budget"
                  stroke="#4e79a7"
                  name="Budget"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#f28e2b"
                  name="Actual"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
          <h4 style={{ marginTop: 0 }}>Expense Breakdown</h4>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseByCategory}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  innerRadius={36}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {expenseByCategory.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS[idx % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginTop: 16,
        }}
      >
        <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
          <h4 style={{ marginTop: 0 }}>Department Spend vs Allocation</h4>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentSpend}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" />
                <YAxis tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Legend />
                <Bar dataKey="allocated" fill="#76b7b2" name="Allocated" />
                <Bar dataKey="spent" fill="#e15759" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
          <h4 style={{ marginTop: 0 }}>Recent Transactions (sample)</h4>
          <div style={{ maxHeight: 260, overflow: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr
                  style={{ textAlign: "left", borderBottom: "1px solid #eee" }}
                >
                  <th style={{ padding: "8px 6px" }}>Date</th>
                  <th style={{ padding: "8px 6px" }}>Category</th>
                  <th style={{ padding: "8px 6px" }}>Dept</th>
                  <th style={{ padding: "8px 6px" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { d: "2025-10-03", c: "Consulting", dept: "R&D", a: 32000 },
                  { d: "2025-09-18", c: "Software", dept: "IT", a: 12500 },
                  { d: "2025-08-24", c: "Training", dept: "HR", a: 7200 },
                  { d: "2025-07-12", c: "Travel", dept: "Ops", a: 4800 },
                  { d: "2025-06-02", c: "Salaries", dept: "Finance", a: 60000 },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #fafafa" }}>
                    <td style={{ padding: "8px 6px" }}>{row.d}</td>
                    <td style={{ padding: "8px 6px" }}>{row.c}</td>
                    <td style={{ padding: "8px 6px" }}>{row.dept}</td>
                    <td style={{ padding: "8px 6px", fontWeight: 600 }}>
                      {formatCurrency(row.a)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
