import React, { useMemo, useState } from "react";

/**
 * Social Triage Dashboard (socialtriage.jsx)
 * - Focuses on Error Rate and PR Rejections
 * - Self-contained, no external libs
 *
 * Drop this file into: src/pages/social/socialtriage.jsx
 */

/* Mock dataset (replace with real data/fetch) */
const MOCK = {
  repos: ["web-client", "api", "mobile", "ingest"],
  events: generateMockEvents(),
  prs: generateMockPRs(),
};

function generateMockEvents() {
  // generate 60 days of events per repo
  const days = 60;
  const now = new Date();
  const arr = [];
  for (let d = 0; d < days; d++) {
    const date = new Date(now);
    date.setDate(now.getDate() - d);
    for (const repo of ["web-client", "api", "mobile", "ingest"]) {
      // random totals and errors with repo-specific bias
      const base = repo === "api" ? 1200 : repo === "web-client" ? 900 : 600;
      const total = Math.round(base * (0.8 + Math.random() * 0.6));
      const errorRate =
        repo === "api"
          ? 0.03 + Math.random() * 0.04
          : 0.01 + Math.random() * 0.03;
      const errors = Math.round(
        total * errorRate * (1 + Math.sin(d / 7) * 0.3)
      );
      arr.push({ date: date.toISOString().slice(0, 10), repo, total, errors });
    }
  }
  return arr;
}

function generateMockPRs() {
  // 120 PRs across repos, random statuses with reasons
  const reasons = [
    "Fails CI",
    "Lint errors",
    "Doesn't meet acceptance",
    "Merge conflicts",
    "Missing tests",
    "Performance regression",
  ];
  const prs = [];
  const now = new Date();
  for (let i = 0; i < 120; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - Math.round(Math.random() * 59));
    const repo = ["web-client", "api", "mobile", "ingest"][
      Math.floor(Math.random() * 4)
    ];
    const rejected = Math.random() < (repo === "api" ? 0.25 : 0.18);
    prs.push({
      id: 1000 + i,
      title: `PR ${i + 1} - ${repo}`,
      repo,
      author: ["alice", "bob", "carol", "dave"][Math.floor(Math.random() * 4)],
      date: date.toISOString().slice(0, 10),
      status: rejected ? "rejected" : "merged",
      reason: rejected
        ? reasons[Math.floor(Math.random() * reasons.length)]
        : "",
      url: "#",
    });
  }
  return prs;
}

/* Small helper utilities */
const formatPct = (n) => `${(n * 100).toFixed(1)}%`;
const sum = (arr, fn = (x) => x) => arr.reduce((a, b) => a + fn(b), 0);

/* Sparkline SVG component */
function Sparkline({
  points = [],
  width = 240,
  height = 48,
  stroke = "#1976d2",
}) {
  if (!points.length) return <svg width={width} height={height} />;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1e-6, max - min);
  const step = width / Math.max(1, points.length - 1);
  const coords = points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        points={coords}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* small area fill */}
      <polyline
        fill={`${stroke}22`}
        stroke="none"
        points={`${coords} ${width},${height} 0,${height}`}
      />
    </svg>
  );
}

