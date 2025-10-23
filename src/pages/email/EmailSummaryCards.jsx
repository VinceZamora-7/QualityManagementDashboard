import React from "react";

const WarningIcon = () => <span className="text-red-400 text-2xl">⚠️</span>;
const EmailIcon = () => <span className="text-blue-400 text-2xl">📧</span>;
const SuccessIcon = () => <span className="text-green-400 text-2xl">✅</span>;
const UserIcon = () => <span className="text-purple-600 text-2xl">👥</span>;

const SummaryCard = ({ icon, label, value, valueClass }) => (
  <div className="bg-white rounded-lg shadow p-5 flex items-center space-x-4 w-full max-w-sm">
    {icon}
    <div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className={`text-2xl font-bold ${valueClass}`}>{value}</div>
    </div>
  </div>
);

const EmailSummaryCards = ({
  overallErrorRate = "0%",
  totalEmailTasks = 0,
  successfulTasks = 0,
  activeSpecialists = 0,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
    <SummaryCard
      icon={<WarningIcon />}
      label="Overall Error Rate"
      value={overallErrorRate}
      valueClass="text-red-600"
    />
    <SummaryCard
      icon={<EmailIcon />}
      label="Total Email Tasks"
      value={totalEmailTasks.toLocaleString()}
      valueClass="text-black font-bold"
    />
    <SummaryCard
      icon={<SuccessIcon />}
      label="Successful Tasks"
      value={successfulTasks.toLocaleString()}
      valueClass="text-green-600"
    />
    <SummaryCard
      icon={<UserIcon />}
      label="Active SDS"
      value={activeSpecialists}
      valueClass="text-black font-bold"
    />
  </div>
);

export default EmailSummaryCards;
