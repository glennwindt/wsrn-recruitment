import React from "react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1c1c1e",
      color: "#f5f5f7",
      flexDirection: "column",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚫 Access Denied</h1>
      <p>You do not have permission to access this page.</p>

      <button onClick={() => navigate("/")} style={{
        marginTop: "1.5rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#007aff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer"
      }}>
        Return Home
      </button>
    </div>
  );
}

