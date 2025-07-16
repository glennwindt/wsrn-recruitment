import React from "react";
import { useNavigate } from "react-router-dom";

export default function SelectInstitutionType() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "5rem auto", textAlign: "center" }}>
      <h2 style={{ marginBottom: "2rem" }}>Choose Your Institution Type</h2>

      <button
        onClick={() => navigate("/dashboard/training-center")}
        style={{
          width: "100%",
          padding: "1rem",
          marginBottom: "1rem",
          backgroundColor: "#1c75bc",
          color: "#fff",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        🔹 Training Center
      </button>

      <button
        onClick={() => navigate("/dashboard/maritime-school")}
        style={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "#0f5132",
          color: "#fff",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        🔹 Maritime School
      </button>
    </div>
  );
}

