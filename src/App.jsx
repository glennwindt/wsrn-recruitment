// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Pages
import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import DashboardLogin from "./pages/DashboardLogin";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminDashboard from "./pages/AdminDashboard";
import TrainingCenterDashboard from "./pages/TrainingCenterDashboard";
import LandingPage from "./pages/LandingPage";

// 🛡 Dashboards from Components
import AgencyDashboard from "./components/agency-dashboard/AgencyDashboard";
import SeafarerDashboard from "./components/seafarer-dashboard/SeafarerDashboard";
import ShippingCompanyDashboard from "./components/shipping-company-dashboard/ShippingCompanyDashboard";

// 📝 Register Pages
import SeafarerRegister from "./pages/register/SeafarerRegister";
import AgencyRegister from "./pages/register/AgencyRegister";
import ShippingRegister from "./pages/register/ShippingRegister";
import TrainingRegister from "./pages/register/TrainingRegister";

// 🔒 Protected Route Wrapper
import ProtectedRoute from "./routing/ProtectedRoute";

// 🌐 Global UI
import Navbar from "./components/Navbar";
import ChatAgentWidget from "./components/ChatAgentWidget";

// 🧭 Global Styles
import "./App.css";

function App() {
  return (
    <div id="root">
      <Router>
        <Navbar />

        <main>
          <Routes>
            {/* 🆕 ✅ Landing Page Route */}
            <Route path="/landing" element={<LandingPage />} />

            {/* 🌊 Public Navigation */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard-login" element={<DashboardLogin />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* 📝 Registration Routes */}
            <Route path="/register/seafarer" element={<SeafarerRegister />} />
            <Route path="/register/agency" element={<AgencyRegister />} />
            <Route path="/register/shipping" element={<ShippingRegister />} />
            <Route path="/register/training" element={<TrainingRegister />} />

            {/* ⚓ Dashboards Protected by Role */}
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={["admin", "staff", "bookkeeper"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/agency"
              element={
                <ProtectedRoute allowedRoles={["agency"]}>
                  <AgencyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/seafarer"
              element={
                <ProtectedRoute allowedRoles={["seafarer"]}>
                  <SeafarerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/shipping"
              element={
                <ProtectedRoute allowedRoles={["shipping"]}>
                  <ShippingCompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/training"
              element={
                <ProtectedRoute allowedRoles={["training"]}>
                  <TrainingCenterDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

       <footer>
  © 2025 WSRN. All rights reserved. | Powered by oceans of opportunity
</footer>

        <ChatAgentWidget />
      </Router>
    </div>
  );
}

export default App;

