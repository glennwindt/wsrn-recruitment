import React from "react";
import FloatingLogo from "../pages/FloatingLogo"; // Confirm actual location
import Navbar from "./Navbar";
import Footer from "./Footer";

// Global styles for layout and dashboard
import "../styles/dashboard.css";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      {/* Floating WSRN Coin Logo */}
      <FloatingLogo />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="main-content">
        {children}
      </main>

      {/* Branded Footer */}
      <Footer />
    </div>
  );
}

                 