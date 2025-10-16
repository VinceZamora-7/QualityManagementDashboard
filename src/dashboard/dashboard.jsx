import React from "react";
// Removed imports for fileSystemData and Folder to use only static content

const Dashboard = () => {
  // Removed useState hook as there is no data being managed

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Introduction */}
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        Code Organization Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-8 border-b pb-4">
        Use this interactive file manager to visualize and organize your project
        structure.
      </p>

      {/* --- START STATIC DASHBOARD CONTENT (Quick Stats) --- */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Project Quick Stats
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-indigo-500">
          <p className="2xl font-bold text-indigo-600">12</p>
          <p className="sm text-gray-500">Total Files</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
          <p className="2xl font-bold text-green-600">5</p>
          <p className="sm text-gray-500">Active Folders</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-yellow-500">
          <p className="2xl font-bold text-yellow-600">85%</p>
          <p className="sm text-gray-500">Code Coverage Estimate</p>
        </div>
      </div>
      {/* --- END STATIC DASHBOARD CONTENT --- */}

      {/* File Manager Card - Now contains simple static text */}
      <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600 flex items-center">
          <span className="mr-2">📁</span> Project File Structure (Static
          Content)
        </h2>
        <div className="p-2">
          <p className="text-lg text-gray-700 p-4 bg-gray-50 rounded-lg">
            Hello, Dashboard Content! The interactive file manager component has
            been temporarily removed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
