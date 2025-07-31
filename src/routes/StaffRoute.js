// src/routes/StaffRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function StaffRoute({ children }) {
  const { user } = useAuth();

  const hasSystemAccess = user?.role === "tech" && user?.systemAccess;

  return hasSystemAccess ? children : <Navigate to="/unauthorized" />;
}

