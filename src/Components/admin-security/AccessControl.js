import React from "react";

export default function AccessControl({ userRole, allowedRoles = [], children }) {
  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="bg-red-900/30 text-red-300 p-6 rounded text-center">
        ❌ Access Denied — You do not have permission to view this module.
      </div>
    );
  }

  return <>{children}</>;
}

