import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// 🛡 Auth Provider wraps your app and delivers role state
export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("");

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🎣 Custom hook for consuming the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
