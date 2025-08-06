// src/components/FloatingLogo.jsx

import React from "react";
import logo from "../assets/wsrn-logo.png";
import "./FloatingLogo.css";

function FloatingLogo() {
  // Defensive check: don't render if logo is missing
  if (!logo) return null;

  return (
    <div className="floating-logo">
      <img src={logo} alt="WSRN Logo" />
    </div>
  );
}

export default FloatingLogo;