/* Main component */
export default function SocialTriageDashboard() {
  const [repoFilter, setRepoFilter] = useState("all");
  const [daysRange, setDaysRange] = useState(14);
  const [search, setSearch] = useState("");

  // Filtered events and PRs
  const filteredEvents = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - (daysRange - 1));
    return MOCK.events.filter((e) => {
      if (repoFilter !== "all" && e.repo !== repoFilter) return false;
      return new Date(e.date) >= cutoff;
    });
  }, [repoFilter, daysRange]);

  const filteredPRs = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - (daysRange - 1));
    return MOCK.prs
      .filter((p) => (repoFilter === "all" ? true : p.repo === repoFilter))
      .filter((p) => new Date(p.date) >= cutoff)
      .filter((p) =>
        search
          ? (p.title + p.author + p.reason)
              .toLowerCase()
              .includes(search.toLowerCase())
          : true
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [repoFilter, daysRange, search]);

  // Summary metrics
  const totalErrors = sum(filteredEvents, (e) => e.errors);
  const totalRequests = sum(filteredEvents, (e) => e.total);
  const errorRate = totalRequests ? totalErrors / totalRequests : 0;

  const totalPRs = filteredPRs.length;
  const rejectedPRs = filteredPRs.filter((p) => p.status === "rejected").length;
  const prRejectionRate = totalPRs ? rejectedPRs / totalPRs : 0;

  // Trend: daily error rates
  const trend = useMemo(() => {
    // get unique dates sorted ascending
    const map = new Map();
    for (const e of filteredEvents) {
      if (!map.has(e.date)) map.set(e.date, { errors: 0, total: 0 });
      const cur = map.get(e.date);
      cur.errors += e.errors;
      cur.total += e.total;
      map.set(e.date, cur);
    }
    const dates = Array.from(map.keys()).sort();
    const points = dates.map((d) => {
      const v = map.get(d);
      return v.total ? v.errors / v.total : 0;
    });
    return points;
  }, [filteredEvents]);

  // PR rejections by repo (for small bar chart)
  const prRejectionsByRepo = useMemo(() => {
    const counts = {};
    for (const r of MOCK.repos) counts[r] = { rejected: 0, total: 0 };
    for (const p of filteredPRs) {
      counts[p.repo].total += 1;
      if (p.status === "rejected") counts[p.repo].rejected += 1;
    }
    return Object.entries(counts).map(([repo, { rejected, total }]) => ({
      repo,
      rejected,
      rate: total ? rejected / total : 0,
      total,
    }));
  }, [filteredPRs]);

  // Top rejection reasons
  const topReasons = useMemo(() => {
    const m = new Map();
    for (const p of filteredPRs) {
      if (p.status === "rejected") {
        m.set(p.reason, (m.get(p.reason) || 0) + 1);
      }
    }
    return Array.from(m.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [filteredPRs]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Social Triage — Error Rate & PR Rejections</h2>

      <div style={styles.controls}>
        <label>
          Repo:
          <select
            value={repoFilter}
            onChange={(e) => setRepoFilter(e.target.value)}
            style={styles.select}
          >
            <option value="all">All</option>
            {MOCK.repos.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <div style={styles.rangeButtons}>
          {[7, 14, 30, 60].map((d) => (
            <button
              key={d}
              onClick={() => setDaysRange(d)}
              style={daysRange === d ? styles.activeBtn : styles.btn}
            >
              {d}d
            </button>
          ))}
        </div>

        <input
          placeholder="Search PR title/author/reason"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      <div style={styles.metricRow}>
        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={styles.metricTitle}>Error Rate</div>
            <div style={styles.metricValue}>{formatPct(errorRate)}</div>
          </div>
          <div style={styles.metricBody}>
            <Sparkline
              points={trend}
              width={280}
              height={48}
              stroke={errorRate > 0.03 ? "#d32f2f" : "#1976d2"}
            />
            <div style={styles.metricSub}>
              {totalErrors} errors / {totalRequests} requests
            </div>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={styles.metricTitle}>PR Rejection Rate</div>
            <div style={styles.metricValue}>{formatPct(prRejectionRate)}</div>
          </div>
          <div style={styles.metricBody}>
            <div style={{ display: "flex", gap: 8 }}>
              {prRejectionsByRepo.map((r) => (
                <div key={r.repo} style={{ textAlign: "center", minWidth: 70 }}>
                  <div style={{ fontSize: 12, color: "#666" }}>{r.repo}</div>
                  <div
                    style={{
                      height: 10,
                      background: "#eee",
                      borderRadius: 6,
                      overflow: "hidden",
                      marginTop: 6,
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.round(r.rate * 100)}%`,
                        background: r.rate > 0.25 ? "#d32f2f" : "#1976d2",
                        height: "100%",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 11, marginTop: 6 }}>
                    {formatPct(r.rate)}
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.metricSub}>
              {rejectedPRs} rejected / {totalPRs} PRs
            </div>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={styles.metricTitle}>Top Rejection Reasons</div>
            <div style={styles.metricValue}>{rejectedPRs}</div>
          </div>
          <div style={styles.metricBody}>
            <ul style={{ paddingLeft: 16, margin: 0 }}>
              {topReasons.length ? (
                topReasons.map(([reason, count]) => (
                  <li key={reason} style={{ marginBottom: 6 }}>
                    {reason}{" "}
                    <span style={{ color: "#666", fontSize: 12 }}>
                      ({count})
                    </span>
                  </li>
                ))
              ) : (
                <li style={{ color: "#666" }}>No recent rejections</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Recent Rejected PRs</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>PR</th>
              <th style={styles.th}>Repo</th>
              <th style={styles.th}>Author</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Reason</th>
            </tr>
          </thead>
          <tbody>
            {filteredPRs.filter((p) => p.status === "rejected").length ? (
              filteredPRs
                .filter((p) => p.status === "rejected")
                .slice(0, 30)
                .map((p) => (
                  <tr key={p.id}>
                    <td style={styles.td}>
                      <a href={p.url} style={styles.link}>
                        #{p.id} — {p.title}
                      </a>
                    </td>
                    <td style={styles.td}>{p.repo}</td>
                    <td style={styles.td}>{p.author}</td>
                    <td style={styles.td}>{p.date}</td>
                    <td style={styles.td}>{p.reason}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="5">
                  No rejected PRs in range
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 18, color: "#666", fontSize: 12 }}>
        Tip: Use the repo and time-range filters to focus investigation. Replace
        mock data with real telemetry and PR API.
      </div>
    </div>
  );
}

/* Inline styles */
const styles = {
  container: {
    padding: 20,
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial',
    color: "#222",
  },
  title: { margin: "0 0 12px 0" },
  controls: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  select: { marginLeft: 8, padding: "6px 8px" },
  rangeButtons: { display: "flex", gap: 6 },
  btn: {
    padding: "6px 10px",
    borderRadius: 4,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },
  activeBtn: {
    padding: "6px 10px",
    borderRadius: 4,
    border: "1px solid #1976d2",
    background: "#e8f0ff",
    cursor: "pointer",
  },
  search: { marginLeft: "auto", padding: "6px 10px", minWidth: 240 },

  metricRow: {
    display: "flex",
    gap: 12,
    marginBottom: 16,
    alignItems: "stretch",
  },
  metricCard: {
    flex: 1,
    border: "1px solid #eee",
    borderRadius: 8,
    padding: 12,
    background: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
  },
  metricHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  metricTitle: { color: "#666", fontSize: 13 },
  metricValue: { fontSize: 22, fontWeight: 600 },
  metricBody: { marginTop: 8 },
  metricSub: { color: "#666", fontSize: 12, marginTop: 8 },

  section: { marginTop: 8 },
  sectionTitle: { margin: "8px 0" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 6,
    overflow: "hidden",
  },
  th: {
    textAlign: "left",
    padding: "10px 12px",
    borderBottom: "1px solid #f3f3f3",
    background: "#fafafa",
    fontSize: 13,
    color: "#444",
  },
  td: { padding: "10px 12px", borderBottom: "1px solid #f8f8f8", fontSize: 13 },
  link: { color: "#1976d2", textDecoration: "none" },
};
