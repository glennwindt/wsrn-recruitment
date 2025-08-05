// src/routing/AppRoutes.jsx

import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Layout wrapper
import Layout from "../components/layout/Layout";

// Public pages
import LandingPage      from "../pages/LandingPage";
import LoginPage        from "../pages/LoginPage";
import RegisterPage     from "../pages/RegisterPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import PrivacyPolicy    from "../pages/PrivacyPolicy";
import About            from "../pages/About";

// Tracking components
import TaskDashboard     from "../components/TaskDashboard";
import TaskForm          from "../components/TaskForm";
import RegistrationGuide from "../components/RegistrationGuide";

// Protected dashboards
import AdminDashboard            from "../components/admin-dashboard/AdminDashboard";
import AgencyDashboard           from "../components/agency-dashboard/AgencyDashboard";
import ShippingCompanyDashboard  from "../components/shipping-company-dashboard/ShippingCompanyDashboard";
import SeafarerApplicationForm   from "../components/seafarer-application-form/SeafarerApplicationForm";
import VoluntarySocialSecurity   from "../components/seafarer-dashboard/VoluntarySocialSecurity";

// 🔐 Owner-level admin pages
import OwnerDashboard    from "../pages/OwnerDashboard";
import UpgradeCenter     from "../pages/UpgradeCenter";
import CopilotLab        from "../pages/CopilotLab";

// 🧮 NEW: Salary Calculator
import SalaryCalculator from "../components/SalaryCalculator";

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading…
        </div>
      }
    >
      <Routes>

        {/* 🌐 Public routes wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/"         element={<LandingPage />} />
          <Route path="/landing"  element={<LandingPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy"  element={<PrivacyPolicy />} />
          <Route path="/about"    element={<About />} />

          {/* 📋 Tracking routes */}
          <Route path="/tracking"  element={<TaskDashboard />} />
          <Route path="/form"      element={<TaskForm />} />
          <Route path="/guide"     element={<RegistrationGuide />} />

          {/* 🧮 NEW: Salary Calculator Route */}
          <Route path="/salarycalculator" element={<SalaryCalculator />} />
        </Route>

        {/* 🚫 Unauthorized page (no layout) */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* 🔐 Protected role-based routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agency"
          element={
            <ProtectedRoute allowedRoles={["agency"]}>
              <AgencyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute allowedRoles={["shipping"]}>
              <ShippingCompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply"
          element={
            <ProtectedRoute allowedRoles={["seafarer"]}>
              <SeafarerApplicationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seafarer-dashboard"
          element={
            <ProtectedRoute allowedRoles={["seafarer"]}>
              <VoluntarySocialSecurity />
            </ProtectedRoute>
          }
        />

        {/* 👑 Owner-only admin routes */}
        <Route
          path="/admin/owner"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/upgrade"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <UpgradeCenter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/copilot-lab"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <CopilotLab />
            </ProtectedRoute>
          }
        />

        {/* 🧭 Catch-all route */}
        <Route path="*" element={<Navigate to="/unauthorized" replace />} />

      </Routes>
    </Suspense>
  );
}

