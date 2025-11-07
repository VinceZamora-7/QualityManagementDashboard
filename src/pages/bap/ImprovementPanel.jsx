import React from "react";

export default function ImprovementPanel() {
  return (
    <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
      <h4 style={{ marginTop: 0 }}>Improvement Actions</h4>
      <ul style={{ fontSize: 13, lineHeight: "1.6em", paddingLeft: 20 }}>
        <li>
          <strong>Code Review:</strong> Enhance peer review to catch early bugs.
        </li>
        <li>
          <strong>Testing:</strong> Introduce automated regression testing.
        </li>
        <li>
          <strong>Documentation:</strong> Provide clearer task definitions and
          acceptance criteria.
        </li>
        <li>
          <strong>Training:</strong> Conduct monthly quality workshops.
        </li>
        <li>
          <strong>Process:</strong> Implement root-cause analysis for each major
          issue.
        </li>
      </ul>
    </div>
  );
}
