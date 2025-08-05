import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/wsrn-logo.png";

export default function Home() {
  return (
    <div className="homepage-container">

      {/* Header Pane */}
      <header className="homepage-header">
        <img src={logo} alt="WSRN Logo" className="logo" />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Log In</Link>
        </nav>
      </header>

      {/* Hero Pane */}
      <section className="homepage-hero">
        <div className="overlay">
          <h1>WSRN: Connecting the Maritime World</h1>
          <p>Global recruitment for seafarers, shipping firms, and training centers.</p>
          <Link to="/register" className="get-started-btn">Get Started</Link>
        </div>
      </section>

      {/* Footer Pane */}
      <footer className="homepage-footer">
        <p>&copy; 2025 WSRN. All rights reserved. | Powered by oceans of opportunity</p>
      </footer>

    </div>
  );
}

