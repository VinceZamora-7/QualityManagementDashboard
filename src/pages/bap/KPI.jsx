import React from "react";

export default function KPI({ title, value, sub }) {
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
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{value}</div>
      {sub && (
        <div style={{ fontSize: 12, color: "#999", marginTop: 6 }}>{sub}</div>
      )}
    </div>
  );
}
