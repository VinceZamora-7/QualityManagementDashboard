import React from "react";

const QuickActionButton = ({ text, icon }) => (
  <button className="bg-white shadow rounded px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100">
    {icon}
    {text}
  </button>
);

export default QuickActionButton;
