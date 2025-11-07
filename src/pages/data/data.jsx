import React, { useMemo, useState } from "react";

const SAMPLE = {
  kpis: {
    coverage: 88,
    completeness: 94,
    anomalies: 12,
    slas: 97,
  },
  trend: [65, 70, 72, 78, 80, 82, 88, 85, 87, 90, 92, 94],
  barGroups: [
    { name: "Ingest", value: 45 },
    { name: "Transform", value: 30 },
    { name: "Validate", value: 60 },
    { name: "Publish", value: 20 },
  ],
  issues: [
    { id: "D-120", title: "Missing timezone conversions", severity: "High" },
    { id: "D-125", title: "Nulls in customer_id", severity: "Medium" },
    { id: "D-130", title: "Duplicate rows in raw feed", severity: "Low" },
  ],
};

function formatPercent(v) {
  return `${Math.round(v)}%`;
}

function LineChart({ data = [], color = "#0078d4", height = 48 }) {
  const width = 220;
  const padding = 6;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * (width - padding * 2) + padding;
    const y = ((max - d) / (max - min || 1)) * (height - padding * 2) + padding;
    return [x, y];
  });

  const d = points
    .map((p, i) => (i === 0 ? `M${p[0]} ${p[1]}` : `L${p[0]} ${p[1]}`))
    .join(" ");
  const areaD =
    "M" +
    points.map((p) => `${p[0]} ${p[1]}`).join(" L ") +
    ` L${width - padding} ${height - padding} L${padding} ${
      height - padding
    } Z`;

  return (
    <svg width={width} height={height} className="block">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#grad)" />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={2} fill={color} />
      ))}
    </svg>
  );
}

