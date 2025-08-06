import React, { useEffect } from "react";
import trainingBg from "../assets/training-bg.jpg"; // ✅ Correct path
import "../styles/TrainingLogin.css";

function TrainingLogin() {
  useEffect(() => {
    document.body.classList.add("training-login-body");

    return () => {
      document.body.classList.remove("training-login-body");
    };
  }, []);

  return (
    <div
      className="training-login-page"
      style={{
        backgroundImage: `url(${trainingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "#ffffff",
      }}
    >
      <h2>Training Center Login</h2>
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

export default TrainingLogin;

