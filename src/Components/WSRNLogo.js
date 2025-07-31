import React from "react";
import logo from "../assets/wsrn-logo.png";

export default function WSRNLogo() {
  return (
    <img
      src={logo}
      alt="WSRN Logo"
      className="wsrn-logo"
      draggable={false}
    />
  );
}
