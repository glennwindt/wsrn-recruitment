import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import LegalProcessingForm from "./pages/LegalProcessingForm";
import SeafarerProfile from "./pages/SeafarerProfile";
import MobileApp from "./pages/MobileApp";
import StudentReferralSystem from "./pages/StudentReferralSystem";
import TrainingCenterDashboard from "./pages/TrainingCenterDashboard";
import DigitalSignatureTool from "./components/DigitalSignatureTool";
import CTTTrackingWidget from "./components/CTTTrackingWidget";
import AIDocumentValidationAlerts from "./components/AIDocumentValidationAlerts";

// Components
import ProtectedRoute from "./routing/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes – Admin Only */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Legal Processing Page */}
        <Route
          path="/legal"
          element={
            <ProtectedRoute allowedRoles={["admin", "agency", "shipping_company"]}>
              <LegalProcessingForm />
            </ProtectedRoute>
          }
        />

        {/* Seafarer Profile – Protected */}
        <Route
          path="/seafarer/:id"
          element={
            <ProtectedRoute allowedRoles={["admin", "agency", "shipping_company"]}>
              <SeafarerProfile />
            </ProtectedRoute>
          }
        />

        {/* Mobile App Access */}
        <Route
          path="/mobile/applicant"
          element={
            <ProtectedRoute allowedRoles={["seafarer", "admin"]}>
              <MobileApp />
            </ProtectedRoute>
          }
        />

        {/* Certificate Renewal Alerts */}
        <Route
          path="/certificates/renewal"
          element={
            <ProtectedRoute allowedRoles={["admin", "seafarer"]}>
              <AIDocumentValidationAlerts />
            </ProtectedRoute>
          }
        />

        {/* Digital Signature Tool */}
        <Route
          path="/contracts/sign"
          element={
            <ProtectedRoute allowedRoles={["seafarer", "agency", "shipping_company"]}>
              <DigitalSignatureTool />
            </ProtectedRoute>
          }
        />

        {/* CTT Tracking Widget */}
        <Route
          path="/tracking/ctt"
          element={
            <ProtectedRoute allowedRoles={["admin", "agency", "shipping_company"]}>
              <CTTTrackingWidget />
            </ProtectedRoute>
          }
        />

        {/* Fallback for Unauthorized Access */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}