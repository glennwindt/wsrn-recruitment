import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">WSRN</Link>
      </div>

      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard-login">Login</Link>

        <div className="navbar-dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            Register ▾
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/register/seafarer">Seafarer</Link>
              <Link to="/register/agency">Agency</Link>
              <Link to="/register/shipping">Shipping Company</Link>
              <Link to="/register/training">Training Center</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

