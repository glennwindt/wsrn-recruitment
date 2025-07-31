// src/pages/DashboardLogin.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

export default function DashboardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const role = userData.role;

        setRole(role);

        switch (role) {
          case "admin":
          case "staff":
          case "bookkeeper":
            navigate("/dashboard/admin");
            break;
          case "agency":
            navigate("/dashboard/agency");
            break;
          case "seafarer":
            navigate("/dashboard/seafarer");
            break;
          case "shipping":
            navigate("/dashboard/shipping");
            break;
          case "training":
            navigate("/dashboard/training");
            break;
          default:
            navigate("/unauthorized");
            break;
        }
      } else {
        setError("User data not found.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="login-page">
      <div className="login-wrapper">
        <h1 className="login-title">WSRN Login</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </main>
  );
}

