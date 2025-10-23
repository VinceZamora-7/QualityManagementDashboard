import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginButton from "./login";

const serviceLines = [
  { name: "Overview", icon: "📊", link: "/overview", isPrimary: true },
  { name: "Events", icon: "🗓️", link: "/events", isPrimary: true },
  { name: "Email", icon: "✉️", link: "/email" },
  { name: "BAP", icon: "📄", link: "/bap" },
  { name: "Data", icon: "💾", link: "/data" },
  { name: "Social Triage", icon: "💬", link: "/social" },
  { name: "SDP", icon: "📝", link: "/sdp" },
  { name: "BAP - SDP", icon: "🔗", link: "/bap-sdp" },
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

  const isActive = (link) =>
    location.pathname === link || location.pathname.startsWith(link + "/");

  return (
    <header className="z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="max-w-full mx-auto px-6 flex flex-col sm:flex-row justify-between items-center h-24 sm:h-20 space-y-2 sm:space-y-0">
        {/* Branding */}
        <div className="flex flex-col leading-snug text-center sm:text-left">
          <Link
            to="/dashboard"
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 hover:text-indigo-600 transition-colors"
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

          <div>
            <LoginButton />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-gray-200 bg-white/90 backdrop-blur-sm sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-3 sm:space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100 py-3 justify-start sm:justify-evenly">
            {serviceLines.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`flex flex-col items-center justify-center flex-shrink-0
                  w-20 sm:w-24 h-20 sm:h-24 p-2 text-center text-sm font-medium rounded-xl transition-all duration-200 shadow-md cursor-pointer
                  ${
                    isActive(item.link)
                      ? "bg-blue-600 text-white hover:bg-blue-700 border-b-4 border-blue-400 font-semibold"
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
