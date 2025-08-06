import React from "react";
import "../styles/SeafarerLogin.css";

function SeafarerLogin() {
  return (
    <div className="seafarer-login-page">
      <h2>Seafarer Login</h2>
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

export default SeafarerLogin;

