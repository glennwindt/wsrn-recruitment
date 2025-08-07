import React, { useEffect } from "react";
import shippingBg from "../assets/shipping-bg.jpg";
import "../styles/ShippingLogin.css";

function ShippingLogin() {
  useEffect(() => {
    document.body.classList.add("shipping-login-body");

    return () => {
      document.body.classList.remove("shipping-login-body");
    };
  }, []);

  return (
    <div
      className="shipping-login-page"
      style={{
        backgroundImage: `url(${shippingBg})`,
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
        <h2>Shipping Company Login</h2>
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

export default ShippingLogin;

