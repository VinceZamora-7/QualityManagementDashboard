import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import EventsDashboard from "./pages/events/events";
import Overview from "./pages/overview/overview";
import EmailDashboard from "./pages/email/email";
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
            <Route path="/overview" element={<Overview />} />
            <Route path="/email" element={<EmailDashboard />} />
            <Route path="/*" element={<EventsDashboard />} />

            {/* Catch all unmatched routes and redirect to root "/" */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
