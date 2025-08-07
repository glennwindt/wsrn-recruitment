import React, { useEffect } from "react";
import agencyBg from "../assets/agency-bg.jpg";
import "../styles/AgencyLogin.css";

function AgencyLogin() {
  useEffect(() => {
    document.body.classList.add("agency-login-body");

    return () => {
      document.body.classList.remove("agency-login-body");
    };
  }, []);

  return (
    <div
      className="agency-login-page"
      style={{
        backgroundImage: `url(${agencyBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="login-form-wrapper">
        <h2>Agency Login</h2>
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Enter email" />
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AgencyLogin;

