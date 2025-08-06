import React from "react";
import "../styles/AgencyLogin.css";

function AgencyLogin() {
  return (
    <div className="agency-login-page">
      <h2>Agency Login</h2>
      <form className="login-form">
        <label>Email</label>
        <input type="email" placeholder="Enter email" />
        <label>Password</label>
        <input type="password" placeholder="Enter password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AgencyLogin;

