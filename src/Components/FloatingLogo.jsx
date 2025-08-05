// src/components/FloatingLogo.jsx

import React from "react";
import logo from "../assets/wsrn-logo.png"; // Adjust path if needed
import "./FloatingLogo.css"; // External CSS for styling

function FloatingLogo() {
  return (
    <div className="floating-logo">
      <img src={logo} alt="WSRN Logo" />
    </div>
  );
}

export default FloatingLogo;

