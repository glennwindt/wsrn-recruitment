import React from "react";
import "../styles/ShippingLogin.css";

function ShippingLogin() {
  return (
    <div className="shipping-login-page">
      <h2>Shipping Company Login</h2>
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

export default ShippingLogin;