function BarChart({ groups = [], height = 90 }) {
  const width = 300;
  const padding = 10;
  const max = Math.max(...groups.map((g) => g.value), 1);
  const barWidth = (width - padding * 2) / groups.length - 8;

  return (
    <svg width={width} height={height} className="block">
      {groups.map((g, i) => {
        const x = padding + i * (barWidth + 8);
        const h = (g.value / max) * (height - padding * 2);
        const y = height - padding - h;
        const color = i % 2 === 0 ? "#0078d4" : "#68217a"; // MS blue and purple
        return (
          <g key={g.name}>
            <rect x={x} y={y} width={barWidth} height={h} rx={4} fill={color} />
            <text
              x={x + barWidth / 2}
              y={height - 2}
              fontSize={11}
              fill="#605e5c"
              textAnchor="middle"
            >
              {g.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Donut({ value = 0, size = 120, stroke = 14 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(Math.max(0, value), 100);
  const offset = c - (pct / 100) * c;

  return (
    <svg width={size} height={size}>
      <g transform={`translate(${size / 2},${size / 2})`}>
        <circle
          r={r}
          fill="transparent"
          stroke="#edebe9"
          strokeWidth={stroke}
        />
        <circle
          r={r}
          fill="transparent"
          stroke="#0078d4"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={offset}
          transform="rotate(-90)"
        />
        <text
          y="-6"
          textAnchor="middle"
          fill="#323130"
          fontSize={18}
          fontWeight="600"
        >
          {formatPercent(value)}
        </text>
        <text y="14" textAnchor="middle" fill="#605e5c" fontSize={11}>
          coverage
        </text>
      </g>
    </svg>
  );
}

function KPI({ label, value, hint, accent = "text-blue-600" }) {
  return (
    <div className="flex justify-between items-center p-3 rounded border border-gray-300 bg-white shadow-sm">
      <div className="flex flex-col gap-1">
        <div className={`text-lg font-semibold ${accent}`}>{value}</div>
        <div className="text-gray-600 text-xs">{label}</div>
      </div>
      <div className="text-gray-600 text-xs flex-grow text-right">{hint}</div>
    </div>
  );
}

function IssuesTable({ items = [] }) {
  return (
    <div className="overflow-x-auto rounded border border-gray-300 bg-white text-sm mt-2">
      <div className="grid grid-cols-[110px_1fr_100px] p-2 font-semibold text-gray-700 border-b border-gray-300">
        <div>ID</div>
        <div>Title</div>
        <div>Severity</div>
      </div>
      {items.map(({ id, title, severity }) => (
        <div
          key={id}
          className="grid grid-cols-[110px_1fr_100px] p-2 items-center border-b border-gray-300 last:border-none"
        >
          <div className="font-mono text-blue-600">{id}</div>
          <div>{title}</div>
          <div
            className={`text-right font-bold ${
              severity.toLowerCase() === "high"
                ? "text-red-600"
                : severity.toLowerCase() === "medium"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {severity}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DataDashboard() {
  const [selectedRange, setSelectedRange] = useState("12m");

  const trend = useMemo(() => {
    if (selectedRange === "3m") return SAMPLE.trend.slice(-3);
    if (selectedRange === "6m") return SAMPLE.trend.slice(-6);
    return SAMPLE.trend;
  }, [selectedRange]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center text-white font-bold shadow">
              DT
            </div>
            <div>
              <h1 className="text-2xl font-semibold leading-tight">
                Data Quality Dashboard
              </h1>
              <p className="text-gray-600 text-xs">
                Overview of data health, trends and issues
              </p>
            </div>
          </div>
          <div className="flex gap-6 text-xs text-gray-600 whitespace-nowrap">
            <div>Env: Production</div>
            <div>Updated: 5m ago</div>
          </div>
        </header>

        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-6">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <section className="bg-white rounded-lg p-5 shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-gray-700 font-semibold text-sm">
                  Key Indicators
                </h2>
                <div className="flex space-x-2 text-sm">
                  {["3m", "6m", "12m"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedRange(range)}
                      className={`px-3 py-1 rounded-full border transition ${
                        selectedRange === range
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-gray-300 text-gray-600 hover:bg-blue-50"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 flex-wrap">
                <KPI
                  label="Coverage"
                  value={formatPercent(SAMPLE.kpis.coverage)}
                  hint={<LineChart data={trend} />}
                  accent="text-blue-600"
                />
                <KPI
                  label="Completeness"
                  value={formatPercent(SAMPLE.kpis.completeness)}
                  hint={<div className="text-gray-600 text-xs">Fields OK</div>}
                  accent="text-purple-600"
                />
                <KPI
                  label="Anomalies"
                  value={SAMPLE.kpis.anomalies}
                  hint={<div className="text-gray-600 text-xs">last 24h</div>}
                />
                <KPI
                  label="SLAs"
                  value={formatPercent(SAMPLE.kpis.slas)}
                  hint={<div className="text-gray-600 text-xs">on-time</div>}
                />
              </div>
            </section>

            <section className="bg-white rounded-lg p-5 shadow">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-gray-700 font-semibold text-sm">
                  Trends & Distribution
                </h2>
                <span className="text-gray-500 text-xs">Monthly growth</span>
              </div>
              <div className="flex gap-6 items-center flex-wrap">
                <div className="flex-1 min-w-[220px]">
                  <h3 className="text-gray-600 text-xs mb-1">Coverage trend</h3>
                  <LineChart data={trend} color="#0078d4" />
                </div>
                <div className="w-[220px] text-center">
                  <h3 className="text-gray-600 text-xs mb-1">Coverage</h3>
                  <Donut value={SAMPLE.kpis.coverage} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-600 text-xs mb-1">
                  Pipeline distribution
                </h3>
                <BarChart groups={SAMPLE.barGroups} />
              </div>
            </section>

            <section className="bg-white rounded-lg p-5 shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-gray-700 font-semibold text-sm">
                  Latest issues
                </h2>
                <span className="text-gray-500 text-xs">
                  {SAMPLE.issues.length} open
                </span>
              </div>
              <IssuesTable items={SAMPLE.issues} />
            </section>
          </div>

          {/* Right Content */}
          <aside className="flex flex-col gap-6">
            <section className="bg-white rounded-lg p-5 shadow flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-gray-700 font-semibold text-sm">
                  Quick inspector
                </h2>
                <span className="text-gray-500 text-xs">fast checks</span>
              </div>

              <div className="flex gap-4 items-center flex-wrap">
                <div className="flex-1 space-y-2 text-gray-600 text-xs">
                  {[
                    { label: "customers", value: "92%" },
                    { label: "transactions", value: "85%" },
                    { label: "events", value: "78%" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span>{label}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="w-[110px] h-[110px]">
                  <Donut value={82} size={110} stroke={12} />
                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-600">
                <div>
                  <div>Alerts</div>
                  <div className="font-semibold mt-1">4 critical</div>
                </div>
                <div>
                  <div>Avg cycle time</div>
                  <div className="font-semibold mt-1">1.6h</div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg p-5 shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-gray-700 font-semibold text-sm">
                  Notes & Actions
                </h2>
                <span className="text-gray-500 text-xs">team TODOs</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                <li>Investigate top anomaly in transactions</li>
                <li>Improve timezone handling in ingest</li>
                <li>Schedule completeness checks for archived datasets</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
