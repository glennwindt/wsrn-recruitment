import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.js";
import ChatAgentWidget from "./components/ChatAgentWidget.js";
import ProtectedRoute from "./routing/ProtectedRoute.js";

import LandingPage from "./pages/LandingPage.js";
import About from "./pages/About.js";
import LoginPage from "./pages/LoginPage.js";
import DashboardLogin from "./pages/DashboardLogin.js";
import UnauthorizedPage from "./pages/UnauthorizedPage.js";

import SeafarerRegister from "./pages/register/SeafarerRegister.js";
import AgencyRegister from "./pages/register/AgencyRegister.js";
import ShippingRegister from "./pages/register/ShippingRegister.js";
import TrainingRegister from "./pages/register/TrainingRegister.js";

import AdminDashboard from "./pages/AdminDashboard.js";
import AgencyDashboard from "./components/agency-dashboard/AgencyDashboard.js";
import SeafarerDashboard from "./components/seafarer-dashboard/SeafarerDashboard.js";
import ShippingCompanyDashboard from "./components/shipping-company-dashboard/ShippingCompanyDashboard.js";
import TrainingCenterDashboard from "./pages/TrainingCenterDashboard.js";

import "./App.css";

export default function App() {
  return (
    <Router>
      <>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard-login" element={<DashboardLogin />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            <Route path="/register/seafarer" element={<SeafarerRegister />} />
            <Route path="/register/agency" element={<AgencyRegister />} />
            <Route path="/register/shipping" element={<ShippingRegister />} />
            <Route path="/register/training" element={<TrainingRegister />} />

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
        </Layout>
        <ChatAgentWidget />
      </>
    </Router>
  );
}

