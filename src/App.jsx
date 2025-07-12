import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import { AuthProvider } from "./context/AuthContext";
import { FinanceProvider } from "./context/FinanceContext";
import ProtectedRoute from "./routing/ProtectedRoute";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

// Registration Pages
import SeafarerRegister from "./pages/register/SeafarerRegister";
import AgencyRegister from "./pages/register/AgencyRegister";
import ShippingRegister from "./pages/register/ShippingRegister";
import TrainingRegister from "./pages/register/TrainingRegister";

// Dashboards
import SeafarerDashboard from "./components/seafarer-dashboard/SeafarerDashboard";
import VoluntarySocialSecurity from "./components/seafarer-dashboard/VoluntarySocialSecurity";
import AgencyDashboard from "./components/agency-dashboard/AgencyDashboard";
import ShippingCompanyDashboard from "./components/shipping-company-dashboard/ShippingCompanyDashboard";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import TrainingCenterDashboard from "./pages/TrainingCenterDashboard";
import TrainingCenterIntegration from "./components/TrainingCenterIntegration";

import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <FinanceProvider>
          <Router>
            <Helmet>
              <title>WSRN | Worldwide Seafarers Recruitment Network</title>
              <meta
                name="description"
                content="WSRN connects global maritime professionals, agencies, shipping companies, and training centers under Portuguese law."
              />
            </Helmet>

            <Navbar />

            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              {/* Registration Routes */}
              <Route path="/register/seafarers" element={<SeafarerRegister />} />
              <Route path="/register/agencies" element={<AgencyRegister />} />
              <Route path="/register/shipping" element={<ShippingRegister />} />
              <Route path="/register/training" element={<TrainingRegister />} />

              {/* Protected Dashboards */}
              <Route
                path="/dashboard/seafarer"
                element={
                  <ProtectedRoute allowedRoles={["seafarer"]}>
                    <SeafarerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/seafarer/social-security"
                element={
                  <ProtectedRoute allowedRoles={["seafarer"]}>
                    <VoluntarySocialSecurity />
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
                path="/dashboard/shipping"
                element={
                  <ProtectedRoute allowedRoles={["shipping"]}>
                    <ShippingCompanyDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/training"
                element={
                  <ProtectedRoute allowedRoles={["training_center", "admin"]}>
                    <TrainingCenterDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/training-integration"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <TrainingCenterIntegration />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </FinanceProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

