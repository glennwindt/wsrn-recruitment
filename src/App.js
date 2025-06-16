// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './services/firebase';
import AdminDashboard from './components/AdminDashboard';
import AgencyDashboard from './components/AgencyDashboard';
import ShippingCompanyDashboard from './components/ShippingCompanyDashboard';
import SeafarerApplicationForm from './components/SeafarerApplicationForm';
import LoginPage from './pages/LoginPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  function getUserRole(email) {
    if (!email) return "guest";
    if (email.endsWith("@wsrn.com")) return "admin";
    if (email.includes(".agency")) return "agency";
    if (email.includes(".shipping")) return "shipping_company";
    if (email.includes(".seafarer")) return "seafarer";
    return "guest";
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading WSRN dashboard...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard">
          <Route element={user && user.role === 'admin' ? null : <LoginPage />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>

        <Route path="/apply">
          <Route element={user && user.role === 'seafarer' ? null : <LoginPage />}>
            <Route path="/apply" element={<SeafarerApplicationForm />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;