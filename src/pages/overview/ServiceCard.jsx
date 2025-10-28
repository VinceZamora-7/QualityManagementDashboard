import React from "react";

const ServiceCard = ({
  name,
  status,
  errorRate,
  metricLabel,
  metricValue,
  extra,
  color,
}) => (
  <div
    className="bg-white rounded shadow p-4 border-l-4 flex flex-col justify-between"
    style={{ borderColor: color }}
  >
    <div className="mb-4">
      <h3 className="font-semibold text-lg">{name}</h3>
      <span
        className="mt-2 inline-block px-2 py-1 rounded text-xs font-semibold"
        style={{ backgroundColor: color, color: "#fff" }}
      >
        {status}
      </span>
    </div>
    <div className="flex justify-between text-sm mb-4">
      <div className="text-gray-700 font-semibold">{errorRate} Error Rate</div>
      {/* <div className="text-gray-700 font-semibold">
        {metricValue} {metricLabel}
      </div> */}
      <div className="text-gray-400">{extra}</div>
    </div>
    <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
      View Details →
    </a>
  </div>
);

export default ServiceCard;
