import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = ["admin"] }) {
  const [user, loading] = useAuthState(auth);
  const navigate = Navigate();
  const userEmail = user?.email || "";

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }

    if (!loading && user) {
      const userRole = getUserRole(userEmail);

      if (!allowedRoles.includes(userRole)) {
        navigate("/unauthorized");
      }
    }
  }, [user, loading, allowedRoles, navigate]);

  const getUserRole = (email) => {
    if (!email) return "guest";

    if (email.endsWith("@wsrn.com")) return "admin";
    if (email.includes(".agency")) return "agency";
    if (email.includes(".shipping")) return "shipping_company";
    if (email.includes(".seafarer")) return "seafarer";

    return "guest";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  const userRole = getUserRole(userEmail);
  if (!allowedRoles.includes(userRole)) return null;

  return children;
}