import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import EventsDashboard from "./pages/events/events";
import Overview from "./pages/overview/overview";
import EmailDashboard from "./pages/email/email"; // Your email dashboard component
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow w-full">
          <Routes>
            {/* Redirect root "/" to "/overview" */}
            <Route path="/" element={<Navigate to="/overview" replace />} />

            {/* Overview Route */}
            <Route path="/overview" element={<Overview />} />

            {/* Main Dashboard Routes */}
            <Route path="/*" element={<EventsDashboard />} />

            {/* Email Service Line Route */}
            <Route path="/email" element={<EmailDashboard />} />

            {/* 404 Catch-all */}
            <Route
              path="*"
              element={
                <div className="p-10 text-center mt-20">
                  <h1 className="text-6xl font-extrabold text-red-600">404</h1>
                  <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
