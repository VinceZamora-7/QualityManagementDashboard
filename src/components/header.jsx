import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const serviceLines = [
  {
    name: "Overview",
    icon: "📊",
    link: "/dashboard/overview",
    isPrimary: true,
  },
  { name: "Events", icon: "🗓️", link: "/dashboard/events", isPrimary: true },
  { name: "Email", icon: "✉️", link: "/dashboard/email" },
  { name: "BAP", icon: "📄", link: "/dashboard/bap" },
  { name: "Data", icon: "💾", link: "/dashboard/data" },
  { name: "Social Triage", icon: "💬", link: "/dashboard/social" },
  { name: "SDP", icon: "📝", link: "/dashboard/sdp" },
  { name: "BAP - SDP", icon: "🔗", link: "/dashboard/bap-sdp" },
];

const formatTime = () => {
  return new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

const Header = () => {
  const [currentTime, setCurrentTime] = useState(formatTime());
  const location = useLocation();

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(formatTime());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Helper to check if link is active (exact or prefix match)
  const isActive = (link) =>
    location.pathname === link || location.pathname.startsWith(link + "/");

  return (
    <header className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="max-w-full mx-auto px-6 flex justify-between items-center h-20">
        {/* Branding */}
        <div className="flex flex-col leading-snug">
          <Link
            to="/dashboard"
            className="text-3xl font-extrabold text-gray-900 hover:text-indigo-600 transition-colors"
          >
            Quality Management Dashboard
          </Link>
          <span className="text-sm text-gray-600 mt-1">
            Service line specific quality metrics and analytics
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="text-gray-500 font-medium whitespace-nowrap hidden sm:block">
            <span className="font-mono text-gray-700">{currentTime}</span>
          </div>

          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            LOGIN
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-3 space-x-3 sm:space-x-4 justify-evenly">
            {serviceLines.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`flex flex-col items-center justify-center flex-shrink-0
                  w-24 h-24 p-2 text-center text-sm font-medium rounded-xl transition-all duration-200 shadow-lg cursor-pointer
                  ${
                    isActive(item.link)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200"
                  }
                `}
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
