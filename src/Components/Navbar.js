import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // ✅ Correct import — matches the actual CSS file for Navbar

export default function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">WSRN</Link>
      </div>

      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard-login">Login</Link>

        {/* 🔽 Register Dropdown */}
        <div className="navbar-dropdown">
          <button className="dropdown-toggle">Register ▾</button>
          <div className="dropdown-menu">
            <Link to="/register/seafarer">Seafarer</Link>
            <Link to="/register/agency">Agency</Link>
            <Link to="/register/shipping">Shipping Company</Link>
            <Link to="/register/training">Training Center</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

