import React from "react";

const EmailTablePanel = ({ data }) => (
  <div className="bg-white rounded-lg shadow p-6 mt-6 w-full overflow-auto">
    <h2 className="text-xl font-semibold mb-4">Email Task Details</h2>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 text-left">
        <tr>
          <th className="px-4 py-2 text-sm font-medium text-gray-700">
            Task ID
          </th>
          <th className="px-4 py-2 text-sm font-medium text-gray-700">SDS</th>
          <th className="px-4 py-2 text-sm font-medium text-gray-700">
            Status
          </th>
          <th className="px-4 py-2 text-sm font-medium text-gray-700">
            Created At
          </th>
          <th className="px-4 py-2 text-sm font-medium text-gray-700">Error</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {data.map(({ taskId, specialist, status, createdAt, isError }) => (
          <tr key={taskId} className="hover:bg-gray-50">
            <td className="px-4 py-2">{taskId}</td>
            <td className="px-4 py-2">{specialist}</td>
            <td className="px-4 py-2">{status}</td>
            <td className="px-4 py-2 whitespace-nowrap">{createdAt}</td>
            <td className="px-4 py-2 text-center">
              {isError ? (
                <span className="text-red-600 font-bold">Yes</span>
              ) : (
                <span className="text-green-600 font-semibold">No</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmailTablePanel;
