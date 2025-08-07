import React, { useEffect } from "react";
import seafarerBg from "../assets/seafarer-bg.jpg";
import "../styles/SeafarerLogin.css";

function SeafarerLogin() {
  useEffect(() => {
    document.body.classList.add("seafarer-login-body");

    return () => {
      document.body.classList.remove("seafarer-login-body");
    };
  }, []);

  return (
    <div
      className="login-background-wrapper"
      style={{
        backgroundImage: `url(${seafarerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="background-overlay" />
      <div className="login-form-wrapper">
        <h2>Seafarer Login</h2>
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

export default SeafarerLogin;

