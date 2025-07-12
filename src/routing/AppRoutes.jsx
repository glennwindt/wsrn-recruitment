// src/routing/AppRoutes.jsx

import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Public pages
import LoginPage        from "../pages/LoginPage";
import RegisterPage     from "../pages/RegisterPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import PrivacyPolicy    from "../pages/PrivacyPolicy";
import About            from "../pages/About";

// Protected components
import AdminDashboard            from "../components/admin-dashboard/AdminDashboard";
import AgencyDashboard           from "../components/agency-dashboard/AgencyDashboard";
import ShippingCompanyDashboard  from "../components/shipping-company-dashboard/ShippingCompanyDashboard";
import SeafarerApplicationForm   from "../components/seafarer-application-form/SeafarerApplicationForm";
import VoluntarySocialSecurity   from "../components/seafarer-dashboard/VoluntarySocialSecurity";

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

        {/* Public */}
        <Route path="/login"        element={<LoginPage />} />
        <Route path="/register"     element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/privacy"      element={<PrivacyPolicy />} />
        <Route path="/about"        element={<About />} />

        {/* Protected */}
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

        {/* Catch-all */}
        <Route path="/"  element={<Navigate to="/login" replace />} />
        <Route path="*"  element={<Navigate to="/unauthorized" replace />} />

      </Routes>
    </Suspense>
  );
}
