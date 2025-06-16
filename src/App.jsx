// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import AgencyDashboard from './components/AgencyDashboard';
import ShippingCompanyDashboard from './components/ShippingCompanyDashboard';
import SeafarerApplicationForm from './components/SeafarerApplicationForm';

// Firebase Auth
import { auth } from './services/firebase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine user role based on email
  function getUserRole(email) {
    if (!email) return "guest";
    if (email.endsWith("@wsrn.com")) return "admin";
    if (email.includes(".agency")) return "agency";
    if (email.includes(".shipping")) return "shipping_company";
    if (email.includes(".seafarer")) return "seafarer";
    return "guest";
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const role = getUserRole(currentUser.email);
        setUser({ ...currentUser, role });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading WSRN dashboard...</p>
      </div>
    );
  }

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
      return (
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-red-500">Unauthorized access</h2>
        </div>
      );
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin', 'agency', 'shipping_company', 'seafarer']}>
              {user?.role === 'admin' && <AdminDashboard />}
              {user?.role === 'agency' && <AgencyDashboard />}
              {user?.role === 'shipping_company' && <ShippingCompanyDashboard />}
              {user?.role === 'seafarer' && <SeafarerApplicationForm />}
            </ProtectedRoute>
          }
        />

        {/* Dynamic Dashboard Redirect */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agency"
          element={
            <ProtectedRoute allowedRoles={['agency']}>
              <AgencyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute allowedRoles={['shipping_company']}>
              <ShippingCompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply"
          element={
            <ProtectedRoute allowedRoles={['seafarer']}>
              <SeafarerApplicationForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;