import React from "react";
import "./Navbar.css";
import logo from "../assets/wsrn-logo.png"; // Add this image to src/assets/

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="WSRN Logo" className="logo" />
        <span className="brand-name">WSRN</span>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </nav>
  );
}
