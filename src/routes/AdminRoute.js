// src/routes/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  const isAdmin = user?.role === "owner" || user?.adminAccess;

  return isAdmin ? children : <Navigate to="/unauthorized" />;
}

