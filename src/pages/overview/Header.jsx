import React from "react";

const Header = () => (
  <header className="flex justify-between items-center p-6 border-b">
    <div>
      <h1 className="text-2xl font-bold">Service Lines Overview</h1>
      <p className="text-gray-500">Enterprise Service Management Dashboard</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        <span className="text-sm text-gray-700">All Systems Operational</span>
      </div>
    </div>
  </header>
);

export default Header;
