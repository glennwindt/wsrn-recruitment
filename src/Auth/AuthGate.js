import React from "react";

const AuthGate = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <div>Access denied. Please log in.</div>;
  }

  return children;
};

export default AuthGate;

